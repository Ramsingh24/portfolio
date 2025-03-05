import { query, initDatabase } from "./db"

// Initialize database on first import
initDatabase().catch(console.error)

export async function getProfileData() {
  try {
    // Get profile data
    const profileData = await query("SELECT * FROM profile LIMIT 1")
    const profile = profileData[0] || {}

    // Get education data
    const educationData = await query("SELECT * FROM education ORDER BY year DESC")

    // Get skills
    const softSkills = await query("SELECT skill FROM soft_skills")
    const technicalSkills = await query("SELECT skill FROM technical_skills")

    // Get hobbies
    const hobbies = await query("SELECT hobby FROM hobbies")

    return {
      ...profile,
      education: educationData,
      softSkills: softSkills.map((item) => item.skill),
      technicalSkills: technicalSkills.map((item) => item.skill),
      hobbies: hobbies.map((item) => item.hobby),
      languages: profile.languages ? profile.languages.split(",").map((lang) => lang.trim()) : [],
    }
  } catch (error) {
    console.error("Error fetching profile data:", error)

    // Return default data if database query fails
    return {
      name: "Ram Singh",
      mobile: "8303943994",
      email: "vipinbhadauria1975@gmail.com",
      linkedin: "www.linkedin.com/in/ram-singh-bhadauria-722835265",
      github: "Ramsingh24",
      careerObjective:
        "To serve in an organization where my knowledge and skill scan be utilized for the growth of the organization.",
      education: [
        {
          standard: "B.C.A.",
          board: "CSJMU, Kanpur",
          school: "PSIT College of Higher Education, Kanpur",
          year: "2026",
          percentage: "75.14",
        },
        {
          standard: "Intermediate",
          board: "CBSE",
          school: "Dr. Virendra Swarup Education Centre, Panki, Kanpur",
          year: "2022",
          percentage: "72.2",
        },
        {
          standard: "High School",
          board: "CBSE",
          school: "Dr. Virendra Swarup Education Centre, Panki, Kanpur",
          year: "2020",
          percentage: "74.17",
        },
      ],
      softSkills: ["Problem Solving", "Leadership", "Adaptability", "Team Work", "Time Management"],
      technicalSkills: ["C", "C++", "HTML", "CSS", "JAVASCRIPT", "Framework React JS", "Express Js", "Node Js"],
      hobbies: ["Travelling", "Learning"],
      fatherName: "Mr. Bipin Kumar Singh",
      address: "705 C block, Panki, Kanpur, Uttar Pradesh",
      dob: "7 Aug,2004",
      gender: "Male",
      maritalStatus: "Single",
      languages: ["Hindi", "English"],
      place: "Kanpur",
      date: "3 Feb,2025",
      declaration:
        "I hereby declare that the information furnished above is true to the best of my knowledge and belief.",
    }
  }
}

