import { BaseModal, BaseButton } from "../../../UI";
import { SoftwareForm } from "./SoftwareForm";
import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { api } from "../../../api/axios";
import { useTranslation } from "react-i18next";
import type { SoftwareFormValues } from "../../../schemas/software.schema";
import { useRef } from "react";

interface Props{
  opened:boolean
  onClose:()=>void
  softwareId:number|null
}

export const SoftwareEditModal:React.FC<Props>=({opened,onClose,softwareId})=>{

  const {t}=useTranslation()
  const queryClient=useQueryClient()
  const formRef=useRef<HTMLFormElement>(null)

  const {data}=useQuery({
    queryKey:["software",softwareId],
    queryFn:async()=>{
    const res=await api.get(`/api/v1/software/${softwareId}`)
    return res.data
    },
    enabled:!!softwareId
  })

  const mutation=useMutation({
     mutationFn: (values: SoftwareFormValues) => api.put(`/api/v1/software/${softwareId}`, values),
        onSuccess: () => {
          notifications.show({
            title: t("notifications.success"),
            message: t("notifications.updated"),
            color: "green",
          });
          queryClient.invalidateQueries({ queryKey: ["software"] });
          onClose();
        },
        onError: () => {
          notifications.show({
            title: t("notifications.error"),
            message: t("notifications.somethingWrong"),
            color: "red",
          });
        },

  })

  const handleSubmit=(values:SoftwareFormValues)=>mutation.mutate(values)

  return(

    <BaseModal opened={opened} onClose={onClose} size={1200} centered withCloseButton={false}>

    {data && (

      <SoftwareForm
        ref={formRef}
        defaultValues={{
          ministryId:String(data.ministryDto?.id ?? ""),
          softwareName:data.softwareName ?? "",
          softwarePurpose:data.softwarePurpose ?? "",
          manufacturer:data.manufacturer ?? "",
          supplier:data.supplier ?? "",
          purchaseDate:data.purchaseDate ?? "",
          purchaseAmount:String(data.purchaseAmount ?? ""),
          purchaseCurrencyId:String(data.purchaseCurrency?.id ?? ""),
          softwareVersion:data.softwareVersion ?? "",
          lastUpdateDate:data.lastUpdateDate ?? "",
          licenseType:data.licenseType ?? "",
          licenseExpiryDate:data.licenseExpiryDate ?? "",
          licenseCount:String(data.licenseCount ?? "")
        }}
        onSubmit={handleSubmit}
        onCancel={onClose}
        loading={mutation.isPending}
      />
    )}

    <BaseButton
      variantType="primary"
      onClick={()=>formRef.current?.requestSubmit()}
      loading={mutation.isPending}
    >
      {t("softwareModal.buttons.confirm")}
    </BaseButton>

    </BaseModal>

  )

}