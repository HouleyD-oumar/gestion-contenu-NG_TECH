import React from "react";
import Link from 'next/link';

export default function Page() {
  return (
    <div>
      <h1 className="text-4xl">Gestion des utilisateurs</h1>
      <p className="text-2xl">
        
        <Link href="users/1">
         page détails
        </Link>
        </p>
    </div>
  );
}
