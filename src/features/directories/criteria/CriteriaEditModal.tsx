import {
  Stack,
  Box,
  Group,
  Title,
  Divider,
  useMantineColorScheme,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { BaseModal, BaseButton } from "../../../UI";
import { CriteriaForm } from "./CriteriaForm";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import {
  getCriteriaById,
  updateCriteria,
} from "../../../services/criteria.service";
import type { CriteriaItem } from "../../../types/criteria/criteria.item.types";
import type { CriteriaFormValues } from "../../../types/criteria/criteria.form.types";
import { useRef } from "react";

interface Props {
  opened: boolean;
  onClose: () => void;
  criteriaId: number | null;
}

export const CriteriaEditModal: React.FC<Props> = ({
  opened,
  onClose,
  criteriaId,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  const formRef = useRef<HTMLFormElement>(null)

  const { data } = useQuery<CriteriaItem>({
    queryKey: ["criteria", criteriaId],
    queryFn: () => getCriteriaById(criteriaId!),
    enabled: Boolean(criteriaId),
  });

  const mutation = useMutation<void, Error, CriteriaFormValues>({
    mutationFn: async (values) => {
      await updateCriteria(criteriaId!, values);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["criteria"],
      });

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

  const handleSubmit = (values: CriteriaFormValues) => {
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
        <Box
          p="md"
          style={{
            border: `1px solid ${isDark ? "#303d43" : "#d9d9d9"}`,
            borderRadius: 8,
          }}
        >
          <Title order={5} ta="center" mb="md">
            {t("criteriaModal.editTitle")}
          </Title>

          <Divider />

          {data && (
            <CriteriaForm
              ref={formRef}
              defaultValues={{
                titleRu: data.titleRu,
                titleKg: data.titleKg,
                controlId: data.control?.id,
              }}
              onSubmit={handleSubmit}
            />
          )}

          <Group justify="center" mt="md">
            <BaseButton variantType="secondary" onClick={onClose}>
              {t("criteriaModal.buttons.cancel")}
            </BaseButton>

            <BaseButton
              variantType="primary"
              loading={mutation.isPending}
              onClick={() => formRef.current?.requestSubmit()}
            >
              {t("criteriaModal.buttons.confirm")}
            </BaseButton>
          </Group>
        </Box>
      </Stack>
    </BaseModal>
  );
};