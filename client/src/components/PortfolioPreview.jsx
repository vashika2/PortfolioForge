import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function PortfolioPreview({ portfolio }) {
  const downloadPDF = () => {
    const input = document.getElementById("portfolio-preview");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      pdf.save("portfolio.pdf");
    });
  };

  return (
    <div>
      <button
        onClick={downloadPDF}
        className="mb-4 rounded-lg bg-green-600 px-4 py-2 font-medium hover:bg-green-700"
      >
        Download PDF
      </button>

      <div
        id="portfolio-preview"
        className="rounded-2xl bg-white p-8 text-black shadow-xl"
      >
        <div className="flex flex-col items-center">
          {portfolio.profileImage && (
            <img
              src={portfolio.profileImage}
              alt="Profile"
              className="h-32 w-32 rounded-full border-4 border-blue-500 object-cover"
            />
          )}

          <h1 className="mt-4 text-3xl font-bold">
            {portfolio.name || "Your Name"}
          </h1>

          <p className="text-lg text-gray-600">
            {portfolio.title || "Professional Title"}
          </p>
        </div>

        <section className="mt-8">
          <h2 className="mb-2 border-b text-xl font-bold">About Me</h2>
          <p className="text-gray-700">{portfolio.about}</p>
        </section>

        <section className="mt-8">
          <h2 className="mb-3 border-b text-xl font-bold">Skills</h2>

          <div className="flex flex-wrap gap-2">
            {portfolio.skills
              .split(",")
              .filter((skill) => skill.trim() !== "")
              .map((skill, index) => (
                <span
                  key={index}
                  className="rounded-full bg-blue-100 px-3 py-1 text-blue-700"
                >
                  {skill.trim()}
                </span>
              ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="mb-3 border-b text-xl font-bold">Education</h2>

          <div className="rounded-lg bg-gray-100 p-4">
            <h3 className="font-semibold">{portfolio.education.degree}</h3>
            <p>{portfolio.education.branch}</p>
            <p>{portfolio.education.college}</p>
            <p>CGPA: {portfolio.education.cgpa}</p>
            <p>Graduation: {portfolio.education.graduationYear}</p>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="mb-3 border-b text-xl font-bold">Experience</h2>

          <div className="rounded-lg bg-gray-100 p-4">
            <h3 className="font-semibold">{portfolio.experience.role}</h3>
            <p>{portfolio.experience.organization}</p>
            <p>{portfolio.experience.duration}</p>
            <p className="mt-2">{portfolio.experience.description}</p>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="mb-3 border-b text-xl font-bold">Projects</h2>

          <div className="space-y-4">
            {portfolio.projects.map((project, index) => (
              <div key={index} className="rounded-lg bg-gray-100 p-4">
                <h3 className="text-lg font-semibold">{project.title}</h3>

                <p className="mt-2">{project.description}</p>

                {project.techStack && (
                  <p className="mt-2 text-sm text-gray-600">
                    <strong>Tech Stack:</strong> {project.techStack}
                  </p>
                )}

                <div className="mt-3 flex gap-3">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded bg-black px-3 py-2 text-sm text-white"
                    >
                      GitHub
                    </a>
                  )}

                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded bg-blue-600 px-3 py-2 text-sm text-white"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="mb-3 border-b text-xl font-bold">Resume</h2>

          {portfolio.resume ? (
            <a
              href={portfolio.resume}
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-lg bg-green-600 px-4 py-2 text-white"
            >
              View Resume
            </a>
          ) : (
            <p className="text-gray-500">No resume uploaded yet.</p>
          )}
        </section>

        <section className="mt-8 flex gap-4">
          {portfolio.github && (
            <a
              href={portfolio.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-black px-4 py-2 text-white"
            >
              GitHub
            </a>
          )}

          {portfolio.linkedin && (
            <a
              href={portfolio.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white"
            >
              LinkedIn
            </a>
          )}
        </section>
      </div>
    </div>
  );
}

export default PortfolioPreview;