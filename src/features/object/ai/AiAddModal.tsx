import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { BaseModal } from "../../../UI/index";
import { useTranslation } from "react-i18next";
import { useForm } from "@mantine/form";
import { AiForm } from "./index";
import { createAi } from "../../../services/ai.service";
import type { AiFormValues } from "../../../types/ai/ai.form.types";
import type { CreateAiRequest } from "../../../types/ai/ai.request.types";

interface AiAddModalProps {
  opened: boolean;
  onClose: () => void;
}

export const AiAddModal: React.FC<AiAddModalProps> = ({ opened, onClose }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const form = useForm<AiFormValues>({
    initialValues: {
      ministryId: "",
      computePlatformTypeId: "",
      hardwareName: "",
      hardwarePurpose: "",
      responsibleUnit: "",
      hardwareSupplier: "",
      purchaseDate: "",
      purchaseAmount: "",
      purchaseCurrencyId: "",
      hardwareSpecs: "",
      modelName: "",
      modelPurpose: "",
      modelDeveloper: "",
      usesApi: false,
      apiProvider: "",
    },
  });

  const mutation = useMutation({
    mutationFn: createAi,
    onSuccess: () => {
      notifications.show({
        title: t("notifications.success"),
        message: t("notifications.aiCreated"),
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["ai"] });
      form.reset();
      onClose();
    },
    onError: () => {
      notifications.show({
        title: t("notifications.error"),
        message: t("notifications.somethingWrong"),
        color: "red",
      });
    },
  });

  const handleSubmit = (values: AiFormValues) => {
    const request: CreateAiRequest = {
      ministryId: Number(values.ministryId),
      computePlatformTypeId: Number(values.computePlatformTypeId),
      hardwareName: values.hardwareName,
      hardwarePurpose: values.hardwarePurpose,
      responsibleUnit: values.responsibleUnit,
      hardwareSupplier: values.hardwareSupplier,
      purchaseDate: values.purchaseDate,
      purchaseAmount: values.purchaseAmount,
      purchaseCurrencyId: Number(values.purchaseCurrencyId),
      hardwareSpecs: values.hardwareSpecs,
      modelName: values.modelName,
      modelPurpose: values.modelPurpose,
      modelDeveloper: values.modelDeveloper,
      usesApi: values.usesApi,
      apiProvider: values.usesApi ? values.apiProvider : "",
    };
    mutation.mutate(request);
  };

  return (
    <BaseModal opened={opened} onClose={onClose} size={1200} centered withCloseButton={false}>
      <AiForm form={form} onSubmit={handleSubmit} loading={mutation.isPending} onCancel={onClose} />
    </BaseModal>
  );
};