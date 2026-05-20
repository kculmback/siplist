import { Link } from "@tanstack/react-router";

import { UserButton } from "../auth/user/user-button";

export function Navigation() {
  return (
    <div className="flex items-center justify-between px-4 py-2 shadow">
      <Link to="/">
        <h1 className="text-2xl font-bold">Siplist</h1>
      </Link>
      <UserButton />
    </div>
  );
}
