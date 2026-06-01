'use client'

import dynamic from 'next/dynamic'

const GalaxyExperience = dynamic(() => import('./GalaxyExperience'), { ssr: false })

export default function GalaxyWrapper() {
  return <GalaxyExperience />
}
