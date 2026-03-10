import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { BaseModal } from "../../../UI/index";
import { useTranslation } from "react-i18next";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { SoftwareForm } from "./index";
import { getSoftwareById, updateSoftware } from "../../../services/software.service";
import type { SoftwareFormValues } from "../../../types/software/software.form.types";
import type { SoftwareCreateRequest } from "../../../types/software/software.request.types";

interface Props {
  opened: boolean;
  onClose: () => void;
  softwareId: number | null;
}

export const SoftwareEditModal: React.FC<Props> = ({ opened, onClose, softwareId }) => {
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

  const { data } = useQuery({ queryKey: ["software", softwareId], queryFn: () => getSoftwareById(softwareId!), enabled: !!softwareId });

  useEffect(() => {
    if (data?.data) {
      form.setValues({
        ministryId: String(data.data.ministryDto?.id ?? ""),
        softwareName: data.data.softwareName ?? "",
        softwarePurpose: data.data.softwarePurpose ?? "",
        manufacturer: data.data.manufacturer ?? "",
        supplier: data.data.supplier ?? "",
        purchaseDate: data.data.purchaseDate ?? "",
        purchaseAmount: String(data.data.purchaseAmount ?? ""),
        purchaseCurrencyId: String(data.data.purchaseCurrency?.id ?? ""),
        softwareVersion: data.data.softwareVersion ?? "",
        lastUpdateDate: data.data.lastUpdateDate ?? "",
        licenseType: data.data.licenseType ?? "",
        licenseExpiryDate: data.data.licenseExpiryDate ?? "",
        licenseCount: String(data.data.licenseCount ?? ""),
      });
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: (values: SoftwareCreateRequest) => updateSoftware(softwareId!, values),
    onSuccess: () => {
      notifications.show({ title: t("notifications.success"), message: t("notifications.updated"), color: "green" });
      queryClient.invalidateQueries({ queryKey: ["software"] });
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