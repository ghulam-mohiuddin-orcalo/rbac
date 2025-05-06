import PermissionGuard from '@/PermissionGuard'
import { Box, Button } from '@mui/material'
import React from 'react'

export default function HomePage() {
  return (
    <PermissionGuard>
      <Box>
        HomePage

        <Box>
          <PermissionGuard requiredPermissions={['read']} fallback={<Button>Access Denied</Button>}>
            <Button>Edit</Button>
          </PermissionGuard>
        </Box>
      </Box>
    </PermissionGuard>
  )
}
