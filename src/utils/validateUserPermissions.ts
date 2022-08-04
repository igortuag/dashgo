type User = {
  permissions: string[];
  roles: string[];
};

type validateUserPermissionsParams = {
  user: User;
  permissions?: string[];
  roles?: string[];
};

export function validateUserPermissions({
  user,
  permissions,
  roles,
}: validateUserPermissionsParams) {
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
