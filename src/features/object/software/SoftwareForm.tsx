import { Stack, Group, Grid, Box, Title, Divider } from "@mantine/core";
import { useForm } from "@mantine/form";
import { BaseButton, FloatingInput, FloatingSelect } from "../../../UI/index";
import { useTranslation } from "react-i18next";
import type { SoftwareFormValues } from "../../../types/software/software.form.types";
import { useMantineColorScheme } from "@mantine/core";

interface Props {
  form: ReturnType<typeof useForm<SoftwareFormValues>>;
  onSubmit: (values: SoftwareFormValues) => void;
  loading?: boolean;
  onCancel: () => void;
}


export const SoftwareForm: React.FC<Props> = ({ form, onSubmit, loading, onCancel }) => {
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
        <Title ta="center"  size={20}>
          {t("softwareModal.title")}
         </Title>

         <Divider />
        <form onSubmit={form.onSubmit(onSubmit)}>
          <Grid>
            <Grid.Col span={6}>
              <FloatingSelect
                required
                type="number"
                labelText={t("softwareModal.fields.subject")}
                {...form.getInputProps("ministryId")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <FloatingInput
                labelText={t("softwareModal.fields.name")}
                {...form.getInputProps("softwareName")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <FloatingInput
                labelText={t("softwareModal.fields.purpose")}
                {...form.getInputProps("softwarePurpose")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <FloatingInput
                labelText={t("softwareModal.fields.manufacturer")}
                {...form.getInputProps("manufacturer")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <FloatingInput
                labelText={t("softwareModal.fields.supplier")}
                {...form.getInputProps("supplier")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <FloatingInput
                type="date"
                labelText={t("softwareModal.fields.purchaseDate")}
                {...form.getInputProps("purchaseDate")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <FloatingInput
                type="number"
                labelText={t("softwareModal.fields.purchaseAmount")}
                {...form.getInputProps("purchaseAmount")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <FloatingSelect
                type="number"
                labelText={t("softwareModal.fields.purchaseCurrency")}
                placeholder={t("softwareModal.fields.purchaseCurrencyId")}
                data={[
                    { value: "som", label: t("softwareModal.currencyOptions.som") },
                    { value: "euro", label: t("softwareModal.currencyOptions.euro") },
                    { value: "dollar", label: t("softwareModal.currencyOptions.dollar") },
                ]}
                {...form.getInputProps("purchaseCurrencyId")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <FloatingInput
                labelText={t("softwareModal.fields.softwareVersion")}
                {...form.getInputProps("softwareVersion")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <FloatingInput
                type="date"
                labelText={t("softwareModal.fields.lastUpdateDate")}
                {...form.getInputProps("lastUpdateDate")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <FloatingSelect
                labelText={t("softwareModal.fields.licenseType")}
                data={[
                  { value: "Perpetual", label: "Perpetual" },
                  { value: "Subscription", label: "Subscription" },
                ]}
                {...form.getInputProps("licenseType")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <FloatingInput
                type="date"
                labelText={t("softwareModal.fields.licenseExpiryDate")}
                {...form.getInputProps("licenseExpiryDate")}
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <FloatingInput
                type="number"
                labelText={t("softwareModal.fields.licenseCount")}
                {...form.getInputProps("licenseCount")}
              />
            </Grid.Col>
          </Grid>

          <Group justify="center" mt="md">
            <BaseButton type="button" variantType="secondary" onClick={onCancel}>
              {t("softwareModal.buttons.cancel")}
            </BaseButton>
            <BaseButton type="submit" variantType="primary" loading={loading}>
              {t("softwareModal.buttons.confirm")}
            </BaseButton>
          </Group>
        </form>
      </Box>
    </Stack>
  );
};