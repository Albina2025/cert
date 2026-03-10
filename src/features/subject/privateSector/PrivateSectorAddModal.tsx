import { useEffect, useState } from "react";
import { Stack, Group, Box, Grid, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import {BaseModal, BaseButton, FloatingInput, FloatingSelect} from "../../../UI/index"
import { useTranslation } from "react-i18next";
import { api } from "../../../api/axios";
import type { SectorFormValues } from "../../../types/sector/sector.form.types";
import type { CreateSectorRequest } from "../../../types/sector/sector.request.types";
import type { SectorItem } from "../../../types/sector/sector.response.types";

interface Props {
  opened: boolean;
  onClose: () => void;
}

export const PrivateSectorAddModal: React.FC<Props> = ({ opened, onClose }) => {
  const { t } = useTranslation();
  const [parents, setParents] = useState<SectorItem[]>([]);

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

  const form = useForm<SectorFormValues>({
    initialValues: {
      titleRu: "",
      titleKg: "",
      address: "",
      logo: "",
      parentId: undefined,
    },
    validate: {
      titleRu: (value) => (!value || value.trim() === "" ? "Заполните это поле" : null),
      titleKg: (value) => (!value || value.trim() === "" ? "Заполните это поле" : null),
      address: (value) => (!value || value.trim() === "" ? "Заполните это поле" : null),
      logo: (value) => (!value || value.trim() === "" ? "Заполните это поле" : null),
      parentId: (value) => (!value ? "Заполните это поле" : null),
    },
  });

  const allFieldsValid = () => Object.values(form.errors).every((err) => err === null);

  const mapToRequest = (values: SectorFormValues): CreateSectorRequest => ({
    titleRu: values.titleRu,
    titleKg: values.titleKg,
    address: values.address,
    logo: values.logo,
    parentId: values.parentId,
  });

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      await api.post("/api/v1/sector", mapToRequest(values));
      notifications.show({
        title: t("notifications.success"),
        message: t("notifications.created"),
        color: "green",
      });
      form.reset();
      onClose();
    } catch {
      notifications.show({
        title: t("notifications.error"),
        message: t("notifications.somethingWrong"),
        color: "red",
      });
    }
  });

  return (
    <BaseModal opened={opened} onClose={onClose} centered size={800} withCloseButton={false}>
      <Stack>
        <form onSubmit={handleSubmit}>
          <Box p="md" style={{ border: "1px solid #303d43", borderRadius: 8 }}>
            <Title order={5} ta="center" mb="md">
              {t("privateSectorModal.title")}
            </Title>
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
          </Box>
          <Group justify="center" mt="md">
            <BaseButton variantType="secondary" type="button" onClick={onClose}>
              {t("privateSectorModal.buttons.cancel")}
            </BaseButton>
            <BaseButton
              variantType="primary"
              type="submit"
              disabled={!allFieldsValid()}
            >
              {t("privateSectorModal.buttons.confirm")}
            </BaseButton>
          </Group>
        </form>
      </Stack>
    </BaseModal>
  );
};