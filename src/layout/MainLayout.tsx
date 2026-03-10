import { AppShell } from '@mantine/core';
import {Header, Sidebar} from './index'
import { Outlet } from 'react-router-dom';
import { useMantineColorScheme } from '@mantine/core';

export const MainLayout = () => {
const { colorScheme } = useMantineColorScheme();
const isDark = colorScheme === "dark";

  return (
    <AppShell
      padding="md"
      navbar={{ width: 280,  breakpoint: 'sm',}}
      header={{ height: 120 }}
    
    >
      <AppShell.Header
        style={{
          borderRadius: 12,
          marginLeft: 80,
          marginRight: 30,
          overflow: 'hidden',
          paddingLeft: 16,
          paddingRight: 16,
           background: isDark ? "#161d21" : "#fdfdfd",
        }}
      >
        <Header />
      </AppShell.Header>

      <AppShell.Navbar 
        style={{
          borderRadius: 12,
          margin: 10,
          overflow: 'hidden',
           boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            background: isDark ? "#161d21" : "#fdfdfd",
        }}
      >
        <Sidebar />
      </AppShell.Navbar>

      <AppShell.Main
          style={{
            minWidth: 0,
            background: isDark ? "#0e1315" : "#f3f3f3",
        }}
      >
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};