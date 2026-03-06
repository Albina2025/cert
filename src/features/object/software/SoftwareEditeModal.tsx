import { useEffect } from "react";
import {
  Stack,
  Group,
  Box,
  Grid,
  Title,
  Divider,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { useTranslation } from "react-i18next";
import { BaseModal } from "../../../UI/modal/BaseModal";
import { BaseButton } from "../../../UI/button/BaseButton";
import { FloatingInput } from "../../../UI/input/FloatingInput";
import { FloatingSelect } from "../../../UI/input/FloatingSelect";
import {getSoftwareById,updateSoftware,} from "../../../services/software.service";
import type { SoftwareFormValues } from "../../../types/software/software.form.types";
import type { SoftwareCreateRequest } from "../../../types/software/software.request.types";

interface Props {
  opened: boolean;
  onClose: () => void;
  softwareId: number | null;
}

export const SoftwareEditModal: React.FC<Props> = ({
  opened,
  onClose,
  softwareId,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const form = useForm<SoftwareFormValues>({
    initialValues: {
      ministryId: "",
      softwareName: "",
      softwarePurpose: "",
      manufacturer: "",
      supplier: "",
      purchaseDate: "",
      purchaseAmount: "",
      purchaseCurrencyId: "",
      softwareVersion: "",
      lastUpdateDate: "",
      licenseType: "",
      licenseExpiryDate: "",
      licenseCount: "",
    },
  });

  const { data } = useQuery({
    queryKey: ["software", softwareId],
    queryFn: () => getSoftwareById(softwareId!),
    enabled: !!softwareId,
  });

  useEffect(() => {
    if (data?.data) {
      form.setValues({
        ministryId: String(data.data.ministryDto?.id ?? ""),
        softwareName: data.data.softwareName ?? "",
        softwarePurpose: data.data.softwarePurpose ?? "",
        manufacturer: data.data.manufacturer ?? "",
        supplier: data.data.supplier ?? "",
        purchaseDate: data.data.purchaseDate ?? "",
        purchaseAmount: String(data.data.purchaseAmount ?? ""),
        purchaseCurrencyId: String(
          data.data.purchaseCurrency?.id ?? ""
        ),
        softwareVersion: data.data.softwareVersion ?? "",
        lastUpdateDate: data.data.lastUpdateDate ?? "",
        licenseType: data.data.licenseType ?? "",
        licenseExpiryDate: data.data.licenseExpiryDate ?? "",
        licenseCount: String(data.data.licenseCount ?? ""),
      });
    }
  }, [data]);

  const mapToRequest = (
    values: SoftwareFormValues
  ): SoftwareCreateRequest => {
    return {
      ministryId: Number(values.ministryId),
      softwareName: values.softwareName,
      softwarePurpose: values.softwarePurpose,
      manufacturer: values.manufacturer,
      supplier: values.supplier,
      purchaseDate: values.purchaseDate,
      purchaseAmount: Number(values.purchaseAmount),
      purchaseCurrencyId: Number(values.purchaseCurrencyId),
      softwareVersion: values.softwareVersion,
      lastUpdateDate: values.lastUpdateDate,
      licenseType: values.licenseType,
      licenseExpiryDate: values.licenseExpiryDate,
      licenseCount: Number(values.licenseCount),
    };
  };

  const mutation = useMutation({
    mutationFn: (values: SoftwareCreateRequest) =>
      updateSoftware(softwareId!, values),

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
  });

  const handleSubmit = (values: SoftwareFormValues) => {
    mutation.mutate(mapToRequest(values));
  };

  return (
    <BaseModal
      opened={opened}
      onClose={onClose}
      size={1200}
      centered
      withCloseButton={false}
    >
      <Stack>
        <Box
          p="md"
          style={{
            border: "1px solid #303d43",
            borderRadius: 8,
          }}
        >
          <Title ta="center">
            {t("softwareModal.editTitle")}
          </Title>

          <Divider />

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Grid>

                <Grid.Col span={6}>
                    <FloatingInput
                    type="number"
                    labelText={t("softwareModal.fields.subject")}
                    {...form.getInputProps("ministryId")}
                    />
                </Grid.Col>

                <Grid.Col span={6}>
                    <FloatingInput
                    labelText={t("softwareModal.fields.name")}
                    {...form.getInputProps("softwareName")}
                    />
                </Grid.Col>

                <Grid.Col span={6}>
                    <FloatingInput
                    labelText={t("softwareModal.fields.purpose")}
                    {...form.getInputProps("softwarePurpose")}
                    />
                </Grid.Col>

                <Grid.Col span={6}>
                    <FloatingInput
                    labelText={t("softwareModal.fields.manufacturer")}
                    {...form.getInputProps("manufacturer")}
                    />
                </Grid.Col>

                <Grid.Col span={6}>
                    <FloatingInput
                    labelText={t("softwareModal.fields.supplier")}
                    {...form.getInputProps("supplier")}
                    />
                </Grid.Col>

                <Grid.Col span={6}>
                    <FloatingInput
                    type="date"
                    labelText={t("softwareModal.fields.purchaseDate")}
                    {...form.getInputProps("purchaseDate")}
                    />
                </Grid.Col>

                <Grid.Col span={6}>
                    <FloatingInput
                    type="number"
                    labelText={t("softwareModal.fields.purchaseAmount")}
                    {...form.getInputProps("purchaseAmount")}
                    />
                </Grid.Col>

                <Grid.Col span={6}>
                    <FloatingInput
                    type="number"
                    labelText={t("softwareModal.fields.purchaseCurrency")}
                    {...form.getInputProps("purchaseCurrencyId")}
                    />
                </Grid.Col>

                <Grid.Col span={6}>
                    <FloatingInput
                    labelText={t("softwareModal.fields.softwareVersion")}
                    {...form.getInputProps("softwareVersion")}
                    />
                </Grid.Col>

                <Grid.Col span={6}>
                    <FloatingInput
                    type="date"
                    labelText={t("softwareModal.fields.lastUpdateDate")}
                    {...form.getInputProps("lastUpdateDate")}
                    />
                </Grid.Col>

                <Grid.Col span={6}>
                    <FloatingSelect
                    labelText={t("softwareModal.fields.licenseType")}
                    data={[
                        { value: "Perpetual", label: "Perpetual" },
                        { value: "Subscription", label: "Subscription" },
                    ]}
                    {...form.getInputProps("licenseType")}
                    />
                </Grid.Col>

                <Grid.Col span={6}>
                    <FloatingInput
                    type="date"
                    labelText={t("softwareModal.fields.licenseExpiryDate")}
                    {...form.getInputProps("licenseExpiryDate")}
                    />
                </Grid.Col>

                <Grid.Col span={12}>
                    <FloatingInput
                    type="number"
                    labelText={t("softwareModal.fields.licenseCount")}
                    {...form.getInputProps("licenseCount")}
                    />
                </Grid.Col>

                </Grid>

            <Group justify="center" mt="md">
              <BaseButton
                type="button"
                variantType="secondary"
                onClick={onClose}
              >
                {t("softwareModal.buttons.cancel")}
              </BaseButton>

              <BaseButton
                type="submit"
                variantType="primary"
                loading={mutation.isPending}
              >
                {t("softwareModal.buttons.confirm")}
              </BaseButton>
            </Group>

          </form>
        </Box>
      </Stack>
    </BaseModal>
  );
};