"use client"

import { useEffect, useState } from "react"

export default function Loading() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>

    interval = setInterval(() => {
      setProgress((old) => {
        if (old < 90) return old + 5 
        return old
      })
    }, 200)

    return () => {
      clearInterval(interval)
      setProgress(100)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] bg-transparent z-[9999]">
      <div
        className="h-full bg-blue-500 transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}