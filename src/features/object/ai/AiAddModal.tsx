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
import { FloatingSelect } from "../../../UI";

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

  const form = useForm <AiFormValues>({
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
  
    <BaseModal opened={opened} onClose={onClose} centered size={1200} withCloseButton={false} radius={15}>
  <Stack>
     <Box p="md"> 
     <Divider />

      <Title order={3} ta="center">
            {t("aiModal.title")}
      </Title>

    <Stack  gap="lg">
    <form onSubmit={form.onSubmit(handleSubmit)}>


      <Box p="md" style={{ border: "1px solid #303d43", borderRadius: 8 }}>
        <Title order={5} ta="center" mb="md">
          {t("aiModal.hardware")}
        </Title>
        <Grid>
          <Grid.Col span={6}>
            <FloatingSelect
              type="text"
              required
              labelText={t("aiModal.fields.ministryId")}
              placeholder={t("aiModal.fields.ministryId")}
              {...form.getInputProps("ministryId")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <FloatingSelect
              type="text"
              required
              labelText={t("aiModal.fields.computePlatformTypeId")}
              placeholder={t("aiModal.fields.computePlatformTypeId")}
              {...form.getInputProps("computePlatformTypeId")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <FloatingInput
              type="text"
              labelText={t("aiModal.fields.hardwareName")}
              placeholder={t("aiModal.fields.hardwareName")}
              {...form.getInputProps("hardwareName")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <FloatingInput
              type="text"
              labelText={t("aiModal.fields.hardwarePurpose")}
              placeholder={t("aiModal.fields.hardwarePurpose")}
              {...form.getInputProps("hardwarePurpose")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <FloatingInput
              type="text"
              labelText={t("aiModal.fields.responsibleUnit")}
              placeholder={t("aiModal.fields.responsibleUnit")}
              {...form.getInputProps("responsibleUnit")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <FloatingInput
              type="text"
              labelText={t("aiModal.fields.hardwareSupplier")}
              placeholder={t("aiModal.fields.hardwareSupplier")}
              {...form.getInputProps("hardwareSupplier")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <FloatingInput
              type="date"
              labelText={t("aiModal.fields.purchaseDate")}
              placeholder={t("aiModal.fields.purchaseDate")}
              {...form.getInputProps("purchaseDate")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <FloatingInput
              type="number"
              labelText={t("aiModal.fields.purchaseAmount")}
              placeholder={t("aiModal.fields.purchaseAmount")}
              {...form.getInputProps("purchaseAmount")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <FloatingSelect
              type="text"
              required
              labelText={t("aiModal.fields.purchaseCurrencyId")}
              placeholder={t("aiModal.fields.purchaseCurrencyId")}
              {...form.getInputProps("purchaseCurrencyId")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <FloatingInput
              type="text"
              labelText={t("aiModal.fields.hardwareSpecs")}
              placeholder={t("aiModal.fields.hardwareSpecs")}
              {...form.getInputProps("hardwareSpecs")}
            />
          </Grid.Col>
        </Grid>
      </Box>

      <Box p="md" style={{ border: "1px solid #303d43", borderRadius: 8, marginTop: 16 }}>
        <Title order={5} ta="center" mb="md">
          {t("aiModal.model")}
        </Title>
       
        <Grid gutter="md">

        <Grid.Col span={12}>
          <Switch
            label={t("aiModal.fields.usesApi")}
            {...form.getInputProps("usesApi", { type: "checkbox" })}
            thumbIcon={form.values.usesApi ? <IconCheck size={12} /> : <IconX size={12} />}
          />
        </Grid.Col>
          {/* Model Fields */}
          <Grid.Col span={6}>
            <FloatingInput
              labelText={t("aiModal.fields.modelName")}
              placeholder={t("aiModal.fields.modelName")}
              {...form.getInputProps("modelName")}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <FloatingInput
              labelText={t("aiModal.fields.modelPurpose")}
              placeholder={t("aiModal.fields.modelPurpose")}
              {...form.getInputProps("modelPurpose")}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <FloatingInput
              labelText={t("aiModal.fields.modelDeveloper")}
              placeholder={t("aiModal.fields.modelDeveloper")}
              {...form.getInputProps("modelDeveloper")}
            />
          </Grid.Col>
          
          {form.values.usesApi && (
            <Grid.Col span={12}>
              <FloatingInput
                labelText={t("aiModal.fields.apiProvider")}
                placeholder={t("aiModal.fields.apiProvider")}
                {...form.getInputProps("apiProvider")}
              />
            </Grid.Col>
          )}
        </Grid>
      </Box>

      

      <Group justify="center" mt="md">
        <BaseButton variantType="secondary" type="button" onClick={onClose}>
          {t("aiModal.buttons.cancel")}
        </BaseButton>
        <BaseButton variantType="primary" type="submit" loading={mutation.isPending}>
          {t("aiModal.buttons.confirm")}
        </BaseButton>
      </Group>
    </form>
     </Stack>
  </Box>
  </Stack>
</BaseModal>

    
  );
};



