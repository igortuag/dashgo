import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { validateUserPermissions } from "../../utils/validateUserPermissions";

type UseCanParams = {
  permissions?: string[];
  roles?: string[];
};

export default function useCan({ permissions, roles }: UseCanParams) {
  const { user, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) return false;

  return validateUserPermissions({ user, permissions, roles });
}
