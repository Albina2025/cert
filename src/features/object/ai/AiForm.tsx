import { Stack, Group, Grid, Box, Title, Divider, Switch } from "@mantine/core";
import { BaseButton, FloatingInput, FloatingSelect } from "../../../UI/index";
import { useTranslation } from "react-i18next";
import { useMantineColorScheme } from "@mantine/core";
import { forwardRef, useState } from "react";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { aiSchema, type AiFormValues } from "../../../schemas/ai.schema";
import { IconCheck, IconX } from "@tabler/icons-react";

interface Props {
  defaultValues?: AiFormValues;
  onSubmit: (values: AiFormValues) => void;
  loading?: boolean;
  onCancel: () => void;
}


  export const AiForm = forwardRef<HTMLFormElement, Props>(
  ({ defaultValues, onSubmit, loading, onCancel }, ref) => {
    const { t } = useTranslation();
    const { colorScheme } = useMantineColorScheme();
   const isDark = colorScheme === "dark";
    const [usesApi, setUsesApi] = useState(defaultValues?.usesApi || false);
    

    const form = useForm<AiFormValues>({
      initialValues: defaultValues || {
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
      validate: zodResolver(aiSchema),
    });

  return (
    <Stack p={20}>
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

        <form ref={ref} onSubmit={form.onSubmit(onSubmit)}>
        <Box
          p="md"
          style={{
            border: `1px solid ${isDark ? "#303d43" : "#d9d9d9"}`,
            borderRadius: 8,
          }}
        >
          <Title ta="center" size={20} mb="md">
            {t("aiModal.hardware")}
          </Title>
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
                value={form.values.ministryId}
                onChange={(v) => form.setFieldValue("ministryId", v ?? "")}
                error={form.errors.ministryId}
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
                value={form.values.computePlatformTypeId}
                onChange={(v) => form.setFieldValue("computePlatformTypeId", v ?? "")}
                error={form.errors.computePlatformTypeId}
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

            <Grid.Col span={12}>
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
                value={form.values.purchaseCurrencyId}
                onChange={(v) => form.setFieldValue("purchaseCurrencyId", v ?? "")}
                error={form.errors.purchaseCurrencyId}
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <FloatingInput
                labelText={t("aiModal.fields.hardwareSpecs")}
                {...form.getInputProps("hardwareSpecs")}
              />
            </Grid.Col>
          </Grid>

          </Box>

          <Box
            p="md"
            style={{
              border: `1px solid ${isDark ? "#303d43" : "#d9d9d9"}`,
              borderRadius: 8,
            }}
          >
          <Title ta="center" size={20} mb="md">
            {t("aiModal.model")}
          </Title>

          <Grid>
            <Grid.Col span={12}>
              <Switch
                  label={t("aiModal.fields.usesApi")}
                  checked={usesApi}
                  onChange={(event) => {
                    const checked = event.currentTarget.checked;
                    setUsesApi(checked);
                    form.setFieldValue("usesApi", checked);
                    if (!checked) form.setFieldValue("apiProvider", ""); 
                  }}
                  color={usesApi ? "green" : "red"}
                  thumbIcon={
                    usesApi 
                      ? <IconCheck size={14} color="green" /> 
                      : <IconX size={14} color="red" />      
                  }
                  styles={(theme) => ({
                    track: {
                      backgroundColor: usesApi ? theme.colors.green[6] : theme.colors.red[6],
                    },
                    thumb: {
                      borderRadius: "50%",
                      backgroundColor: "white", 
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                    label: {
                      fontWeight: 500,
                    },
                  })}
                />
            </Grid.Col>

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

            {form.values.usesApi && (
              <Grid.Col span={12}>
                <FloatingInput
                  labelText={t("aiModal.fields.apiProvider")}
                  {...form.getInputProps("apiProvider")}
                />
              </Grid.Col>
            )}
          </Grid>
          </Box>
          

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
}
  )
AiForm.displayName = "AiForm";