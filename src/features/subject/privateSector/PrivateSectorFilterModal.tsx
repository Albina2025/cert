// import { Grid, Divider, Switch } from '@mantine/core'
// import { useForm } from '@mantine/form'
// import { BaseModal } from '../../../UI/modal/BaseModal'
// import { BaseButton } from '../../../UI/button/BaseButton'
// import { FloatingInput } from '../../../UI/input/FloatingInput'
// import { IconCheck, IconX } from '@tabler/icons-react'
// import type { PrivateSectorFilterType } from '../../../types/dataTypes'
// import { useTranslation } from "react-i18next";

// interface Props {
//   opened: boolean
//   onClose: () => void
//   onApply: (values: PrivateSectorFilterType | null) => void
// }

// export const PrivateSectorFilterModal = ({
//   opened,
//   onClose,
//   onApply,
// }: Props) => {

//   const { t } = useTranslation();
//   const form = useForm<PrivateSectorFilterType>({
//     initialValues: {
//       name: null,
//       address: null,
//       useAPI: false,
//       audited: false,
//     },
//   })

 
//   const handleApply = () => {
//     onApply(form.values)
//     onClose()
//   }

  
//   const handleReset = () => {
//     form.reset()

  
//     onApply(null)

//     onClose()
//   }

//   return (
//     <BaseModal
//       opened={opened}
//       onClose={onClose}
//       centered
//       size={800}
//       withCloseButton={false}
//       radius={15}
//     >
//       <Grid>
//         <Grid.Col span={12}>
//           <Divider size="sm" my="xs" label={t("privateSectorFilter.title")} />
//         </Grid.Col>

//         <Grid.Col span={12}>
//           <FloatingInput
//             labelText={t("privateSectorFilter.fields.name")}
//             {...form.getInputProps('name')}
//           />
//         </Grid.Col>

//         <Grid.Col span={12}>
//           <FloatingInput
//             labelText={t("privateSectorFilter.fields.address")}
//             {...form.getInputProps('address')}
//           />
//         </Grid.Col>

//         <Grid.Col span={12}>
//           <Switch
//             label={t("privateSectorFilter.fields.useAPI")}
//             checked={form.values.useAPI}
//             onChange={(e) =>
//               form.setFieldValue('useAPI', e.currentTarget.checked)
//             }
//             color={form.values.useAPI ? 'green' : 'red'}
//             thumbIcon={
//               form.values.useAPI ? (
//                 <IconCheck size={12} />
//               ) : (
//                 <IconX size={12} />
//               )
//             }
//           />
//         </Grid.Col>

//         <Grid.Col span={12}>
//           <Switch
//             label={t("privateSectorFilter.fields.audited")}
//             checked={form.values.audited}
//             onChange={(e) =>
//               form.setFieldValue('audited', e.currentTarget.checked)
//             }
//             color={form.values.audited ? 'green' : 'red'}
//             thumbIcon={
//               form.values.audited ? (
//                 <IconCheck size={12} />
//               ) : (
//                 <IconX size={12} />
//               )
//             }
//           />
//         </Grid.Col>

//         <Grid.Col span={6}>
//           <BaseButton
//             onClick={handleReset}
//             fullWidth
//             variantType="primary"
//           >
//               {t("privateSectorFilter.buttons.reset")}
//           </BaseButton>
//         </Grid.Col>

//         <Grid.Col span={6}>
//           <BaseButton
//             onClick={handleApply}
//             fullWidth
//             variantType="primary"
//           >
//            {t("privateSectorFilter.buttons.apply")}
//           </BaseButton>
//         </Grid.Col>

//       </Grid>
//     </BaseModal>
//   )
// }

