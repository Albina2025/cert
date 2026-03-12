import { forwardRef, useEffect, useState } from "react";
import { Stack, Grid, Box, Title, Divider, Group, useMantineColorScheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FloatingInput, FloatingSelect, BaseButton } from "../../../UI";
import { useTranslation } from "react-i18next";
import { zodResolver } from "mantine-form-zod-resolver";
import { api } from "../../../api/axios";
import { softwareSchema, type SoftwareFormValues } from "../../../schemas/software.schema";
import type {  SoftwareSearchResponse } from "../../../types/software/software.response.types";

interface Props {
  defaultValues?: SoftwareFormValues;
  onSubmit: (values: SoftwareFormValues) => void;
  loading?: boolean;
  onCancel: () => void;
}

export const SoftwareForm = forwardRef<HTMLFormElement, Props>(
  ({ defaultValues, onSubmit, loading, onCancel }, ref) => {
    const { t } = useTranslation();
    const { colorScheme } = useMantineColorScheme();
    const isDark = colorScheme === "dark";
    const [ministriesOptions, setMinistriesOptions] = useState<{ id: number; titleRu: string; titleKg: string }[]>([]);
    const [currenciesOptions, setCurrenciesOptions] = useState<{ id: number; titleRu: string; titleKg: string }[]>([]);
  

    const form = useForm<SoftwareFormValues>({
      initialValues: defaultValues || {
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
      validate: zodResolver(softwareSchema),
    });

    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data } = await api.post<SoftwareSearchResponse>("/api/v1/software/search", {
            pageRequest: { page: 0, limit: 100 },
            sorting: { sortBy: "ID", sortDirection: "ASC" },
            filter: {},
          });

          const uniqueMinistries = Array.from(
            new Map(data.content.map((s) => [s.ministryDto.id, s.ministryDto])).values()
          );
          setMinistriesOptions(uniqueMinistries);

          const uniqueCurrencies = Array.from(
            new Map(data.content.map((s) => [s.purchaseCurrency.id, s.purchaseCurrency])).values()
          );
          setCurrenciesOptions(uniqueCurrencies);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }, []);

    useEffect(() => {
      if (defaultValues) form.setValues(defaultValues);
    }, [defaultValues]);

    const allFieldsValid = () =>
      Object.values(form.errors).every((error) => error === null);

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
            {t("softwareModal.title")}
          </Title>
          <Divider mb="md" />

          <form ref={ref} onSubmit={form.onSubmit(onSubmit)}>
            <Grid>
              <Grid.Col span={6}>
                <FloatingSelect
                  required
                  labelText={t("softwareModal.fields.subject")}
                  searchable
                  clearable
                  data={ministriesOptions.map((m) => ({ value: String(m.id), label: m.titleRu }))}
                  value={form.values.ministryId}
                  onChange={(value) => form.setFieldValue("ministryId", value ?? "")}
                  error={form.errors.ministryId}
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
                  labelText={t("softwareModal.fields.purchaseCurrency")}
                  data={currenciesOptions.map((c) => ({ value: String(c.id), label: c.titleRu }))}
                  value={form.values.purchaseCurrencyId}
                  onChange={(value) => form.setFieldValue("purchaseCurrencyId", value ?? "")}
                  error={form.errors.purchaseCurrencyId}
                  searchable
                  clearable
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
                <FloatingInput
                  labelText={t("softwareModal.fields.licenseType")}
                   {...form.getInputProps("lastUpdateDate")}
                  
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

            <button type="submit" disabled={!allFieldsValid()} style={{ display: "none" }} />
          </form>
        </Box>
      </Stack>
    );
  }
);

SoftwareForm.displayName = "SoftwareForm";