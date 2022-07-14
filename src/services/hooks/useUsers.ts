import { useQuery } from "react-query";
import { api } from "../api";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export async function getUsers(page: number): Promise<User[]> {
  const { data } = await api.get("/users", {
    params: {
      page,
    },
  });

  const users = data.users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: new Date(user.created_at).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
  }));

  return users;
}

export default function useUsers(page: number) {
  return useQuery("users", () => getUsers(page), {
    staleTime: 5000,
  });
}
