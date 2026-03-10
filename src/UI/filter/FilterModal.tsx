import { Grid, Divider, Switch } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCheck, IconX } from "@tabler/icons-react";
import { BaseModal, BaseButton, FloatingInput, FloatingSelect } from "../index";
import { useTranslation } from "react-i18next";

type SelectOption = {
  value: string;
  label: string;
};

export type FilterField<T> =
  | {
        type: "text" | "number";
        name: keyof T & string;
        label: string;
         placeholder?: string;
        span?: number;
    }
  | {
        type: "select";
        name: keyof T & string;
        label: string;
        placeholder?: string;
        data: SelectOption[];
        span?: number;
    }
  | {
        type: "switch";
        name: keyof T & string;
        label: string;
        span?: number;
    };


type Props<T extends Record<string, unknown>> = {
  opened: boolean;
  onClose: () => void;
  onApply: (values: T) => void;
  initialValues: T;
  title: string;
  fields: FilterField<T>[];
};

export function FilterModal<T extends Record<string, unknown>>({
  opened,
  onClose,
  onApply,
  initialValues,
  title,
  fields,
}: Props<T>) {
  const form = useForm<T>({
    initialValues,
  });

   const { t } = useTranslation();

  const handleApply = () => {
    onApply(form.values);
    onClose();
  };

  const handleReset = () => {
    form.reset();
    onApply(initialValues);
    onClose();
  };

  return (
    <BaseModal
      opened={opened}
      onClose={onClose}
      centered
      size="lg"
      withCloseButton={false}
      radius={15}
    >
      <Grid>
        <Grid.Col span={12}>
          <Divider label={title} />
        </Grid.Col>

        {fields.map((field) => {
          const span = field.span ?? 12;

          if (field.type === "text" || field.type === "number") {
            return (
              <Grid.Col span={span} key={field.name}>
                <FloatingInput
                  type={field.type}
                  labelText={field.label}
                  {...form.getInputProps(field.name)}
                />
              </Grid.Col>
            );
          }

          if (field.type === "select") {
            return (
              <Grid.Col span={span} key={field.name}>
                <FloatingSelect
                    labelText={field.label}
                    placeholder={field.placeholder}
                    data={field.data}
                    {...form.getInputProps(field.name)}
                />
              </Grid.Col>
            );
          }

          if (field.type === "switch") {
            const value = form.values[field.name as keyof T];

            return (
              <Grid.Col span={span} key={field.name}>
                <Switch
                    label={field.label}
                    checked={Boolean(form.values[field.name])}
                    onChange={(e) =>
                        form.setValues({
                            ...form.values,
                            [field.name]: e.currentTarget.checked,
                        })
                    }
                    color={value ? "green" : "red"}
                    thumbIcon={
                    value ? <IconCheck size={12} /> : <IconX size={12} />
                  }
                />
              </Grid.Col>
            );
          }

          return null;
        })}

        <Grid.Col span={6}>
          <BaseButton
            fullWidth
            variantType="secondary"
            onClick={handleReset}
          >
            {t("privateSectorFilter.buttons.reset")}
          </BaseButton>
        </Grid.Col>

        <Grid.Col span={6}>
          <BaseButton
            fullWidth
            variantType="primary"
            onClick={handleApply}
          >
            {t("privateSectorFilter.buttons.apply")}
          </BaseButton>
        </Grid.Col>
      </Grid>
    </BaseModal>
  );
}