import { Stack, Box, Group, Title, useMantineColorScheme } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { BaseModal, BaseButton } from "../../../UI"
import { ControlGroupsForm } from "./ControlGroupsForm"
import { createControlGroup } from "../../../services/controlGroups.service"
import { useTranslation } from "react-i18next"

import type { ControlGroupsFormValues } from "../../../types/control/controlGroups.form.types"
import { useRef } from "react"

interface Props {
  opened: boolean
  onClose: () => void
}

export const ControlGroupsAddModal: React.FC<Props> = ({
  opened,
  onClose,
}) => {
  const { t } = useTranslation()
  const { colorScheme } = useMantineColorScheme()
  const isDark = colorScheme === "dark"
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (values: ControlGroupsFormValues) => {
    try {
      await createControlGroup(values)

      notifications.show({
        title: t("notifications.success"),
        message: t("notifications.created"),
        color: "green",
      })

      onClose()
    } catch {
      notifications.show({
        title: t("notifications.error"),
        message: t("notifications.somethingWrong"),
        color: "red",
      })
    }
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
            {t("controlGroups.modal.title")}
          </Title>

          <ControlGroupsForm ref={formRef}  onSubmit={handleSubmit} />

          <Group justify="center" mt="md">
            <BaseButton variantType="secondary" onClick={onClose}>
              {t("controlGroups.buttons.cancel")}
            </BaseButton>

            <BaseButton
              variantType="primary"
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