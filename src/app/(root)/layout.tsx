'use client';
import { useMemo, useState } from 'react';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { useAuth } from "@/hooks/useAuth";
import PermissionGuard from "@/PermissionGuard";
import { Box, Chip, IconButton, Stack, TextField, Tooltip, Typography } from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SearchIcon from '@mui/icons-material/Search';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import {
  DashboardLayout,
  ThemeSwitcher,
  type SidebarFooterProps,
} from '@toolpad/core/DashboardLayout';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useAuth();
  const [session, setSession] = useState<any>({
    user: {
      name: 'Bharat Kashyap',
      email: 'bharatkashyap@outlook.com',
      image: 'https://avatars.githubusercontent.com/u/19550456',
    },
  });

  const authentication = useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: 'Bharat Kashyap',
            email: 'bharatkashyap@outlook.com',
            image: 'https://avatars.githubusercontent.com/u/19550456',
          },
        });
      },
      signOut: () => {
        setSession(null);
      },
    };
  }, []);

  function ToolbarActionsSearch() {
    return (
      <Stack direction="row">
        <Tooltip title="Search" enterDelay={1000}>
          <div>
            <IconButton
              type="button"
              aria-label="search"
              sx={{
                display: { xs: 'inline', md: 'none' },
              }}
            >
              <SearchIcon />
            </IconButton>
          </div>
        </Tooltip>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          slotProps={{
            input: {
              endAdornment: (
                <IconButton type="button" aria-label="search" size="small">
                  <SearchIcon />
                </IconButton>
              ),
              sx: { pr: 0.5 },
            },
          }}
          sx={{ display: { xs: 'none', md: 'inline-block' }, mr: 1 }}
        />
        {/* <ThemeSwitcher /> */}
      </Stack>
    );
  }

  function SidebarFooter({ mini }: SidebarFooterProps) {
    return (
      <Typography
        variant="caption"
        sx={{ m: 1, whiteSpace: 'nowrap', overflow: 'hidden' }}
      >
        {mini ? '© MUI' : `© ${new Date().getFullYear()} Made with love by MUI`}
      </Typography>
    );
  }

  function CustomAppTitle() {
    return (
      <Stack direction="row" alignItems="center" spacing={2}>
        <CloudCircleIcon fontSize="large" color="primary" />
        <Typography variant="h6">My App</Typography>
        <Chip size="small" label="BETA" color="info" />
        <Tooltip title="Connected to production">
          <CheckCircleIcon color="success" fontSize="small" />
        </Tooltip>
      </Stack>
    );
  }

  return (
    <>
      <AppProvider
        session={session}
        authentication={authentication}
        branding={{
          logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
          title: 'MUI',
          homeUrl: '/',
        }}

        navigation={[
          {
            kind: 'header',
            title: 'Main items',
          },
          {
            segment: 'dashboard',
            title: 'Dashboard',
            icon: <DashboardIcon />,
          },
          {
            segment: 'orders',
            title: 'Orders',
            icon: <ShoppingCartIcon />,
          },
        ]}
      >
        <DashboardLayout
          slots={{
            appTitle: CustomAppTitle,
            toolbarActions: ToolbarActionsSearch,
            sidebarFooter: SidebarFooter,
          }}
        >
          {children}
        </DashboardLayout>
      </AppProvider>
      {/* <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <Box sx={{ height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', backgroundColor: '#f0f0f0' }}>
          <Box>Topbar</Box>
          <PermissionGuard fallback={<Box>login</Box>}>
            {user.name}
          </PermissionGuard>
        </Box>
        <Box sx={{ flex: '1' }}>
          {children}
        </Box>
        <Box sx={{ height: '44px' }}>Footer</Box>
      </Box> */}
    </>
  );
}
