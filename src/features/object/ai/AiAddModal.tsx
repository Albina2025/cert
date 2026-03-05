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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { BaseModal } from "../../../UI/modal/BaseModal";
import { BaseButton } from "../../../UI/button/BaseButton";
import { FloatingInput } from "../../../UI/input/FloatingInput";
import { useTranslation } from "react-i18next";

import type { AiFormValues } from "../../../types/ai/ai.form.types";
import type { CreateAiRequest } from "../../../types/ai/ai.request.types";
import { createAi } from "../../../services/ai.service";

interface AiAddModalProps {
  opened: boolean;
  onClose: () => void;
}

export const AiAddModal: React.FC<AiAddModalProps> = ({
  opened,
  onClose,
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
            {t("aiModal.title")}
          </Title>

          <Divider />

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="xl">

              {/* ================= HARDWARE ================= */}
              <Box p="md" style={{ border: "1px solid #303d43", borderRadius: 8 }}>
                <Stack gap="md">

                  <Title order={5} ta="center">
                    {t("aiModal.hardware")}
                  </Title>

                  <Grid gutter="md">
                    {[
                      "ministryId",
                      "computePlatformTypeId",
                      "hardwareName",
                      "hardwarePurpose",
                      "responsibleUnit",
                      "hardwareSupplier",
                      "purchaseDate",
                      "purchaseAmount",
                      "purchaseCurrencyId",
                      "hardwareSpecs",
                    ].map((field) => (
                      <Grid.Col span={6} key={field}>
                        <FloatingInput
                          type={field === "purchaseDate" ? "date" : field === "purchaseAmount" ? "number" : "text"}
                          labelText={t(`aiModal.fields.${field}`)}
                          {...form.getInputProps(field)}
                        />
                      </Grid.Col>
                    ))}
                  </Grid>
                </Stack>
              </Box>

              {/* ================= MODEL ================= */}
              <Box p="md" style={{ border: "1px solid #303d43", borderRadius: 8 }}>
                <Stack gap="md">

                  <Title order={5} ta="center">
                    {t("aiModal.model")}
                  </Title>

                  <Grid>
                    {[
                      "modelName",
                      "modelPurpose",
                      "modelDeveloper",
                    ].map((field) => (
                      <Grid.Col span={field === "modelDeveloper" ? 12 : 6} key={field}>
                        <FloatingInput
                          labelText={t(`aiModal.fields.${field}`)}
                          {...form.getInputProps(field)}
                        />
                      </Grid.Col>
                    ))}
                  </Grid>
                </Stack>
              </Box>

              {/* ================= API ================= */}
              <Box p="md" style={{ border: "1px solid #303d43", borderRadius: 8 }}>
                <Stack gap="md">

                  <Title order={5} ta="center">
                    API
                  </Title>

                  <Switch
                    label={t("aiModal.fields.usesApi")}
                    {...form.getInputProps("usesApi", {
                      type: "checkbox",
                    })}
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
                </Stack>
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
                  {t("aiModal.buttons.confirm")}
                </BaseButton>
              </Group>

            </Stack>
          </form>
        </Stack>
      </Box>
    </BaseModal>
  );
};



