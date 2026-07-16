"use client";

import { signOut } from "next-auth/react";

export default function Users() {
  const handleLogout = async () => {
    await signOut({ redirect: false });
    window.location.href = "/";
  };

  return (
    <div>
      <p>hola pagina de owner1</p>
    </div>
  );
}
