import React from 'react'
import type { Route } from './+types/home'
import { Link } from 'react-router'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Home - Three.js Demo' },
    { name: 'description', content: 'Three.js Examples' },
  ]
}

const DemoCard: React.FC = () => {}

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center gap-2 md:gap-4">
          Three.js Demo
        </div>
      </header>
      <main className="container py-3">
        <Link to='/start'>Start</Link>
      </main>
    </>
  )
}
