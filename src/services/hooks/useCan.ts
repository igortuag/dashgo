import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

type UseCanParams = {
  permissions?: string[];
  roles?: string[];
};

export default function useCan({ permissions, roles }: UseCanParams) {
  const { user, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) return false;

  if (permissions?.length > 0) {
    const hasAllPermissions = permissions.every((permission) => {
      return user.permissions.includes(permission);
    });

    if (!hasAllPermissions) return false;
  }

  if (roles?.length > 0) {
    const hasAllPermissions = permissions.some((role) => {
      return user.permissions.includes(role);
    });

    if (!hasAllPermissions) return false;
  }

  return true;
}
