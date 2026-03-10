import { useEffect } from "react";
import {
  Stack,
  Group,
  Box,
  Grid,
  Title,
  Divider,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { useTranslation } from "react-i18next";
import {BaseModal, BaseButton, FloatingInput, FloatingSelect} from "../../../UI/index"

import {
  getSectorById,
  updateSector,
} from "../../../services/sector.service";

import type { SectorFormValues } from "../../../types/sector/sector.form.types";
import type { CreateSectorRequest } from "../../../types/sector/sector.request.types";
import type { SectorItem } from "../../../types/sector/sector.response.types";

interface Props {
  opened: boolean;
  onClose: () => void;
  sectorId: number | null;
}

export const PrivateSectorEditModal: React.FC<Props> = ({
  opened,
  onClose,
  sectorId,
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
          ? t("validation.required")
          : value.length > 255
          ? t("validation.max255")
          : null,

      titleKg: (value) =>
        value.trim().length === 0
          ? t("validation.required")
          : value.length > 255
          ? t("validation.max255")
          : null,

      address: (value) =>
        value.trim().length === 0
          ? t("validation.required")
          : value.length > 255
          ? t("validation.max255")
          : null,
    },
  });

 
  const { data } = useQuery<SectorItem>({
    queryKey: ["sector", sectorId],
    queryFn: () => getSectorById(sectorId!),
    enabled: !!sectorId,
  });

  
  useEffect(() => {
    if (data) {
      form.setValues({
        titleRu: data.titleRu ?? "",
        titleKg: data.titleKg ?? "",
        address: data.address ?? "",
        logo: data.logo ?? "",
        parentId: data.parent?.id ?? undefined,
      });
    }
  }, [data]);

  const mapToRequest = (values: SectorFormValues): CreateSectorRequest => {
    return {
      titleRu: values.titleRu,
      titleKg: values.titleKg,
      address: values.address,
      logo: values.logo || "",
      parentId: values.parentId,
    };
  };

  const mutation = useMutation({
    mutationFn: async (data: CreateSectorRequest) => {
      return updateSector(sectorId!, data);
    },

    onSuccess: () => {
      notifications.show({
        title: t("notifications.success"),
        message: t("notifications.updated"),
        color: "green",
      });

      queryClient.invalidateQueries({ queryKey: ["privateSector"] });
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

  const handleSubmit = form.onSubmit((values) => {
    mutation.mutate(mapToRequest(values));
  });

  return (
    <BaseModal
      opened={opened}
      onClose={onClose}
      centered
      size={800}
      withCloseButton={false}
    >
      <Stack>
        <Box
          p="md"
          style={{
            border: "1px solid #303d43",
            borderRadius: 8,
          }}
        >
          <Title order={5} ta="center" mb="md">
            {t("privateSectorModal.editTitle")}
          </Title>

          <Divider />

          <form onSubmit={handleSubmit}>
            <Grid>
              <Grid.Col span={6}>
                <FloatingInput
                  labelText={t("privateSectorModal.fields.titleRu")}
                  required
                  {...form.getInputProps("titleRu")}
                />
              </Grid.Col>

              <Grid.Col span={6}>
                <FloatingInput
                  labelText={t("privateSectorModal.fields.titleKg")}
                  required
                  {...form.getInputProps("titleKg")}
                />
              </Grid.Col>

              <Grid.Col span={6}>
                <FloatingSelect
                  labelText={t("privateSectorModal.fields.parent")}
                  searchable
                  clearable
                  data={
                      data?.parent
                        ? [
                            {
                              value: data.parent.id.toString(),  
                              label: data.parent.titleRu,
                            },
                          ]
                        : []
                    }
                    value={form.values.parentId?.toString() ?? ""} 
                    onChange={(value) =>
                      form.setFieldValue(
                        "parentId",
                        value ? Number(value) : undefined  
                      )
                  }
                />
              </Grid.Col>

              <Grid.Col span={6}>
                <FloatingInput
                  labelText={t("privateSectorModal.fields.address")}
                  required
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

            <Group justify="center" mt="md">
              <BaseButton
                variantType="secondary"
                type="button"
                onClick={onClose}
              >
                {t("privateSectorModal.buttons.cancel")}
              </BaseButton>

              <BaseButton
                variantType="primary"
                type="submit"
                loading={mutation.isPending}
              >
                {t("privateSectorModal.buttons.confirm")}
              </BaseButton>
            </Group>
          </form>
        </Box>
      </Stack>
    </BaseModal>
  );
}; 