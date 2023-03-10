import React from 'react'
import Link from 'next/link'

export default function NavBar() {
  return (
    <nav className="navbar">
      <Link href="/">
        <h1 className="site-title">Bytemaps</h1>
      </Link>
    </nav>
  )
}
