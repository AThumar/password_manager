"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AddPassword() {
  const [website, setWebsite] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add logic to save the password
    console.log("Password added:", { website, username, password })
    // Reset form
    setWebsite("")
    setUsername("")
    setPassword("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="website">Website</Label>
        <Input id="website" type="text" value={website} onChange={(e) => setWebsite(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="username">Username</Label>
        <Input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <Button type="submit">Add Password</Button>
    </form>
  )
}

