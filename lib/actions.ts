"use server"

import { query } from "./db"

export async function updateProfile(profileData) {
  try {
    // Update profile table
    await query(
      `
      UPDATE profile SET
        name = ?,
        mobile = ?,
        email = ?,
        linkedin = ?,
        github = ?,
        careerObjective = ?,
        fatherName = ?,
        address = ?,
        dob = ?,
        gender = ?,
        maritalStatus = ?,
        languages = ?,
        place = ?,
        date = ?,
        declaration = ?
      WHERE id = 1
    `,
      [
        profileData.name,
        profileData.mobile,
        profileData.email,
        profileData.linkedin,
        profileData.github,
        profileData.careerObjective,
        profileData.fatherName,
        profileData.address,
        profileData.dob,
        profileData.gender,
        profileData.maritalStatus,
        Array.isArray(profileData.languages) ? profileData.languages.join(", ") : profileData.languages,
        profileData.place,
        profileData.date,
        profileData.declaration,
      ],
    )

    return { success: true }
  } catch (error) {
    console.error("Error updating profile:", error)
    throw new Error("Failed to update profile")
  }
}

