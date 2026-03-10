
// import { Select, useMantineColorScheme } from "@mantine/core";
// import type { SelectProps } from "@mantine/core";
// import { useState } from "react";

// interface FloatingSelectProps extends SelectProps {
//   labelText: string;
//   required?: boolean;
// }

// export const FloatingSelect: React.FC<FloatingSelectProps> = ({
//   labelText,
//   required,
//   value,
//   onChange,
//   ...props
// }) => {
//   const [focused, setFocused] = useState(false);
//   const [search, setSearch] = useState("");

//   const { colorScheme } = useMantineColorScheme();

//   const isDark = colorScheme === "dark";
//   const bg = isDark ? "#161d21" : "#fdfdfd";
//   const textColor = isDark ? "#ffffff" : "#000000";
//   const borderColor = isDark ? "#303d43" : "#d9d9d9";

//   const hasValue = !!value;

//   return (
//     <Select
//       {...props}
//       value={value}
//       onChange={onChange}
//       label={labelText}
//       required={required}
//       searchable
//       searchValue={search}
//       onSearchChange={setSearch}
//       nothingFoundMessage="Ничего не найдено"
//       placeholder={
//         focused || hasValue
//           ? ""
//           : required
//           ? `${labelText} *`
//           : labelText
//       }
//       onFocus={() => setFocused(true)}
//       onBlur={() => {
//         if (!value) setFocused(false);
//       }}
//       styles={{
//         wrapper: {
//           backgroundColor: bg,
//           borderRadius: 8,
//         },
//         input: {
//           backgroundColor: bg,
//           border: `1px solid ${borderColor}`,
//           color: textColor,
//         },
//         section: {
//           backgroundColor: bg,
//         },
//         dropdown: {
//           backgroundColor: bg,
//           color: textColor,
//         },
//         option: {
//           color: textColor,
//         },
//         label: {
//           color: textColor,
//           opacity: focused || hasValue ? 1 : 0,
//           transition: "all 0.2s ease",
//         },
//       }}
//     />
//   );
// };

import { Select, useMantineColorScheme } from "@mantine/core";
import type { SelectProps } from "@mantine/core";
import { useState } from "react";

interface FloatingSelectProps extends SelectProps {
  labelText: string;
  required?: boolean;
}

export const FloatingSelect: React.FC<FloatingSelectProps> = ({
  labelText,
  required,
  value,
  onChange,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const [search, setSearch] = useState("");

  const { colorScheme } = useMantineColorScheme();

  const isDark = colorScheme === "dark";
  const bg = isDark ? "#161d21" : "#fdfdfd";
  const textColor = isDark ? "#ffffff" : "#000000";
  const borderColor = isDark ? "#303d43" : "#d9d9d9";

  const hasValue = !!value;

  return (
    <Select
      {...props}
      value={value}
      onChange={onChange}
      label={labelText}
      required={required}

      /* 🔎 ПОИСК */
      searchable
      searchValue={search}
      onSearchChange={setSearch}
      nothingFoundMessage="Ничего не найдено"

      /* 📜 SCROLL */
      maxDropdownHeight={220}

      placeholder={
        focused || hasValue
          ? ""
          : required
          ? `${labelText} *`
          : labelText
      }

      onFocus={() => setFocused(true)}
      onBlur={() => {
        if (!value) setFocused(false);
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
        dropdown: {
          backgroundColor: bg,
          color: textColor,
          maxHeight: 220,
          overflowY: "auto",
        },
        option: {
          color: textColor,
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