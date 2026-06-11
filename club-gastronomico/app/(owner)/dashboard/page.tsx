"use client";

import { signOut } from "next-auth/react";

export default function Users() {
  const handleLogout = async () => {
    await signOut({ redirect: false });
    window.location.href = "/";
  };

  return (
    <div>
      <p>hola pagina de owner</p>
      <button
        onClick={handleLogout}
        style={{
          marginTop: "20px",
          padding: "8px 16px",
          backgroundColor: "#ef4444",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Cerrar Sesión
      </button>
    </div>
  );
}
