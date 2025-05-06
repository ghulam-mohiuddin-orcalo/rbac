'use client';
import { useAuth } from "@/hooks/useAuth";
import PermissionGuard from "@/PermissionGuard";
import { Box } from "@mui/material";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useAuth();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
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
    </Box>
  );
}
