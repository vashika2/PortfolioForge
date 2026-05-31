function PortfolioForm({
  portfolio,
  handleChange,
  handleEducationChange,
  handleExperienceChange,
  handleImageUpload,
  handleResumeUpload,
  addProject,
  handleProjectChange,
  deleteProject,
}) {
  const inputStyle =
    "w-full rounded-lg border border-slate-600 bg-slate-800 p-3 text-white outline-none focus:border-blue-500";

  const sectionTitle = "mt-6 mb-3 text-xl font-semibold text-blue-400";

  return (
    <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-lg">
      <h2 className="mb-5 text-2xl font-bold">Create Portfolio</h2>

      <label className="mb-2 block font-medium">Profile Picture</label>
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      <label className="mt-4 mb-2 block font-medium">Resume PDF</label>
      <input type="file" accept=".pdf" onChange={handleResumeUpload} />

      <div className="mt-5 space-y-4">
        <input className={inputStyle} type="text" name="name" placeholder="Your Name" value={portfolio.name} onChange={handleChange} />
        <input className={inputStyle} type="text" name="title" placeholder="Your Title" value={portfolio.title} onChange={handleChange} />
        <textarea className={inputStyle} name="about" placeholder="About Yourself" value={portfolio.about} onChange={handleChange} />
        <input className={inputStyle} type="text" name="skills" placeholder="Skills e.g. Java, React, MongoDB" value={portfolio.skills} onChange={handleChange} />
        <input className={inputStyle} type="text" name="github" placeholder="GitHub Link" value={portfolio.github} onChange={handleChange} />
        <input className={inputStyle} type="text" name="linkedin" placeholder="LinkedIn Link" value={portfolio.linkedin} onChange={handleChange} />
      </div>

      <h3 className={sectionTitle}>Education</h3>

      <div className="space-y-4">
        <input className={inputStyle} type="text" name="college" placeholder="College Name" value={portfolio.education.college} onChange={handleEducationChange} />
        <input className={inputStyle} type="text" name="degree" placeholder="Degree" value={portfolio.education.degree} onChange={handleEducationChange} />
        <input className={inputStyle} type="text" name="branch" placeholder="Branch" value={portfolio.education.branch} onChange={handleEducationChange} />
        <input className={inputStyle} type="text" name="cgpa" placeholder="CGPA" value={portfolio.education.cgpa} onChange={handleEducationChange} />
        <input className={inputStyle} type="text" name="graduationYear" placeholder="Graduation Year" value={portfolio.education.graduationYear} onChange={handleEducationChange} />
      </div>

      <h3 className={sectionTitle}>Experience</h3>

      <div className="space-y-4">
        <input className={inputStyle} type="text" name="role" placeholder="Role" value={portfolio.experience.role} onChange={handleExperienceChange} />
        <input className={inputStyle} type="text" name="organization" placeholder="Organization" value={portfolio.experience.organization} onChange={handleExperienceChange} />
        <input className={inputStyle} type="text" name="duration" placeholder="Duration" value={portfolio.experience.duration} onChange={handleExperienceChange} />
        <textarea className={inputStyle} name="description" placeholder="Experience Description" value={portfolio.experience.description} onChange={handleExperienceChange} />
      </div>

      <h3 className={sectionTitle}>Projects</h3>

      <button
        type="button"
        onClick={addProject}
        className="mb-4 rounded-lg bg-blue-600 px-4 py-2 font-medium hover:bg-blue-700"
      >
        Add Project
      </button>

      <div className="space-y-4">
        {portfolio.projects.map((project, index) => (
          <div
            key={index}
            className="rounded-xl border border-slate-700 bg-slate-800 p-4"
          >
            <input
              className={inputStyle}
              type="text"
              placeholder="Project Title"
              value={project.title}
              onChange={(e) => handleProjectChange(index, "title", e.target.value)}
            />

            <textarea
              className={`${inputStyle} mt-4`}
              placeholder="Project Description"
              value={project.description}
              onChange={(e) => handleProjectChange(index, "description", e.target.value)}
            />

            <input
              className={`${inputStyle} mt-4`}
              type="text"
              placeholder="Tech Stack (React, Node.js, MongoDB)"
              value={project.techStack || ""}
              onChange={(e) => handleProjectChange(index, "techStack", e.target.value)}
            />

            <input
              className={`${inputStyle} mt-4`}
              type="text"
              placeholder="GitHub Link"
              value={project.githubLink || ""}
              onChange={(e) => handleProjectChange(index, "githubLink", e.target.value)}
            />

            <input
              className={`${inputStyle} mt-4`}
              type="text"
              placeholder="Live Demo Link"
              value={project.demoLink || ""}
              onChange={(e) => handleProjectChange(index, "demoLink", e.target.value)}
            />

            <button
              type="button"
              onClick={() => deleteProject(index)}
              className="mt-3 rounded-lg bg-red-600 px-4 py-2 font-medium hover:bg-red-700"
            >
              Delete Project
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PortfolioForm;