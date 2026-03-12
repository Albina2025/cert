import { notifications } from "@mantine/notifications";
import { BaseModal } from "../../../UI";
import { AiForm } from "./AiForm";
import { api } from "../../../api/axios";
import { useTranslation } from "react-i18next";
import type { AiFormValues } from "../../../schemas/ai.schema";
import { useRef } from "react";

interface Props {
  opened: boolean;
  onClose: () => void;
}

export const AiAddModal: React.FC<Props> = ({ opened, onClose }) => {
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (values: AiFormValues) => {
    try {
      await api.post("/api/v1/ai", values);

      notifications.show({
        title: t("notifications.success"),
        message: t("notifications.created"),
        color: "green",
      });

      onClose();
    } catch {
      notifications.show({
        title: t("notifications.error"),
        message: t("notifications.somethingWrong"),
        color: "red",
      });
    }
  };

  return (
    <BaseModal opened={opened} onClose={onClose} centered size={1200} withCloseButton={false}>
          <AiForm ref={formRef} onSubmit={handleSubmit} onCancel={onClose}/>
    </BaseModal>
  );
};