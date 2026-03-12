import { BaseModal, BaseButton } from "../../../UI/index";
import { AiForm } from "./AiForm";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { api } from "../../../api/axios";
import { useTranslation } from "react-i18next";
import type { AiFormValues } from "../../../schemas/ai.schema";
import { useRef } from "react";

interface Props {
  opened: boolean;
  onClose: () => void;
  aiId: number | null;
}

export const AiEditModal: React.FC<Props> = ({ opened, onClose, aiId }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const formRef = useRef<HTMLFormElement>(null);

  const { data } = useQuery({
    queryKey: ["ai", aiId],
    queryFn: async () => {
      const res = await api.get(`/api/v1/ai/${aiId}`);
      return res.data;
    },
    enabled: !!aiId,
  });

  const mutation = useMutation({
    mutationFn: (values: AiFormValues) => api.put(`/api/v1/ai/${aiId}`, values),
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

  const handleSubmit = (values: AiFormValues) => mutation.mutate(values);

  return (
    <BaseModal opened={opened} onClose={onClose} size={1200} centered withCloseButton={false}>
      {data && (
        <AiForm
          ref={formRef}
          defaultValues={{
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
            apiProvider: data.usesApi ? data.apiProvider ?? "" : "",
          }}
          onSubmit={handleSubmit}
          onCancel={onClose}
          loading={mutation.isPending}
        />
      )}
      <BaseButton
        variantType="primary"
        onClick={() => formRef.current?.requestSubmit()}
        loading={mutation.isPending}
      >
        {t("aiModal.buttons.confirm")}
      </BaseButton>
    </BaseModal>
  );
};