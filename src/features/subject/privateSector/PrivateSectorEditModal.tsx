import { Stack, Box, Group, Title, Divider, useMantineColorScheme } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { BaseModal, BaseButton } from "../../../UI/index";
import { PrivateSectorForm } from "./index";
import { getSectorById, updateSector } from "../../../services/sector.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import type { SectorFormValues } from "../../../types/sector/sector.form.types";
import type { SectorItem } from "../../../types/sector/sector.response.types";


interface Props {
  opened: boolean;
  onClose: () => void;
  sectorId: number | null;
}

export const PrivateSectorEditModal: React.FC<Props> = ({ opened, onClose, sectorId }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

 const { data } = useQuery<SectorItem>({
  queryKey: ["sector", sectorId],
  queryFn: () => getSectorById(sectorId!),
  enabled: !!sectorId,
});

  const mutation = useMutation<void, unknown, SectorFormValues>({
  mutationFn: async (values) => {
    await updateSector(sectorId!, values); 
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["privateSector"] });
    notifications.show({
      title: t("notifications.success"),
      message: t("notifications.updated"),
      color: "green",
    });
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

  const handleSubmit = (values: SectorFormValues) => {
  mutation.mutate(values);
};

  return (
    <BaseModal opened={opened} onClose={onClose} centered size={800} withCloseButton={false}>
      <Stack>
        <Box p="md" style={{  border: `1px solid ${isDark ? "#303d43" : "#d9d9d9"}`, borderRadius: 8 }}>
          <Title order={5} ta="center" mb="md">{t("privateSectorModal.editTitle")}</Title>
          <Divider />
          {data && (
            <PrivateSectorForm
              defaultValues={{
                titleRu: data.titleRu,
                titleKg: data.titleKg,
                address: data.address,
                logo: data.logo,
                parentId: data.parent?.id,
              }}
              onSubmit={handleSubmit}
            />
          )}
          <Group justify="center" mt="md">
            <BaseButton variantType="secondary" onClick={onClose}>
              {t("privateSectorModal.buttons.cancel")}
            </BaseButton>
            <BaseButton
              variantType="primary"
              onClick={() => document.querySelector("form")?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))}
              loading={mutation.isPending}
            >
              {t("privateSectorModal.buttons.confirm")}
            </BaseButton>
          </Group>
        </Box>
      </Stack>
    </BaseModal>
  );
}; 