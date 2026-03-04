import { Grid, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { BaseModal } from "../../../UI/modal/BaseModal";
import { BaseButton } from "../../../UI/button/BaseButton";
import { useTranslation } from "react-i18next";
import type { AiSearchRequest } from "../../../types/ai/ai.request.types";

type Props = {
  opened: boolean;
  onClose: () => void;
  onApply: (filter: AiSearchRequest["filter"]) => void;
};

export const AiFilterModal = ({
  opened,
  onClose,
  onApply,
}: Props) => {
  const { t } = useTranslation();

  const form = useForm<{
    ministryId: string | null;
    computePlatformTypeId: string | null;
  }>({
    initialValues: {
      ministryId: null,
      computePlatformTypeId: null,
    },
  });

  const handleApply = () => {
    onApply({
      ministryId: form.values.ministryId
        ? Number(form.values.ministryId)
        : null,
      computePlatformTypeId: form.values.computePlatformTypeId
        ? Number(form.values.computePlatformTypeId)
        : null,
    });

    onClose();
  };

  const handleReset = () => {
    form.reset();

    onApply({
      ministryId: null,
      computePlatformTypeId: null,
    });

    onClose();
  };

  return (
    <BaseModal
      opened={opened}
      onClose={onClose}
      centered
      size="lg"
      withCloseButton={false}
      zIndex={1000}
    >
      <Grid gutter="md">

        {/* ================= SUBJECT ================= */}
        <Grid.Col span={12}>
          <Select
            label={t("aiFilter.fields.subject")}
            placeholder={t("aiFilter.placeholders.subject")}
            data={[
              { value: "1", label: "Минфин" },
              { value: "2", label: "Минздрав" },
              { value: "3", label: "Генеральная Прокуратура" },
              { value: "4", label: "Министерство внутренних дел" },
              { value: "5", label: "Государственный комитет национальной безопасности" },
            ]}
            searchable
            clearable
            comboboxProps={{ withinPortal: false }}
            {...form.getInputProps("ministryId")}
          />
        </Grid.Col>

        {/* ================= PLATFORM TYPE ================= */}
        <Grid.Col span={12}>
          <Select
            label={t("aiFilter.fields.platformType")}
            placeholder={t("aiFilter.placeholders.platformType")}
            data={[
              { value: "1", label: "Server" },
              { value: "2", label: "Workstation" },
            ]}
            searchable
            clearable
            comboboxProps={{ withinPortal: false }}
            {...form.getInputProps("computePlatformTypeId")}
          />
        </Grid.Col>

        {/* ================= BUTTONS ================= */}
        <Grid.Col span={6}>
          <BaseButton
            fullWidth
            variantType="secondary"
            onClick={handleReset}
          >
            {t("aiFilter.buttons.reset")}
          </BaseButton>
        </Grid.Col>

        <Grid.Col span={6}>
          <BaseButton
            fullWidth
            variantType="primary"
            onClick={handleApply}
          >
            {t("aiFilter.buttons.apply")}
          </BaseButton>
        </Grid.Col>

      </Grid>
    </BaseModal>
  );
};


