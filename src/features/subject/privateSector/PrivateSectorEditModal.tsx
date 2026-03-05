import { useEffect } from "react";
import { Stack, Group, Box, Grid, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { useTranslation } from "react-i18next";
import { BaseModal } from "../../../UI/modal/BaseModal";
import { BaseButton } from "../../../UI/button/BaseButton";
import { FloatingInput } from "../../../UI/input/FloatingInput";
import { getSectorById, updateSector } from "../../../services/sector.service";
import type { CreateSectorRequest } from "../../../types/sector/sector.request.types";
import type { SectorItem } from "../../../types/sector.types";

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

  const form = useForm<CreateSectorRequest>({
    initialValues: {
      titleRu: "",
      titleKg: "",
      address: "",
      logo: "",
      parentId: undefined,
    },
  });

  // ================= GET BY ID =================
  const { data } = useQuery<SectorItem>({
    queryKey: ["sector", sectorId],
    queryFn: () => getSectorById(sectorId!),
    enabled: !!sectorId,
  });

  useEffect(() => {
    if (data) {
        form.setValues({
        titleRu: data.titleRu,
        titleKg: data.titleKg,
        address: data.address,
        logo: "",
        parentId: data.parent?.id ?? undefined, 
        });
    }
    }, [data]);



  const mutation = useMutation({
     mutationFn: (values: CreateSectorRequest) =>
    updateSector(sectorId!, values),

    onSuccess: () => {
      notifications.show({
        title: t("notifications.success"),
        message: t("notifications.updated"),
        color: "green",
      });

      queryClient.invalidateQueries({ queryKey: ["privateSector"] });
      onClose();
    },
  });

  const handleSubmit = (values: CreateSectorRequest) => {
     mutation.mutate(values);
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
          <Box p="md" style={{ border: "1px solid #303d43", borderRadius: 8 }}>
            <Title order={5} ta="center" mb="md">
              {t("privateSectorModal.editTitle")}
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
                  labelText={t("privateSectorModal.fields.address")}
                  {...form.getInputProps("address")}
                />
              </Grid.Col>

              <Grid.Col span={6}>
                <FloatingInput
                  labelText={t("privateSectorModal.fields.logo")}
                  {...form.getInputProps("logo")}
                />
              </Grid.Col>
            </Grid>
          </Box>

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
      </Stack>
    </BaseModal>
  );
};