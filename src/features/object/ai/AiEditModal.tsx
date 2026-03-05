import { useEffect } from "react";
import { Grid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { useTranslation } from "react-i18next";

import { BaseModal } from "../../../UI/modal/BaseModal";
import { BaseButton } from "../../../UI/button/BaseButton";
import { FloatingInput } from "../../../UI/input/FloatingInput";

import { api } from "../../../api/axios";

import type { CreateAiRequest } from "../../../types/ai/ai.request.types";

interface Props {
  opened: boolean;
  onClose: () => void;
  aiId: number | null;
}

export const AiEditModal: React.FC<Props> = ({
  opened,
  onClose,
  aiId,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const form = useForm<CreateAiRequest>({
    initialValues: {
      ministryId: 0,
      computePlatformTypeId: 0,
      hardwareName: "",
      hardwarePurpose: "",
      responsibleUnit: "",
      hardwareSupplier: "",
      purchaseDate: "",
      purchaseAmount: "",
      purchaseCurrencyId: 0,
      hardwareSpecs: "",
      modelName: "",
      modelPurpose: "",
      modelDeveloper: "",
      usesApi: false,
      apiProvider: "",
    },
  });

  // GET AI BY ID
  const { data } = useQuery({
    queryKey: ["ai", aiId],
    queryFn: async () => {
      const response = await api.get(`/api/v1/ai/${aiId}`);
      return response.data;
    },
    enabled: !!aiId,
  });

  // FORM толтуруу
  useEffect(() => {
    if (data) {
      form.setValues({
        ministryId: data.ministryDto?.id ?? 0,
        computePlatformTypeId: data.computePlatformType?.id ?? 0,
        hardwareName: data.hardwareName ?? "",
        hardwarePurpose: data.hardwarePurpose ?? "",
        responsibleUnit: data.responsibleUnit ?? "",
        hardwareSupplier: data.hardwareSupplier ?? "",
        purchaseDate: data.purchaseDate ?? "",
        purchaseAmount: data.purchaseAmount ?? "",
        purchaseCurrencyId: data.purchaseCurrency?.id ?? 0,
        hardwareSpecs: data.hardwareSpecs ?? "",
        modelName: data.modelName ?? "",
        modelPurpose: data.modelPurpose ?? "",
        modelDeveloper: data.modelDeveloper ?? "",
        usesApi: data.usesApi ?? false,
        apiProvider: data.apiProvider ?? "",
      });
    }
  }, [data]);


  const mutation = useMutation({
    mutationFn: async (values: CreateAiRequest) => {
      const response = await api.put(`/api/v1/ai/${aiId}`, values);
      return response.data;
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

  const handleSubmit = (values: CreateAiRequest) => {
    mutation.mutate(values);
  };

  return (
    <BaseModal opened={opened} onClose={onClose} size={800}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid>

          <Grid.Col span={12}>
            <FloatingInput
              labelText={t("fields.hardwareName")}
              {...form.getInputProps("hardwareName")}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <FloatingInput
              labelText={t("fields.modelName")}
              {...form.getInputProps("modelName")}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <FloatingInput
              labelText={t("fields.hardwareSupplier")}
              {...form.getInputProps("hardwareSupplier")}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <FloatingInput
              type="date"
              labelText={t("fields.purchaseDate")}
              {...form.getInputProps("purchaseDate")}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <BaseButton
              type="submit"
              fullWidth
              loading={mutation.isPending}
            >
              {t("buttons.save")}
            </BaseButton>
          </Grid.Col>

        </Grid>
      </form>
    </BaseModal>
  );
};