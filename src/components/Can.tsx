import { ReactNode } from "react";

interface CanProps {
  children: ReactNode;
  permission?: string[];
  role?: string[];
}

export default function Can({ children, permission, role }: CanProps) {
  return <div>Can</div>;
}
