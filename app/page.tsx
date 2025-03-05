import Image from "next/image"
import { getProfileData } from "@/lib/data"

export default async function Home() {
  const profile = await getProfileData()

  return (
    <main className="min-h-screen bg-zinc-900 text-white p-4 md:p-8 max-w-6xl mx-auto">
      <div className="border border-zinc-700 p-6 rounded-lg">
        {/* Header Section */}
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-zinc-800 py-2">Curriculum Vitae</h1>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-white p-2 rounded">
                <Image
                  src="/images/psit-logo.png"
                  alt="PSIT Logo"
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>
            </div>

            <div className="text-left flex-1 md:ml-8">
              <p className="text-xl">
                <span className="font-bold">Name:</span> {profile.name}
              </p>
              <p>
                <span className="font-bold">Mob:</span> {profile.mobile}
              </p>
              <p>
                <span className="font-bold">Email:</span> {profile.email}
              </p>
              <p>
                <span className="font-bold">LinkedIn Id:</span>{" "}
                <a href={profile.linkedin} className="text-blue-400 hover:underline">
                  {profile.linkedin}
                </a>
              </p>
              <p>
                <span className="font-bold">GitHub Id:</span> {profile.github}
              </p>
            </div>

            <div className="border-2 border-white p-1 w-[120px] h-[150px]">
              <Image
                src={profile.photo || "/images/profile-photo.jpg"}
                alt="Profile Photo"
                width={120}
                height={150}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </header>

        {/* Career Objective */}
        <section className="mb-8">
          <h2 className="text-xl font-bold bg-zinc-800 py-2 px-4 mb-4 text-center">Career Objective</h2>
          <p className="px-4">{profile.careerObjective}</p>
        </section>

        {/* Education Qualification */}
        <section className="mb-8">
          <h2 className="text-xl font-bold bg-zinc-800 py-2 px-4 mb-4 text-center">Education Qualification</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-zinc-700 p-2">Standard</th>
                  <th className="border border-zinc-700 p-2">Board/University</th>
                  <th className="border border-zinc-700 p-2">School/College Name</th>
                  <th className="border border-zinc-700 p-2">Year of Passing</th>
                  <th className="border border-zinc-700 p-2">Division& Percentage</th>
                </tr>
              </thead>
              <tbody>
                {profile.education.map((edu, index) => (
                  <tr key={index}>
                    <td className="border border-zinc-700 p-2">{edu.standard}</td>
                    <td className="border border-zinc-700 p-2">{edu.board}</td>
                    <td className="border border-zinc-700 p-2">{edu.school}</td>
                    <td className="border border-zinc-700 p-2">{edu.year}</td>
                    <td className="border border-zinc-700 p-2">{edu.percentage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Awards & Achievements */}
        <section className="mb-8">
          <h2 className="text-xl font-bold bg-zinc-800 py-2 px-4 mb-4 text-center">Awards & Achievements</h2>
          <p className="px-4 mb-4">Certification of participation in Abhinandan 2024 held at PSIT</p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-zinc-700 p-2 w-1/2">Soft Skills</th>
                  <th className="border border-zinc-700 p-2 w-1/2">Technical Skills</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-zinc-700 p-4 align-top">
                    <ul className="list-none space-y-2">
                      {profile.softSkills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="border border-zinc-700 p-4">
                    <ul className="list-disc pl-6 space-y-2">
                      {profile.technicalSkills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Co-curricular Activities */}
        <section className="mb-8">
          <h2 className="text-xl font-bold bg-zinc-800 py-2 px-4 mb-4 text-center">Co-curricular Activities</h2>
          <p className="px-4">Participated in Debates and Group Discussion</p>
        </section>

        {/* Hobbies & Interests */}
        <section className="mb-8">
          <h2 className="text-xl font-bold bg-zinc-800 py-2 px-4 mb-4 text-center">Hobbies & Interests</h2>
          <ul className="px-8 list-none">
            {profile.hobbies.map((hobby, index) => (
              <li key={index}>{hobby}</li>
            ))}
          </ul>
        </section>

        {/* Personal Details */}
        <section className="mb-8">
          <h2 className="text-xl font-bold bg-zinc-800 py-2 px-4 mb-4">Personal Details</h2>
          <div className="px-4 space-y-2">
            <p>
              <span className="font-bold">Father's Name:</span> {profile.fatherName}
            </p>
            <p>
              <span className="font-bold">Address:</span> {profile.address}
            </p>
            <p>
              <span className="font-bold">DOB:</span> {profile.dob}
            </p>
            <p>
              <span className="font-bold">Gender:</span> {profile.gender}
            </p>
            <p>
              <span className="font-bold">Marital Status:</span> {profile.maritalStatus}
            </p>
            <p>
              <span className="font-bold">Language Known:</span> {profile.languages.join(", ")}
            </p>
          </div>
        </section>

        {/* Declaration */}
        <section className="mb-8">
          <h2 className="text-xl font-bold bg-zinc-800 py-2 px-4 mb-4 text-center">Declaration</h2>
          <p className="px-4 mb-8">{profile.declaration}</p>

          <div className="flex justify-between px-4">
            <div>
              <p>
                <span className="font-bold">Place:</span> {profile.place}
              </p>
              <p>
                <span className="font-bold">Date:</span> {profile.date}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold">Signature</p>
              <p>({profile.name})</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

