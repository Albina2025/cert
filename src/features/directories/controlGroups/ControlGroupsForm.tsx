import { Grid } from "@mantine/core"
import { useForm } from "@mantine/form"
import { FloatingInput, FloatingSelect } from "../../../UI"
import { useEffect, useState } from "react"
import { api } from "../../../api/axios"
import { useTranslation } from "react-i18next"
import type { ControlGroupsFormValues } from "../../../types/control/controlGroups.form.types"
import type { ControlGroupsItem } from "../../../types/control/ControlGroups.item.types"

interface Props {
  defaultValues?: ControlGroupsFormValues
  onSubmit: (values: ControlGroupsFormValues) => void
}

export const ControlGroupsForm: React.FC<Props> = ({
  defaultValues,
  onSubmit,
}) => {
  const { t } = useTranslation()

  const [groups, setGroups] = useState<ControlGroupsItem[]>([])

  const form = useForm<ControlGroupsFormValues>({
    initialValues:
      defaultValues || {
        titleRu: "",
        titleKg: "",
        identifier: "",
        parentId: undefined,
      },

    validate: {
      titleRu: (v) =>
        !v || v.trim() === "" ? "Заполните это поле" : null,

      titleKg: (v) =>
        !v || v.trim() === "" ? "Заполните это поле" : null,

      identifier: (v) =>
        !v || v.trim() === "" ? "Заполните это поле" : null,
    },
  })

  useEffect(() => {
    const fetchGroups = async () => {
      const { data } = await api.post("/api/v1/controls/get-enabled", {
        pageRequest: { page: 0, limit: 100 },
        sorting: { sortBy: "ID", sortDirection: "ASC" },
        filter: {},
      })

      setGroups(data.content)
    }

    fetchGroups()
  }, [])

  useEffect(() => {
    if (defaultValues) {
      form.setValues(defaultValues)
    }
  }, [defaultValues])

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Grid>

        <Grid.Col span={6}>
          <FloatingInput
            required
            labelText={t("controlGroups.fields.titleRu")}
            placeholder={t("controlGroups.fields.titleRu")}
            {...form.getInputProps("titleRu")}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <FloatingInput
            required
            labelText={t("controlGroups.fields.titleKg")}
            placeholder={t("controlGroups.fields.titleKg")}
            {...form.getInputProps("titleKg")}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <FloatingInput
            required
            labelText={t("controlGroups.fields.identifier")}
            placeholder={t("controlGroups.fields.identifier")}
            {...form.getInputProps("identifier")}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <FloatingSelect
            labelText={t("controlGroups.fields.parent")}
            placeholder={t("controlGroups.fields.parent")}
            data={groups.map((g) => ({
              value: String(g.id),
              label: g.titleRu,
            }))}
            searchable
            clearable
            value={form.values.parentId?.toString() ?? ""}
            onChange={(v) =>
              form.setFieldValue("parentId", v ? Number(v) : undefined)
            }
          />
        </Grid.Col>

      </Grid>

      <button type="submit" hidden />
    </form>
  )
}