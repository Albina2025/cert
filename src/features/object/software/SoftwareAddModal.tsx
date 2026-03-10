import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { BaseModal } from "../../../UI/index";
import { useTranslation } from "react-i18next";
import { useForm } from "@mantine/form";
import { SoftwareForm } from "./index";
import { createSoftware } from "../../../services/software.service";
import type { SoftwareFormValues } from "../../../types/software/software.form.types";
import type { SoftwareCreateRequest } from "../../../types/software/software.request.types";

interface Props {
  opened: boolean;
  onClose: () => void;
}

export const SoftwareAddModal: React.FC<Props> = ({ opened, onClose }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const form = useForm<SoftwareFormValues>({
    initialValues: {
      ministryId: "",
      softwareName: "",
      softwarePurpose: "",
      manufacturer: "",
      supplier: "",
      purchaseDate: "",
      purchaseAmount: "",
      purchaseCurrencyId: "",
      softwareVersion: "",
      lastUpdateDate: "",
      licenseType: "",
      licenseExpiryDate: "",
      licenseCount: "",
    },
  });

  const mutation = useMutation({
    mutationFn: createSoftware,
    onSuccess: () => {
      notifications.show({ title: t("notifications.success"), message: t("notifications.created"), color: "green" });
      queryClient.invalidateQueries({ queryKey: ["software"] });
      form.reset();
      onClose();
    },
  });

  const handleSubmit = (values: SoftwareFormValues) => {
    const request: SoftwareCreateRequest = {
      ministryId: Number(values.ministryId),
      softwareName: values.softwareName,
      softwarePurpose: values.softwarePurpose,
      manufacturer: values.manufacturer,
      supplier: values.supplier,
      purchaseDate: values.purchaseDate,
      purchaseAmount: Number(values.purchaseAmount),
      purchaseCurrencyId: Number(values.purchaseCurrencyId),
      softwareVersion: values.softwareVersion,
      lastUpdateDate: values.lastUpdateDate,
      licenseType: values.licenseType,
      licenseExpiryDate: values.licenseExpiryDate,
      licenseCount: Number(values.licenseCount),
    };
    mutation.mutate(request);
  };

  return (
    <BaseModal opened={opened} onClose={onClose} size={1200} centered withCloseButton={false}>
      <SoftwareForm form={form} onSubmit={handleSubmit} loading={mutation.isPending} onCancel={onClose} />
    </BaseModal>
  );
};