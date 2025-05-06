'use client';
export interface User {
  id: string;
  name: string;
  email: string;
  role: "subscriber" | "author" | "editor" | "administrator" | "super_admin";
}

export const useAuth = () => {

  const mockUser: User = {
    id: "123",
    name: "Jane Doe",
    email: "jane@example.com",
    role: "super_admin",
  };

  return { user: mockUser };
}