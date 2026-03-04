import {
  Table,
  Button,
  Group,
  Pagination,
  Select,
  Flex,
  Box,
  ScrollArea,
  Text,
} from '@mantine/core';
// import { useState } from 'react';
import { useMantineColorScheme } from '@mantine/core';
import { useTranslation } from "react-i18next";


export interface Column<T> {
  key: keyof T;
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface TableDataProps<T> {
  columns: Column<T>[];   
  data: T[];
  loading: boolean;
  page: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onAdd?: () => void;
  onFilter?: () => void;
}

 

export function TableData<T>({
  columns,
  data,
  totalPages,
  totalElements,
  page,
  onPageChange,
    pageSize,
  onPageSizeChange,
  onAdd,
  onFilter,
}: TableDataProps<T>) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  const { t } = useTranslation();

  

  return (
    <>
      <Group mb="sm">
        {onFilter && (
          <Button
            onClick={onFilter}
            radius={10}
            variant="filled"
            styles={{
              root: {
                backgroundColor: isDark ? '#ffffff' : '#000000',
                color: isDark ? '#000000' : '#ffffff',

                '&:hover': {
                  backgroundColor: isDark ? '#e6e6e6' : '#1a1a1a',
                },
              },
            }}
          >
             {t("tableData.filters")}
          </Button>
        )}

        {onAdd && (
          <Button
            onClick={onAdd}
            radius={10}
            variant="filled"
            styles={{
              root: {
                backgroundColor: isDark ? '#ffffff' : '#000000',
                color: isDark ? '#000000' : '#ffffff',

                '&:hover': {
                  backgroundColor: isDark ? '#e6e6e6' : '#1a1a1a',
                },
              },
            }}
          >
             {t("tableData.add")}
          </Button>
        )}
      </Group>

      <Box
        style={{
          background: isDark ? "#161d21" : "#fdfdfd",
          border: `1px solid ${isDark ? "#2c2f33" : "#d9d9d9"}`,
          borderRadius: 12,
          padding: 16,
        }}
      >
        <Box mb="md" > 
           <ScrollArea w="100%"  
              type="always"
              scrollbarSize={12} 
              offsetScrollbars
              styles={{
                thumb: {
                  backgroundColor: isDark ? '#ffffff' : '#000000',
                  '&:hover': {
                    backgroundColor: isDark ? '#d0d0d0' : '#333333',
                  },
                },
              }}
            > 
        
        <Table
          striped
          highlightOnHover
          withColumnBorders
          withTableBorder
          style={{
            borderCollapse: 'collapse',
            minWidth: 1200 ,
            width: '100%',
          }}
        >
         <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  style={{
                    whiteSpace: 'nowrap',
                    border: '1px solid #dee2e6',  
                    padding: '8px',
                    color: isDark ? "#ffffff" : "#000000", 
                  }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead> 

          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    style={{
                      whiteSpace: 'nowrap',
                      border: '1px solid #dee2e6',  
                      padding: '8px',
                      color: isDark ? "#ffffff" : "#000000", 
                    }}
                  >
                     {col.render
                      ? col.render(row)
                      : String(row[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

        
        </Table>
     
      </ScrollArea>
      </Box>
     
      <Flex justify="flex-end" align="center" mt="md">
        <Group >
          <Text
            size="sm"
            style={{
              color: isDark ? '#ffffff' : '#000000',
              fontWeight: 500,
            }}
          >
              {t("tableData.totalData")}:  {totalElements}
          </Text>

          {data.length === 0 ? (
            <div style={{ padding: 20}}>  {t("tableData.noData")}</div>
          ) : (
            <Pagination
              total={totalPages}
              value={page}
              onChange={onPageChange}
              styles={{
                control: {
                  borderRadius: '50%',
                  width: 36,
                  height: 36,
                  backgroundColor: isDark ? '#161d21' : '#ffffff',
                  color: isDark ?  '#ffffff' : '#000000',
                  borderColor: isDark ? '#2c2f33' : '#dee2e6',
                  

                  '&[dataActive]': {
                    backgroundColor: isDark ? '#2f9e44' : '#228be6',
                    color: '#ffffff',
                  },

                  '&:hover': {
                    backgroundColor: isDark ? '#2a2f33' : '#f1f3f5',
                  },
                },
              }}
            />
          )}

          <Select
            value={String(pageSize)}
            onChange={(value) => {
              if (value) {
                if (value) {
                  onPageSizeChange(Number(value));
                }
              }
            }}
            data={['2', '5', '10', '20', '50', '100']}
            w={100}
            styles={{
              input: {
                backgroundColor: isDark ? '#161d21' : '#fdfdfd',
                color: isDark ? '#fff' : '#000',
              },
              dropdown: {
                backgroundColor: isDark ? '#161d21' : '#ffffff',
              },
              option: {
                color: isDark ? '#fff' : '#000',
              },
            }}
          />
        </Group>
      </Flex>
       </Box>
    </>
  );
}

