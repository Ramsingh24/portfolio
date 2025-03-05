import mysql from "mysql2/promise"

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "14565220255353",
  database: process.env.DB_NAME || "portfolio",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export async function query(sql: string, params: any[] = []) {
  try {
    const [results] = await pool.execute(sql, params)
    return results
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}

// Initialize database tables if they don't exist
export async function initDatabase() {
  try {
    // Create profile table
    await query(`
      CREATE TABLE IF NOT EXISTS profile (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        mobile VARCHAR(20),
        email VARCHAR(100),
        linkedin VARCHAR(255),
        github VARCHAR(100),
        photo VARCHAR(255),
        careerObjective TEXT,
        fatherName VARCHAR(100),
        address TEXT,
        dob VARCHAR(50),
        gender VARCHAR(20),
        maritalStatus VARCHAR(50),
        languages TEXT,
        place VARCHAR(100),
        date VARCHAR(50),
        declaration TEXT
      )
    `)

    // Create education table
    await query(`
      CREATE TABLE IF NOT EXISTS education (
        id INT AUTO_INCREMENT PRIMARY KEY,
        standard VARCHAR(100),
        board VARCHAR(100),
        school VARCHAR(255),
        year VARCHAR(20),
        percentage VARCHAR(20)
      )
    `)

    // Create skills tables
    await query(`
      CREATE TABLE IF NOT EXISTS soft_skills (
        id INT AUTO_INCREMENT PRIMARY KEY,
        skill VARCHAR(100) NOT NULL
      )
    `)

    await query(`
      CREATE TABLE IF NOT EXISTS technical_skills (
        id INT AUTO_INCREMENT PRIMARY KEY,
        skill VARCHAR(100) NOT NULL
      )
    `)

    // Create hobbies table
    await query(`
      CREATE TABLE IF NOT EXISTS hobbies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        hobby VARCHAR(100) NOT NULL
      )
    `)

    // Check if profile data exists, if not insert default data
    const profileExists = await query("SELECT COUNT(*) as count FROM profile")
    if (profileExists[0].count === 0) {
      await seedDefaultData()
    }

    console.log("Database initialized successfully")
  } catch (error) {
    console.error("Database initialization error:", error)
    throw error
  }
}

async function seedDefaultData() {
  // Insert default profile data
  await query(`
    INSERT INTO profile (
      name, mobile, email, linkedin, github, careerObjective, 
      fatherName, address, dob, gender, maritalStatus, languages, 
      place, date, declaration
    ) VALUES (
      'Ram Singh', 
      '8303943994', 
      'vipinbhadauria1975@gmail.com', 
      'www.linkedin.com/in/ram-singh-bhadauria-722835265', 
      'Ramsingh24', 
      'To serve in an organization where my knowledge and skill scan be utilized for the growth of the organization.',
      'Mr. Bipin Kumar Singh',
      '705 C block, Panki, Kanpur, Uttar Pradesh',
      '7 Aug,2004',
      'Male',
      'Single',
      'Hindi, English',
      'Kanpur',
      '3 Feb,2025',
      'I hereby declare that the information furnished above is true to the best of my knowledge and belief.'
    )
  `)

  // Insert education data
  const educationData = [
    ["B.C.A.", "CSJMU, Kanpur", "PSIT College of Higher Education, Kanpur", "2026", "75.14"],
    ["Intermediate", "CBSE", "Dr. Virendra Swarup Education Centre, Panki, Kanpur", "2022", "72.2"],
    ["High School", "CBSE", "Dr. Virendra Swarup Education Centre, Panki, Kanpur", "2020", "74.17"],
  ]

  for (const edu of educationData) {
    await query(
      `
      INSERT INTO education (standard, board, school, year, percentage)
      VALUES (?, ?, ?, ?, ?)
    `,
      edu,
    )
  }

  // Insert soft skills
  const softSkills = ["Problem Solving", "Leadership", "Adaptability", "Team Work", "Time Management"]
  for (const skill of softSkills) {
    await query("INSERT INTO soft_skills (skill) VALUES (?)", [skill])
  }

  // Insert technical skills
  const technicalSkills = ["C", "C++", "HTML", "CSS", "JAVASCRIPT", "Framework React JS", "Express Js", "Node Js"]
  for (const skill of technicalSkills) {
    await query("INSERT INTO technical_skills (skill) VALUES (?)", [skill])
  }

  // Insert hobbies
  const hobbies = ["Travelling", "Learning"]
  for (const hobby of hobbies) {
    await query("INSERT INTO hobbies (hobby) VALUES (?)", [hobby])
  }
}