import { Grid, Divider, Switch } from "@mantine/core";
import { IconCheck, IconX } from '@tabler/icons-react'
import { useForm } from "@mantine/form";
import { BaseModal } from "../../../UI/modal/BaseModal";
import { BaseButton } from "../../../UI/button/BaseButton";
import { FloatingInput } from "../../../UI/input/FloatingInput";
import { useTranslation } from "react-i18next";
import type {SectorFilterForm, SectorSearchRequest} from "../../../types/sector/sector.request.types"

interface Props {
  opened: boolean;
  onClose: () => void;
  onApply: (filter: SectorSearchRequest["filter"]) => void;
}

export const PrivateSectorFilterModal = ({
  opened,
  onClose,
  onApply,
}: Props) => {
  const { t } = useTranslation();

  const form = useForm<SectorFilterForm>({
    initialValues: {
    title: "",
    address: "",
    enabled: false,
    exclude: '',
    auditedMinistries: false,
  },
  });


  const handleApply = () => {
   onApply({
      title: form.values.title || undefined,
      address: form.values.address || undefined,
      enabled: form.values.enabled ,
      auditedMinistries: form.values.auditedMinistries,
      exclude: form.values.exclude
      ? Number(form.values.exclude)
      : undefined,
    });

  onClose();
};

const handleReset = () => {
  form.reset();

  onApply({
    title: undefined,
    address: undefined,
    enabled: undefined,
    exclude:  undefined,
    auditedMinistries: undefined,
  });

  onClose();
};

  return (
    <BaseModal
  opened={opened}
  onClose={onClose}
  centered
  size={800}
  withCloseButton={false}
  radius={15}
>
  <Grid>
    <Grid.Col span={12}>
      <Divider
        size="sm"
        my="xs"
        label={t("privateSectorFilter.title")}
      />
    </Grid.Col>

    {/* ================= NAME ================= */}
    <Grid.Col span={12}>
      <FloatingInput
        labelText={t("privateSectorFilter.fields.title")}
        {...form.getInputProps("title")}
      />
    </Grid.Col>

    {/* ================= ADDRESS ================= */}
    <Grid.Col span={12}>
      <FloatingInput
        labelText={t("privateSectorFilter.fields.address")}
        {...form.getInputProps("address")}
      />
    </Grid.Col>


    <Grid.Col span={12}>
      <Switch
        label={t("privateSectorFilter.fields.enabled")}
        checked={form.values.enabled ?? false}
        onChange={(e) =>
          form.setFieldValue(
            "enabled",
            e.currentTarget.checked
          )
        }
        color={form.values.enabled ? "green" : "red"}
         thumbIcon={
          form.values.enabled ? (
            <IconCheck size={12} />
          ) : (
            <IconX size={12} />
          )
        }
      />
    </Grid.Col>


    <Grid.Col span={12}>
      <FloatingInput
        type="number"
        labelText={t("privateSectorFilter.fields.exclude")}
        {...form.getInputProps("exclude")}
      />
    </Grid.Col>

   
    <Grid.Col span={12}>
      <Switch
        label={t("privateSectorFilter.fields.auditedMinistries")}
        checked={form.values.auditedMinistries ?? false}
        onChange={(e) =>
          form.setFieldValue(
            "auditedMinistries",
            e.currentTarget.checked
          )
        }
        color={form.values.auditedMinistries ? "green" : "red"}
        thumbIcon={
          form.values.auditedMinistries ? (
            <IconCheck size={12} />
          ) : (
            <IconX size={12} />
          )
        }
      />
    </Grid.Col>


    {/* ================= BUTTONS ================= */}
    <Grid.Col span={6}>
      <BaseButton
        onClick={handleReset}
        fullWidth
        variantType="secondary"
      >
        {t("privateSectorFilter.buttons.reset")}
      </BaseButton>
    </Grid.Col>

    <Grid.Col span={6}>
      <BaseButton
        onClick={handleApply}
        fullWidth
        variantType="primary"
      >
        {t("privateSectorFilter.buttons.apply")}
      </BaseButton>
    </Grid.Col>
  </Grid>
</BaseModal>
  );
};