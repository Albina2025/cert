import { Stack, Group, Grid, Box, Title, Divider } from "@mantine/core";
import { BaseButton, FloatingInput, FloatingSelect } from "../../../UI/index";
import { useTranslation } from "react-i18next";
import { useMantineColorScheme } from "@mantine/core";
import type { AiFormValues } from "../../../types/ai/ai.form.types";

interface Props {
  form: ReturnType<typeof import("@mantine/form").useForm<AiFormValues>>;
  onSubmit: (values: AiFormValues) => void;
  loading?: boolean;
  onCancel: () => void;
}

export const AiForm: React.FC<Props> = ({ form, onSubmit, loading, onCancel }) => {
  const { t } = useTranslation();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Stack>
      <Box
        p="md"
        style={{
          border: `1px solid ${isDark ? "#303d43" : "#d9d9d9"}`,
          borderRadius: 8,
        }}
      >
        <Title ta="center" size={20} mb="md">
          {t("aiModal.title")}
        </Title>

        <Divider mb="md" />

        <form onSubmit={form.onSubmit(onSubmit)}>
          {/* Hardware Section */}
          <Grid>
            <Grid.Col span={6}>
              <FloatingSelect
                required
                labelText={t("aiModal.fields.ministryId")}
                 placeholder={t("aiModal.fields.ministryId")}
                data={[
                    { value: "1", label: "Министерство 1" },
                    { value: "2", label: "Министерство 2" },
                    { value: "3", label: "Министерство 3" },
                ]}
                {...form.getInputProps("ministryId")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <FloatingSelect
                required
                labelText={t("aiModal.fields.computePlatformTypeId")}
                placeholder={t("aiModal.fields.computePlatformTypeId")}
                data={[
                    { value: "1", label: "Тип 1" },
                    { value: "2", label: "Тип 2" },
                    { value: "3", label: "Тип 3" },
                ]}
                {...form.getInputProps("computePlatformTypeId")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <FloatingInput
                labelText={t("aiModal.fields.hardwareName")}
                {...form.getInputProps("hardwareName")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <FloatingInput
                labelText={t("aiModal.fields.hardwarePurpose")}
                {...form.getInputProps("hardwarePurpose")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <FloatingInput
                labelText={t("aiModal.fields.responsibleUnit")}
                {...form.getInputProps("responsibleUnit")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <FloatingInput
                labelText={t("aiModal.fields.hardwareSupplier")}
                {...form.getInputProps("hardwareSupplier")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <FloatingInput
                type="date"
                labelText={t("aiModal.fields.purchaseDate")}
                {...form.getInputProps("purchaseDate")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <FloatingInput
                type="number"
                labelText={t("aiModal.fields.purchaseAmount")}
                {...form.getInputProps("purchaseAmount")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <FloatingSelect
                required
                labelText={t("aiModal.fields.purchaseCurrencyId")}
                placeholder={t("aiModal.fields.purchaseCurrencyId")}
                data={[
                    { value: "1", label: t("aiModal.currencyOptions.som") },
                    { value: "2", label: t("aiModal.currencyOptions.euro") },
                    { value: "3", label: t("aiModal.currencyOptions.dollar") },
                ]}
                {...form.getInputProps("purchaseCurrencyId")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <FloatingInput
                labelText={t("aiModal.fields.hardwareSpecs")}
                {...form.getInputProps("hardwareSpecs")}
              />
            </Grid.Col>
          </Grid>

          {/* Model Section */}
          <Divider my="md" />
          <Grid>
            <Grid.Col span={6}>
              <FloatingInput
                labelText={t("aiModal.fields.modelName")}
                {...form.getInputProps("modelName")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <FloatingInput
                labelText={t("aiModal.fields.modelPurpose")}
                {...form.getInputProps("modelPurpose")}
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <FloatingInput
                labelText={t("aiModal.fields.modelDeveloper")}
                {...form.getInputProps("modelDeveloper")}
              />
            </Grid.Col>
          </Grid>

          {/* API Section */}
          <Divider my="md" />
          <Grid>
            <Grid.Col span={12}>
              <FloatingSelect
                labelText={t("aiModal.fields.usesApi")}
                {...form.getInputProps("usesApi", { type: "checkbox" })}
              />
            </Grid.Col>

            {form.values.usesApi && (
              <Grid.Col span={12}>
                <FloatingInput
                  labelText={t("aiModal.fields.apiProvider")}
                  {...form.getInputProps("apiProvider")}
                />
              </Grid.Col>
            )}
          </Grid>

          <Group justify="center" mt="md">
            <BaseButton type="button" variantType="secondary" onClick={onCancel}>
              {t("aiModal.buttons.cancel")}
            </BaseButton>
            <BaseButton type="submit" variantType="primary" loading={loading}>
              {t("aiModal.buttons.confirm")}
            </BaseButton>
          </Group>
        </form>
      </Box>
    </Stack>
  );
};