import React from "react";
import { useQuery } from "react-query";
import { api } from "../api";

export default function useUsers() {
  return useQuery(
    "users",
    async () => {
      const { data } = await api.get("/users");

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
    },
    {
      staleTime: 5000,
    }
  );
}
