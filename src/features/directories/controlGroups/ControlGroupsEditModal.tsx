import { useRef } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Stack, Box, Group, Title, Divider, useMantineColorScheme } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { BaseModal, BaseButton } from "../../../UI"
import { ControlGroupsForm } from "./ControlGroupsForm"
import { getControlGroupById, updateControlGroup } from "../../../services/controlGroups.service"
import { useTranslation } from "react-i18next"
import type { ControlGroupsFormValues } from "../../../schemas/controlGroups.schema"
import type { ControlGroupsItem } from "../../../types/control/controlGroups.item.types"

interface Props {
  opened: boolean
  onClose: () => void
  controlGroupId: number | null
}

export const ControlGroupsEditModal: React.FC<Props> = ({ opened, onClose, controlGroupId }) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { colorScheme } = useMantineColorScheme()
  const isDark = colorScheme === "dark"
  const formRef = useRef<HTMLFormElement>(null)

  const { data } = useQuery<ControlGroupsItem>({
    queryKey: ["controlGroup", controlGroupId],
    queryFn: () => getControlGroupById(controlGroupId!),
    enabled: Boolean(controlGroupId),
  })

  const mutation = useMutation({
    mutationFn: (values: ControlGroupsFormValues) =>
      updateControlGroup(controlGroupId!, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["controlGroups"] })
      notifications.show({
        title: t("notifications.success"),
        message: t("notifications.updated"),
        color: "green",
      })
      onClose()
    },
    onError: () => {
      notifications.show({
        title: t("notifications.error"),
        message:  t("notifications.somethingWrong"),
        color: "red",
      })
    },
  })

  const handleSubmit = (values: ControlGroupsFormValues) => {
    mutation.mutate(values)
  }

  return (
    <BaseModal opened={opened} onClose={onClose} size={800} centered withCloseButton={false}>
      <Stack>
        <Box
          p="md"
          style={{
            border: `1px solid ${isDark ? "#303d43" : "#d9d9d9"}`,
            borderRadius: 8,
          }}
        >
          <Title order={5} ta="center" mb="md">
            {t("controlGroups.modal.editTitle")}
          </Title>

          <Divider />

          {data && (
            <ControlGroupsForm
              ref={formRef}
              defaultValues={{
                titleRu: data.titleRu,
                titleKg: data.titleKg,
                identifier: data.identifier,
                parentId: data.parent?.id,
              }}
              onSubmit={handleSubmit}
            />
          )}

          <Group justify="center" mt="md">
            <BaseButton variantType="secondary" onClick={onClose}>
              {t("controlGroups.buttons.cancel")}
            </BaseButton>

            <BaseButton
              variantType="primary"
              loading={mutation.isPending}
              onClick={() => formRef.current?.requestSubmit()}
            >
              {t("controlGroups.buttons.confirm")}
            </BaseButton>
          </Group>
        </Box>
      </Stack>
    </BaseModal>
  )
}