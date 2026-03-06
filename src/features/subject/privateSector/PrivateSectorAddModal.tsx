import {
  Stack,
  Group,
  Box,
  Grid,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { BaseModal } from "../../../UI/modal/BaseModal";
import { BaseButton } from "../../../UI/button/BaseButton";
import { FloatingInput } from "../../../UI/input/FloatingInput";
import { useTranslation } from "react-i18next";
import { api } from "../../../api/axios";
import type {SectorFormValues} from "../../../types/sector/sector.form.types"
import type { CreateSectorRequest } from "../../../types/sector/sector.request.types";

interface Props {
  opened: boolean;
  onClose: () => void;
}

export const PrivateSectorAddModal: React.FC<Props> = ({
  opened,
  onClose,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const form = useForm<SectorFormValues>({
  initialValues: {
    titleRu: "",
    titleKg: "",
    address: "",
    logo: "",
    parentId: undefined,
  },

  validate: {
    titleRu: (value) =>
      value.trim().length === 0
        ? "Title RU is required"
        : value.length > 255
        ? "Max 255 characters"
        : null,

    titleKg: (value) =>
      value.trim().length === 0
        ? "Title KG is required"
        : value.length > 255
        ? "Max 255 characters"
        : null,

    address: (value) =>
      value.trim().length === 0
        ? "Address is required"
        : value.length > 255
        ? "Max 255 characters"
        : null,
  },
});

  const mapToRequest = (
    values: SectorFormValues
  ): CreateSectorRequest => {
    return {
      titleRu: values.titleRu,
      titleKg: values.titleKg,
      address: values.address,
      logo: values.logo || "",
      parentId: values.parentId ?? undefined,
  };
}

 const mutation = useMutation({
  mutationFn: async (data: CreateSectorRequest) => {
    const response = await api.post("/api/v1/sector", data);
    return response.data;
  },
  onSuccess: () => {
    notifications.show({
      title: t("notifications.success"),
      message: t("notifications.created"),
      color: "green",
    });

    queryClient.invalidateQueries({
      queryKey: ["sector"],
    });

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

  const handleSubmit = (
    values: SectorFormValues
  ) => {
    mutation.mutate(mapToRequest(values));
    console.log(mapToRequest(values));
  };
  

  

  return (
    <BaseModal
      opened={opened}
      onClose={onClose}
      centered
      size={800}
      withCloseButton={false}
    >
      <Stack>
        <form onSubmit={form.onSubmit(handleSubmit)}> 
         <Box
          p="md"
          style={{
            border: '1px solid #303d43',
            borderRadius: 8,
          }}
        >
          <Title order={5} ta="center" mb="md">
            {t("privateSectorModal.title")}
          </Title>
          

          <Grid>
            <Grid.Col span={6}>
              <FloatingInput
                labelText={t("privateSectorModal.fields.titleRu")}
                {...form.getInputProps("titleRu")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <FloatingInput
                labelText={t("privateSectorModal.fields.titleKg")}
                {...form.getInputProps("titleKg")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <FloatingInput
               type="number"
                labelText={t("privateSectorModal.fields.parent")}
                {...form.getInputProps("parentId")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <FloatingInput
                labelText={t("privateSectorModal.fields.address")}
                {...form.getInputProps("address")}
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <FloatingInput
                labelText={t("privateSectorModal.fields.logo")}
                {...form.getInputProps("logo")}
              />
            </Grid.Col>
          </Grid>
        </Box>

        <Group justify="center">
          <BaseButton 
                variantType="secondary" 
                 type="button"
                onClick={onClose}
          >
             {t("privateSectorModal.buttons.cancel")}
          </BaseButton>
          <BaseButton 
            variantType='primary' 
            type="submit"
            loading={mutation.isPending}
          >
            {t("privateSectorModal.buttons.confirm")}
          </BaseButton>
        </Group>
        </form>
      </Stack>
    </BaseModal>
  );
};