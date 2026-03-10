import { useEffect, useState } from "react";
import { FloatingInput, FloatingSelect } from "../../../UI/index";
import { Grid} from "@mantine/core";
import { useForm } from "@mantine/form";
import { api } from "../../../api/axios";
import type { SectorFormValues } from "../../../types/sector/sector.form.types";
import type { SectorItem } from "../../../types/sector/sector.response.types";
import { useTranslation } from "react-i18next";

interface Props {
  defaultValues?: SectorFormValues;
  onSubmit: (values: SectorFormValues) => void;
}

export const PrivateSectorForm: React.FC<Props> = ({ defaultValues, onSubmit }) => {
  const [parents, setParents] = useState<SectorItem[]>([]);
  const { t } = useTranslation();

  const form = useForm<SectorFormValues>({
    initialValues: defaultValues || {
      titleRu: "",
      titleKg: "",
      address: "",
      logo: "",
      parentId: undefined,
    },
    validate: {
      titleRu: (v) => (!v || v.trim() === "" ? "Заполните это поле" : null),
      titleKg: (v) => (!v || v.trim() === "" ? "Заполните это поле" : null),
      address: (v) => (!v || v.trim() === "" ? "Заполните это поле" : null),
    },
  });

  useEffect(() => {
    const fetchParents = async () => {
      try {
        const { data } = await api.post<{ content: SectorItem[] }>("/api/v1/sector/get-enabled", {
          pageRequest: { page: 0, limit: 100 },
          sorting: { sortBy: "ID", sortDirection: "ASC" },
          filter: {},
        });
        setParents(data.content || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchParents();
  }, []);

  useEffect(() => {
    if (defaultValues) {
      form.setValues(defaultValues);
    }
  }, [defaultValues]);

  const allFieldsValid = () => Object.values(form.errors).every((err) => err === null);

  return (
    <form
      onSubmit={form.onSubmit((values) => onSubmit(values))}
    >
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
            onChange={(value) => form.setFieldValue("parentId", value ? Number(value) : undefined)}
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
      <button type="submit" disabled={!allFieldsValid()} style={{ display: "none" }} />
    </form>
  );
};