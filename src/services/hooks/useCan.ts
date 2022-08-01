import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

type UseCanParams = {
  permissions?: string[];
  roles?: string[];
};

export default function useCan({ permissions, roles }: UseCanParams) {
  const { user, isAuthenticated } = useContext(AuthContext);

  return {};
}
