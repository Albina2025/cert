import { Button, useMantineColorScheme } from '@mantine/core';

type BaseButtonProps = {
  variantType?: 'primary' | 'secondary';
} & React.ComponentProps<typeof Button>;

export function BaseButton({
  variantType = 'primary',
  ...props
}: BaseButtonProps) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const bg =
    variantType === 'primary'
      ? isDark
        ? '#ffffff'
        : '#161d21'
      : isDark
      ? '#161d21'
      : '#ffffff';

  const color =
    variantType === 'primary'
      ? isDark
        ? '#000000'
        : '#ffffff'
      : isDark
      ? '#ffffff'
      : '#000000';

  const borderColor = isDark ? '#303d43' : '#d9d9d9';

  return (
    <Button
      {...props}
      styles={{
        root: {
          backgroundColor: bg,
          color,
          borderRadius: 8,
          border: `1px solid ${borderColor}`,
          transition: '0.2s ease',
        },
      }}
    />
  );
}