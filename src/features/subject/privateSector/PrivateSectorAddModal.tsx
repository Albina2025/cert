// import {
//   Stack,
//   Group,
//   Box,
//   Grid,
//   Title,
// } from '@mantine/core';
// import { useState } from 'react';
// import { FloatingInput } from '../../../UI/input/FloatingInput';
// import { FloatingSelect } from '../../../UI/input/FloatingSelect';
// import { useDispatch } from 'react-redux';
// import { addItem } from '../../../store/dataSlice';
// import { BaseModal } from '../../../UI/modal/BaseModal';
// import { BaseButton } from '../../../UI/button/BaseButton';
// import { useTranslation } from 'react-i18next';

// interface PrivateSectorAddModalProps {
//   opened: boolean;
//   onClose: () => void;
// }

// export const PrivateSectorAddModal: React.FC<
//   PrivateSectorAddModalProps
//   > = ({ opened, onClose }) => {
//   const dispatch = useDispatch();
//    const { t } = useTranslation();

//   const [form, setForm] = useState({
//     subject: '',
//     name: '',
//     purpose: '',
//     status: '',
//   });

//   const handleChange = (field: string, value: string) => {
//     setForm((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleSubmit = () => {
//     dispatch(
//       addItem({
//         id: crypto.randomUUID(),
//         type: 'privateSector',
//         data: {
//           action: 'Create',
//           subject: form.subject,
//           name: form.name,
//           purpose: form.purpose,
//           status: form.status,
//         },
//       })
//     );

//     setForm({
//       subject: '',
//       name: '',
//       purpose: '',
//       status: '',
//     });

//     onClose();
//   };

//   return (
//     <BaseModal
//       opened={opened}
//       onClose={onClose}
//       radius={15}
//       centered
//       size={1200} 
//       withCloseButton={false}
//     >
//       <Stack>
//         <Box
//           p="md"
//           style={{
//             border: '1px solid #303d43',
//             borderRadius: 8,
//           }}
//         >
//           <Title order={5} ta="center" mb="md">
//             {t("privateSectorModal.title")}
//           </Title>
          

//           <Grid>
//             <Grid.Col span={6}>
//               <FloatingInput
//                 labelText={t("privateSectorModal.fields.name")}
//                 value={form.subject}
//                 onChange={(e) =>
//                   handleChange('subject', e.currentTarget.value)
//                 }
//               />
//             </Grid.Col>

//             <Grid.Col span={6}>
//               <FloatingInput
//                 labelText={t("privateSectorModal.fields.parent")}
//                 value={form.name}
//                 onChange={(e) =>
//                   handleChange('name', e.currentTarget.value)
//                 }
//               />
//             </Grid.Col>

//             <Grid.Col span={6}>
//               <FloatingInput
//                 labelText={t("privateSectorModal.fields.address")}
//                 value={form.purpose}
//                 onChange={(e) =>
//                   handleChange('purpose', e.currentTarget.value)
//                 }
//               />
//             </Grid.Col>

//             <Grid.Col span={6}>
//               <FloatingSelect
//                 labelText={t("privateSectorModal.fields.status")}
//                 value={form.status}
//                 onChange={(value) =>
//                   handleChange('status', value || '')
//                 }
//                 data={[
//                   { 
//                     value: 'active', 
//                     label: t("privateSectorModal.statusOptions.active"), 
//                   },
//                   { 
//                     value: 'inactive', 
//                     label:  t("privateSectorModal.statusOptions.inactive"),
//                   },
//                 ]}
//               />
//             </Grid.Col>
//           </Grid>
//         </Box>

//         <Group justify="center">
//           <BaseButton 
//                 variantType="secondary" 
//                 onClick={onClose}
//           >
//              {t("privateSectorModal.buttons.cancel")}
//           </BaseButton>
//           <BaseButton 
//                 variantType='primary' 
//                 onClick={handleSubmit}
//           >
//             {t("privateSectorModal.buttons.confirm")}
//           </BaseButton>
//         </Group>
//       </Stack>
//     </BaseModal>
//   );
// };

import {
  Stack,
  Group,
  Box,
  Grid,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { BaseModal } from "../../../UI/modal/BaseModal";
import { BaseButton } from "../../../UI/button/BaseButton";
import { FloatingInput } from "../../../UI/input/FloatingInput";
// import { FloatingSelect } from "../../../UI/input/FloatingSelect";
import { useTranslation } from "react-i18next";
import { api } from "../../../api/axios";
import type {SectorFormValues} from "../../../types/sector/sector.form.types"

interface Props {
  opened: boolean;
  onClose: () => void;
}

export const PrivateSectorAddModal: React.FC<Props> = ({
  opened,
  onClose,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const form = useForm<SectorFormValues>({
  initialValues: {
    titleRu: "",
    titleKg: "",
    address: "",
    logo: null,
    parentId: null,
  },

  validate: {
    titleRu: (value) =>
      value.trim().length === 0
        ? "Title RU is required"
        : value.length > 255
        ? "Max 255 characters"
        : null,

    titleKg: (value) =>
      value.trim().length === 0
        ? "Title KG is required"
        : value.length > 255
        ? "Max 255 characters"
        : null,

    address: (value) =>
      value.trim().length === 0
        ? "Address is required"
        : value.length > 255
        ? "Max 255 characters"
        : null,
  },
});

  const mapToRequest = (
    values: SectorFormValues
  ): SectorFormValues => {
    return {
      titleRu: values.titleRu,
      titleKg: values.titleKg,
      address: values.address,
      logo: values.logo || null,
      parentId: values.parentId
        ? Number(values.parentId)
        : null,
    };
  };

 const mutation = useMutation({
  mutationFn: async (data: SectorFormValues) => {
    const response = await api.post(
      "/api/v1/sector",
      data
    );
    return response.data;
  },
  onSuccess: () => {
    notifications.show({
      title: t("notifications.success"),
      message: t("notifications.created"),
      color: "green",
    });

    queryClient.invalidateQueries({
      queryKey: ["sector"],
    });

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

  const handleSubmit = (
    values: SectorFormValues
  ) => {
    mutation.mutate(mapToRequest(values));
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
         <Box
          p="md"
          style={{
            border: '1px solid #303d43',
            borderRadius: 8,
          }}
        >
          <Title order={5} ta="center" mb="md">
            {t("privateSectorModal.title")}
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
                labelText={t("privateSectorModal.fields.parent")}
                {...form.getInputProps("parentId")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <FloatingInput
                labelText={t("privateSectorModal.fields.address")}
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
        </Box>

        <Group justify="center">
          <BaseButton 
                variantType="secondary" 
                 type="button"
                onClick={onClose}
          >
             {t("privateSectorModal.buttons.cancel")}
          </BaseButton>
          <BaseButton 
            variantType='primary' 
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