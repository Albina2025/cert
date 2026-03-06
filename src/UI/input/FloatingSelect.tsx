import { Select, useMantineColorScheme } from '@mantine/core';
import type { SelectProps } from '@mantine/core';
import { useState } from 'react';

interface FloatingSelectProps extends SelectProps {
  labelText: string;
}

export const FloatingSelect: React.FC<FloatingSelectProps> = ({
  labelText,
  value,
  onChange,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const { colorScheme } = useMantineColorScheme();

  const isDark = colorScheme === 'dark';
  const bg = isDark ? '#161d21' : '#fdfdfd';
  const textColor = isDark ? '#ffffff' : '#000000';
  const borderColor = isDark ? '#303d43' : '#d9d9d9';
  const hasValue = !!value;

  return (
    <Select
      {...props}
      value={value}
      onChange={onChange}
      label={labelText}
      placeholder={focused || hasValue ? '' : labelText}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
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
        dropdown: {
            backgroundColor: bg,
            color: textColor,
        },
        label: {
            color: textColor,
            opacity: focused || hasValue ? 1 : 0,
            transition: 'all 0.2s ease',
        },
      }}
    />
  );
};