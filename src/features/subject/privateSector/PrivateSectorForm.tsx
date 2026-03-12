// import { useEffect, useState } from "react";
// import { Grid } from "@mantine/core";
// import { useForm } from "@mantine/form";
// import { zodResolver } from "mantine-form-zod-resolver";
// import { FloatingInput, FloatingSelect } from "../../../UI";
// import { api } from "../../../api/axios";
// import { useTranslation } from "react-i18next";

// import { privateSectorSchema, type PrivateSectorFormValues,   } from "../../../schemas/privateSector.schema";

// import type { SectorFormValues } from "../../../types/sector/sector.form.types";
// import type { SectorItem } from "../../../types/sector/sector.response.types";

// interface Props {
//   defaultValues?: SectorFormValues;
//   onSubmit: (values: SectorFormValues) => void;
// }

// export const PrivateSectorForm: React.FC<Props> = ({
//   defaultValues,
//   onSubmit,
// }) => {
//   const { t } = useTranslation();
//   const [parents, setParents] = useState<SectorItem[]>([]);

//   const form = useForm<PrivateSectorFormValues>({
//     initialValues:
//       defaultValues || {
//         titleRu: "",
//         titleKg: "",
//         address: "",
//         logo: "",
//         parentId: undefined,
//       },

//     validate: zodResolver(privateSectorSchema),
//   });

//   useEffect(() => {
//     const fetchParents = async () => {
//       try {
//         const { data } = await api.post<{ content: SectorItem[] }>(
//           "/api/v1/sector/search",
//           {
//             pageRequest: { page: 0, limit: 100 },
//             sorting: { sortBy: "ID", sortDirection: "ASC" },
//             filter: {},
//           }
//         );

//         setParents(data.content || []);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchParents();
//   }, []);

//   useEffect(() => {
//     if (defaultValues) {
//       form.setValues(defaultValues);
//     }
//   }, [defaultValues]);

//   return (
//     <form onSubmit={form.onSubmit(onSubmit)}>
//       <Grid>
//         <Grid.Col span={6}>
//           <FloatingInput
//             required
//             labelText={t("privateSectorModal.fields.titleRu")}
//             placeholder={t("privateSectorModal.fields.titleRu")}
//             {...form.getInputProps("titleRu")}
//           />
//         </Grid.Col>

//         <Grid.Col span={6}>
//           <FloatingInput
//             required
//             labelText={t("privateSectorModal.fields.titleKg")}
//             placeholder={t("privateSectorModal.fields.titleKg")}
//             {...form.getInputProps("titleKg")}
//           />
//         </Grid.Col>

//         <Grid.Col span={6}>
//           <FloatingInput
//             required
//             labelText={t("privateSectorModal.fields.address")}
//             placeholder={t("privateSectorModal.fields.address")}
//             {...form.getInputProps("address")}
//           />
//         </Grid.Col>

//         <Grid.Col span={6}>
//           <FloatingSelect
//             labelText={t("privateSectorModal.fields.parent")}
//             placeholder={t("privateSectorModal.fields.parent")}
//             searchable
//             clearable
//             data={parents.map((p) => ({
//               value: String(p.id),
//               label: p.titleRu,
//             }))}
//             value={form.values.parentId?.toString()}
//             onChange={(value) =>
//               form.setFieldValue("parentId", value ? Number(value) : undefined)
//             }
//             error={form.errors.parentId}
//           />
//         </Grid.Col>

//         <Grid.Col span={12}>
//           <FloatingInput
//             labelText={t("privateSectorModal.fields.logo")}
//             placeholder={t("privateSectorModal.fields.logo")}
//             {...form.getInputProps("logo")}
//           />
//         </Grid.Col>
//       </Grid>

//       <button type="submit" hidden />
//     </form>
//   );
// };

import { forwardRef, useEffect, useState } from "react"
import { Grid } from "@mantine/core"
import { useForm } from "@mantine/form"
import { zodResolver } from "mantine-form-zod-resolver"
import { FloatingInput, FloatingSelect } from "../../../UI"
import { api } from "../../../api/axios"
import { useTranslation } from "react-i18next"

import { privateSectorSchema, type PrivateSectorFormValues } from "../../../schemas/privateSector.schema"
import type { SectorFormValues } from "../../../types/sector/sector.form.types"
import type { SectorItem } from "../../../types/sector/sector.response.types"

interface Props {
  defaultValues?: SectorFormValues
  onSubmit: (values: SectorFormValues) => void
}

// 👇 forwardRef колдонуп ref коштук
export const PrivateSectorForm = forwardRef<HTMLFormElement, Props>(
  ({ defaultValues, onSubmit }, ref) => {
    const { t } = useTranslation()
    const [parents, setParents] = useState<SectorItem[]>([])

    const form = useForm<PrivateSectorFormValues>({
      initialValues:
        defaultValues || {
          titleRu: "",
          titleKg: "",
          address: "",
          logo: "",
          parentId: undefined,
        },
      validate: zodResolver(privateSectorSchema),
    })

    useEffect(() => {
      const fetchParents = async () => {
        try {
          const { data } = await api.post<{ content: SectorItem[] }>(
            "/api/v1/sector/search",
            {
              pageRequest: { page: 0, limit: 100 },
              sorting: { sortBy: "ID", sortDirection: "ASC" },
              filter: {},
            }
          )
          setParents(data.content || [])
        } catch (error) {
          console.error(error)
        }
      }
      fetchParents()
    }, [])

    useEffect(() => {
      if (defaultValues) form.setValues(defaultValues)
    }, [defaultValues])

    return (
      <form ref={ref} onSubmit={form.onSubmit(onSubmit)}>
        <Grid>
          <Grid.Col span={6}>
            <FloatingInput
              required
              labelText={t("privateSectorModal.fields.titleRu")}
              placeholder={t("privateSectorModal.fields.titleRu")}
              {...form.getInputProps("titleRu")}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <FloatingInput
              required
              labelText={t("privateSectorModal.fields.titleKg")}
              placeholder={t("privateSectorModal.fields.titleKg")}
              {...form.getInputProps("titleKg")}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <FloatingInput
              required
              labelText={t("privateSectorModal.fields.address")}
              placeholder={t("privateSectorModal.fields.address")}
              {...form.getInputProps("address")}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <FloatingSelect
              labelText={t("privateSectorModal.fields.parent")}
              placeholder={t("privateSectorModal.fields.parent")}
              searchable
              clearable
              data={parents.map((p) => ({ value: String(p.id), label: p.titleRu }))}
              value={form.values.parentId?.toString() ?? ""}
              onChange={(value) =>
                form.setFieldValue("parentId", value ? Number(value) : undefined)
              }
              error={form.errors.parentId}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <FloatingInput
              labelText={t("privateSectorModal.fields.logo")}
              placeholder={t("privateSectorModal.fields.logo")}
              {...form.getInputProps("logo")}
            />
          </Grid.Col>
        </Grid>

        <button type="submit" hidden />
      </form>
    )
  }
)

PrivateSectorForm.displayName = "PrivateSectorForm"