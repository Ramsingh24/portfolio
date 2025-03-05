"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { updateProfile } from "@/lib/actions"

export default function AdminPage() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/profile")
        const data = await res.json()
        setProfile(data)
      } catch (error) {
        console.error("Error fetching profile:", error)
        setMessage("Failed to load profile data")
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("Saving changes...")

    try {
      await updateProfile(profile)
      setMessage("Profile updated successfully!")
    } catch (error) {
      console.error("Error updating profile:", error)
      setMessage("Failed to update profile")
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  if (loading) return <div className="p-8">Loading...</div>
  if (!profile) return <div className="p-8">Failed to load profile data</div>

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {message && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">{message}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2">Name</label>
            <Input name="name" value={profile.name || ""} onChange={handleChange} />
          </div>

          <div>
            <label className="block mb-2">Mobile</label>
            <Input name="mobile" value={profile.mobile || ""} onChange={handleChange} />
          </div>

          <div>
            <label className="block mb-2">Email</label>
            <Input name="email" type="email" value={profile.email || ""} onChange={handleChange} />
          </div>

          <div>
            <label className="block mb-2">LinkedIn</label>
            <Input name="linkedin" value={profile.linkedin || ""} onChange={handleChange} />
          </div>

          <div>
            <label className="block mb-2">GitHub</label>
            <Input name="github" value={profile.github || ""} onChange={handleChange} />
          </div>
        </div>

        <div>
          <label className="block mb-2">Career Objective</label>
          <Textarea name="careerObjective" value={profile.careerObjective || ""} onChange={handleChange} rows={3} />
        </div>

        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  )
}

