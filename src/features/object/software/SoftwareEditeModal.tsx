import { useEffect } from "react";
import { useForm } from "@mantine/form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { BaseModal } from "../../../UI/modal/BaseModal";
import { BaseButton } from "../../../UI/button/BaseButton";
import { FloatingInput } from "../../../UI/input/FloatingInput";
import { useTranslation } from "react-i18next";

import {
  getSoftwareById,
  updateSoftware,
} from "../../../services/software.service";

import type {SoftwareCreateRequest} from "../../../types/software/software.request.types";

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
  const queryClient = useQueryClient();
    const { t } = useTranslation();

  // ================= FORM =================
  const form = useForm<SoftwareCreateRequest>({
    initialValues: {
      ministryId: 0,
      softwareName: "",
      softwarePurpose: "",
      manufacturer: "",
      supplier: "",
      purchaseDate: "",
      purchaseAmount: 0,
      purchaseCurrencyId: 0,
      softwareVersion: "",
      lastUpdateDate: "",
      licenseType: "",
      licenseExpiryDate: "",
      licenseCount: 0,
    },
  });

  // ================= GET BY ID =================
  const { data } = useQuery({
    queryKey: ["software", softwareId],
    queryFn: () => getSoftwareById(softwareId!),
    enabled: !!softwareId,
  });

  useEffect(() => {
    if (data?.data) {
      form.setValues({
        ministryId: data.data.ministryDto?.id ?? 0,
        softwareName: data.data.softwareName,
        softwarePurpose: data.data.softwarePurpose,
        manufacturer: data.data.manufacturer,
        supplier: data.data.supplier,
        purchaseDate: data.data.purchaseDate,
        purchaseAmount: Number(data.data.purchaseAmount),
        purchaseCurrencyId: data.data.purchaseCurrency?.id ?? 0,
        softwareVersion: data.data.softwareVersion,
        lastUpdateDate: data.data.lastUpdateDate,
        licenseType: data.data.licenseType,
        licenseExpiryDate: data.data.licenseExpiryDate,
        licenseCount: data.data.licenseCount,
      });
    }
  }, [data]);

  // ================= UPDATE =================
  const mutation = useMutation({
    mutationFn: (values: SoftwareCreateRequest) =>
      updateSoftware(softwareId!, values),

    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Software updated successfully",
        color: "green",
      });

      queryClient.invalidateQueries({ queryKey: ["software"] });
      onClose();
    },

    onError: () => {
      notifications.show({
        title: "Error",
        message: "Something went wrong",
        color: "red",
      });
    },
  });

  return (
    <BaseModal opened={opened} onClose={onClose} centered>
      <form
        onSubmit={form.onSubmit((values) =>
          mutation.mutate(values)
        )}
      >
        <FloatingInput
          labelText="Software Name"
          {...form.getInputProps("softwareName")}
        />

        <FloatingInput
          labelText="Version"
          {...form.getInputProps("softwareVersion")}
        />

        <FloatingInput
          type="number"
          labelText="License Count"
          {...form.getInputProps("licenseCount")}
        />

        <BaseButton
              type="submit"
              fullWidth
              loading={mutation.isPending}
            >
              {t("buttons.save")}
            </BaseButton>
      </form>
    </BaseModal>
  );
};