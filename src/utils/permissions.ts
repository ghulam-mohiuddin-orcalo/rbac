export const rolePermissions: Record<string, string[]> = {
  super_admin: ["*"], // Full access
  administrator: [
    "manage_options", "promote_users", "activate_plugins", "edit_posts", "delete_posts",
    "publish_posts", "manage_categories", "moderate_comments", "upload_files",
  ],
  editor: ["edit_posts", "delete_posts", "publish_posts", "manage_categories", "moderate_comments"],
  author: ["edit_posts", "delete_posts", "publish_posts", "upload_files"],
  contributor: ["edit_posts", "delete_posts"],
  subscriber: ["read"],
};

export const hasPermission = (role: string, requiredPermissions: string[]): boolean => {
  const userPermissions = rolePermissions[role] || [];
  if (userPermissions.includes("*")) return true; // Super Admin has full access
  return requiredPermissions.every((perm) => userPermissions.includes(perm));
};