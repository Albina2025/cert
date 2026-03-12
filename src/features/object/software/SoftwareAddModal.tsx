import { notifications } from "@mantine/notifications";
import { BaseModal } from "../../../UI";
import { SoftwareForm } from "./SoftwareForm";
import { api } from "../../../api/axios";
import { useTranslation } from "react-i18next";
import type { SoftwareFormValues } from "../../../schemas/software.schema";
import { useRef } from "react";

interface Props {
  opened:boolean
  onClose:()=>void
}

export const SoftwareAddModal:React.FC<Props>=({opened,onClose})=>{

  const {t}=useTranslation()
  const formRef=useRef<HTMLFormElement>(null)

  const handleSubmit=async(values:SoftwareFormValues)=>{

     try {
      await api.post("/api/v1/software", values);

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

  }

  return(

  <BaseModal opened={opened} onClose={onClose} centered size={1200} withCloseButton={false}>

  <SoftwareForm
  ref={formRef}
  onSubmit={handleSubmit}
  onCancel={onClose}
  />

  </BaseModal>

)

}