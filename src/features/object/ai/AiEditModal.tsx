import { useEffect } from "react";
import {
  Stack,
  Group,
  Switch,
  Grid,
  Box,
  Title,
  Divider,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import {FloatingInput, FloatingSelect, BaseButton, BaseModal} from "../../../UI/index"
import { api } from "../../../api/axios";
import type { AiFormValues } from "../../../types/ai/ai.form.types";
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

  const { data } = useQuery({
    queryKey: ["ai", aiId],
    queryFn: async () => {
      const res = await api.get(`/api/v1/ai/${aiId}`);
      return res.data;
    },
    enabled: !!aiId,
  });

  useEffect(() => {
    if (data) {
      form.setValues({
        ministryId: String(data.ministryDto?.id ?? ""),
        computePlatformTypeId: String(
          data.computePlatformType?.id ?? ""
        ),
        hardwareName: data.hardwareName ?? "",
        hardwarePurpose: data.hardwarePurpose ?? "",
        responsibleUnit: data.responsibleUnit ?? "",
        hardwareSupplier: data.hardwareSupplier ?? "",
        purchaseDate: data.purchaseDate ?? "",
        purchaseAmount: String(data.purchaseAmount ?? ""),
        purchaseCurrencyId: String(
          data.purchaseCurrency?.id ?? ""
        ),
        hardwareSpecs: data.hardwareSpecs ?? "",
        modelName: data.modelName ?? "",
        modelPurpose: data.modelPurpose ?? "",
        modelDeveloper: data.modelDeveloper ?? "",
        usesApi: data.usesApi ?? false,
        apiProvider: data.apiProvider ?? "",
      });
    }
  }, [data]);


  const mapToRequest = (
    values: AiFormValues
  ): CreateAiRequest => {
    return {
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
  };


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

  const handleSubmit = (values: AiFormValues) => {
    mutation.mutate(mapToRequest(values));
  };

  return (
    <BaseModal
      opened={opened}
      onClose={onClose}
      size={1200}
      radius={15}
      centered
      withCloseButton={false}
    >
      <Box p="md">
        <Stack gap="lg">
          <Title order={3} ta="center">
            {t("aiModal.editTitle")}
          </Title>

          <Divider />

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="xl">

        
              <Box p="md" style={{ border: "1px solid #303d43", borderRadius: 8 }}>
                <Title order={5} ta="center" mb="md">
                  {t("aiModal.hardware")}
                </Title>

                <Grid>
                  <Grid.Col span={6}>
                    <FloatingSelect
                      required
                      labelText={t("aiModal.fields.ministryId")}
                      placeholder={`${t("aiModal.fields.ministryId")} *`}
                      {...form.getInputProps("ministryId")}
                    />
                  </Grid.Col>

                  <Grid.Col span={6}>
                    <FloatingSelect
                      required
                      labelText={t("aiModal.fields.computePlatformTypeId")}
                      placeholder={`${t("aiModal.fields.computePlatformTypeId")} *`}
                      {...form.getInputProps("computePlatformTypeId")}
                    />
                  </Grid.Col>

                  <Grid.Col span={6}>
                    <FloatingInput
                      type="text"
                      labelText={t("aiModal.fields.hardwareName")}
                      placeholder={`${t("aiModal.fields.hardwareName")} *`}
                      {...form.getInputProps("hardwareName")}
                    />
                  </Grid.Col>

                  <Grid.Col span={6}>
                    <FloatingInput
                      type="text"
                      labelText={t("aiModal.fields.hardwarePurpose")}
                      placeholder={`${t("aiModal.fields.hardwarePurpose")} *`}
                      {...form.getInputProps("hardwarePurpose")}
                    />
                  </Grid.Col>

                  <Grid.Col span={6}>
                    <FloatingInput
                      type="text"
                      labelText={t("aiModal.fields.responsibleUnit")}
                      placeholder={`${t("aiModal.fields.responsibleUnit")} *`}
                      {...form.getInputProps("responsibleUnit")}
                    />
                  </Grid.Col>

                  <Grid.Col span={6}>
                    <FloatingInput
                      type="text"
                      labelText={t("aiModal.fields.hardwareSupplier")}
                      placeholder={`${t("aiModal.fields.hardwareSupplier")} *`}
                      {...form.getInputProps("hardwareSupplier")}
                    />
                  </Grid.Col>

                  <Grid.Col span={6}>
                    <FloatingInput
                      type="date"
                      labelText={t("aiModal.fields.purchaseDate")}
                      placeholder={`${t("aiModal.fields.purchaseDate")} *`}
                      {...form.getInputProps("purchaseDate")}
                    />
                  </Grid.Col>

                  <Grid.Col span={6}>
                    <FloatingInput
                      type="number"
                      labelText={t("aiModal.fields.purchaseAmount")}
                      placeholder={`${t("aiModal.fields.purchaseAmount")} *`}
                      {...form.getInputProps("purchaseAmount")}
                    />
                  </Grid.Col>

                  <Grid.Col span={6}>
                    <FloatingSelect
                      required
                      labelText={t("aiModal.fields.purchaseCurrencyId")}
                      placeholder={`${t("aiModal.fields.purchaseCurrencyId")} *`}
                      {...form.getInputProps("purchaseCurrencyId")}
                    />
                  </Grid.Col>

                  <Grid.Col span={6}>
                    <FloatingInput
                      type="text"
                      labelText={t("aiModal.fields.hardwareSpecs")}
                      placeholder={`${t("aiModal.fields.hardwareSpecs")} *`}
                      {...form.getInputProps("hardwareSpecs")}
                    />
                  </Grid.Col>
                </Grid>
              </Box>

       
              <Box p="md" style={{ border: "1px solid #303d43", borderRadius: 8 }}>
                <Title order={5} ta="center" mb="md">
                  {t("aiModal.model")}
                </Title>

                <Grid>
                  {["modelName", "modelPurpose", "modelDeveloper"].map(
                    (field) => (
                      <Grid.Col
                        span={field === "modelDeveloper" ? 12 : 6}
                        key={field}
                      >
                        <FloatingInput
                          labelText={t(`aiModal.fields.${field}`)}
                          {...form.getInputProps(field)}
                        />
                      </Grid.Col>
                    )
                  )}
                </Grid>
              </Box>

       
              <Box p="md" style={{ border: "1px solid #303d43", borderRadius: 8 }}>
                <Title order={5} ta="center" mb="md">
                  API
                </Title>

                <Switch
                  label={t("aiModal.fields.usesApi")}
                  {...form.getInputProps("usesApi", { type: "checkbox" })}
                  thumbIcon={
                    form.values.usesApi ? (
                      <IconCheck size={12} />
                    ) : (
                      <IconX size={12} />
                    )
                  }
                />

                {form.values.usesApi && (
                  <FloatingInput
                    labelText={t("aiModal.fields.apiProvider")}
                    {...form.getInputProps("apiProvider")}
                  />
                )}
              </Box>

    
              <Group justify="center">
                <BaseButton
                  variantType="secondary"
                  type="button"
                  onClick={onClose}
                >
                  {t("aiModal.buttons.cancel")}
                </BaseButton>

                <BaseButton
                  variantType="primary"
                  type="submit"
                  loading={mutation.isPending}
                >
                  {t("aiModal.buttons.save")}
                </BaseButton>
              </Group>

            </Stack>
          </form>
        </Stack>
      </Box>
    </BaseModal>
  );
};