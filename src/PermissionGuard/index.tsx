'use client';
import { ReactNode, useEffect, useState } from "react";
import { hasPermission } from "@/utils/permissions";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface PermissionGuardProps {
  requiredPermissions?: string[];
  attributes?: Record<string, any>;
  fallback?: ReactNode;
  children: ReactNode;
}

const PermissionGuard: React.FC<PermissionGuardProps> = ({
  requiredPermissions = [],
  attributes = {},
  fallback = null,
  children,
}) => {
  const router = useRouter();
  const { user } = useAuth();

  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
      setIsAuthorized(false);
      return;
    }

    if (
      requiredPermissions.length > 0 &&
      !hasPermission(user?.role, requiredPermissions)
    ) {
      setIsAuthorized(false);
      return;
    }

    if (attributes.ownerId && user?.id !== attributes.ownerId) {
      setIsAuthorized(false);
      return;
    }

    setIsAuthorized(true);
  }, [user, router, requiredPermissions, attributes]);

  if (isAuthorized === null) {
    // Optional: loading spinner or null while decision is pending
    return null;
  }

  if (!isAuthorized) {
    return fallback;
  }

  return <>{children}</>;
};

export default PermissionGuard;
