import Link from 'next/link';
import React from 'react';

export default function Page( ) {
  return (
    <div>
      <h1 className="text-4xl">page de gestion de contenus</h1>
        example 
       <ul>
          <li>
            
            
            <Link href="contents/1"> contenu 1</Link>
          </li>
       </ul>
    </div>
  );
}