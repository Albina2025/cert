
import { TextInput, useMantineColorScheme } from "@mantine/core";
import type { TextInputProps } from "@mantine/core";
import { useState } from "react";

interface FloatingInputProps extends TextInputProps {
  labelText: string;
   required?: boolean;
}

export const FloatingInput: React.FC<FloatingInputProps> = ({
  labelText,
   required,
  value,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const { colorScheme } = useMantineColorScheme();

  const isDark = colorScheme === "dark";
  const bg = isDark ? "#161d21" : "#fdfdfd";
  const textColor = isDark ? "#ffffff" : "#000000";
  const borderColor = isDark ? "#303d43" : "#d9d9d9";

  const hasValue = !!value;

  return (
    <TextInput
      {...props}
      value={value}
      label={labelText}
       required={required}
      placeholder={focused || hasValue ? "" : required  ? `${labelText} *`  : labelText}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.value) setFocused(false);
      }}
      styles={{
        wrapper: {
          backgroundColor: bg,
          borderRadius: 8,
        },
        input: {
          backgroundColor: bg,
          border: `1px solid ${borderColor}`,
          color: textColor,
        },
        section: {
          backgroundColor: bg,
        },
        label: {
          color: textColor,
          opacity: focused || hasValue ? 1 : 0,
          transition: "all 0.2s ease",
        },
      }}
    />
  );
};