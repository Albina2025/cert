import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { BaseModal } from "../../../UI/index";
import { useTranslation } from "react-i18next";
import { useForm } from "@mantine/form";
import { AiForm } from "./index";
import { api } from "../../../api/axios";
import type { AiFormValues } from "../../../types/ai/ai.form.types";
import type { CreateAiRequest } from "../../../types/ai/ai.request.types";

interface Props {
  opened: boolean;
  onClose: () => void;
  aiId: number | null;
}

export const AiEditModal: React.FC<Props> = ({ opened, onClose, aiId }) => {
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

  // AI маалыматтарын алуу
  const { data } = useQuery({
    queryKey: ["ai", aiId],
    queryFn: async () => {
      const res = await api.get(`/api/v1/ai/${aiId}`);
      return res.data;
    },
    enabled: !!aiId,
  });

  // Formду data келгенде жаңыртуу
  useEffect(() => {
    if (data) {
      form.setValues({
        ministryId: String(data.ministryDto?.id ?? ""),
        computePlatformTypeId: String(data.computePlatformType?.id ?? ""),
        hardwareName: data.hardwareName ?? "",
        hardwarePurpose: data.hardwarePurpose ?? "",
        responsibleUnit: data.responsibleUnit ?? "",
        hardwareSupplier: data.hardwareSupplier ?? "",
        purchaseDate: data.purchaseDate ?? "",
        purchaseAmount: String(data.purchaseAmount ?? ""),
        purchaseCurrencyId: String(data.purchaseCurrency?.id ?? ""),
        hardwareSpecs: data.hardwareSpecs ?? "",
        modelName: data.modelName ?? "",
        modelPurpose: data.modelPurpose ?? "",
        modelDeveloper: data.modelDeveloper ?? "",
        usesApi: data.usesApi ?? false,
        apiProvider: data.apiProvider ?? "",
      });
    }
  }, [data]);

  // Update mutation
  const mutation = useMutation({
    mutationFn: async (values: CreateAiRequest) => {
      const res = await api.put(`/api/v1/ai/${aiId}`, values);
      return res.data;
    },
    onSuccess: () => {
      notifications.show({
        title: t("notifications.success"),
        message: t("notifications.updated"),
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["ai"] });
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

  // Submit handler
  const handleSubmit = (values: AiFormValues) => {
    mutation.mutate({
      ...values,
      ministryId: Number(values.ministryId),
      computePlatformTypeId: Number(values.computePlatformTypeId),
      purchaseCurrencyId: Number(values.purchaseCurrencyId),
      apiProvider: values.usesApi ? values.apiProvider : "",
    } as CreateAiRequest);
  };

  return (
    <BaseModal opened={opened} onClose={onClose} size={1200} centered withCloseButton={false}>
      <AiForm form={form} onSubmit={handleSubmit} loading={mutation.isPending} onCancel={onClose} />
    </BaseModal>
  );
};