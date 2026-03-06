import { Grid, Divider } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FloatingSelect } from "../../../UI/input/FloatingSelect";
import { BaseModal } from "../../../UI/modal/BaseModal";
import { BaseButton } from "../../../UI/button/BaseButton";
import { useTranslation } from "react-i18next";

import type { SoftwareSearchRequest } from "../../../types/software/software.request.types";

type Props = {
  opened: boolean;
  onClose: () => void;
  onApply: (values: SoftwareSearchRequest["filter"]) => void;
};

export const SoftwareFilterModal = ({
  opened,
  onClose,
  onApply,
}: Props) => {
  const { t } = useTranslation();

  const form = useForm<SoftwareSearchRequest["filter"]>({
    initialValues: {
      ministryId: null,
    },
  });

  const handleReset = () => {
    form.reset();
    onClose();
  };

  const handleApply = () => {
    onApply(form.values);
    onClose();
  };

  return (
    <BaseModal
      opened={opened}
      onClose={onClose}
      size="lg"
      radius={15}
      centered
      withCloseButton={false}
    >
      <Grid>
        <Grid.Col span={12}>
          <Divider
            size="sm"
            my="xs"
            label={t("softwareFilter.title")}
          />
        </Grid.Col>

        <Grid.Col span={12}>
          <FloatingSelect
            labelText={t("softwareFilter.fields.subject")}
            radius={10}
            data={[
              { value: "1", label: "Минфин" },
              { value: "2", label: "Минздрав" },
            ]}
            {...form.getInputProps("ministryId")}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <BaseButton
            onClick={handleReset}
            fullWidth
            variantType="secondary"
          >
            {t("softwareFilter.buttons.reset")}
          </BaseButton>
        </Grid.Col>

        <Grid.Col span={6}>
          <BaseButton
            onClick={handleApply}
            fullWidth
            variantType="primary"
          >
            {t("softwareFilter.buttons.apply")}
          </BaseButton>
        </Grid.Col>
      </Grid>
    </BaseModal>
  );
};