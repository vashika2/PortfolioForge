import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="flex min-h-[85vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="mb-6 max-w-4xl text-5xl font-bold leading-tight">
          Build a Professional Portfolio in Minutes
        </h1>

        <p className="mb-8 max-w-2xl text-lg text-slate-300">
          Create, preview, save, and download your portfolio with projects,
          education, experience, resume, and profile details.
        </p>

        <div className="flex gap-4">
          <Link
            to="/register"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="rounded-lg border border-slate-500 px-6 py-3 font-semibold hover:bg-slate-800"
          >
            Login
          </Link>
        </div>

        <div className="mt-12 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-900 p-6 shadow-lg">
            <h3 className="mb-2 text-xl font-semibold text-blue-400">
              Cloud Saved
            </h3>
            <p className="text-slate-300">
              Save your portfolio securely using MongoDB.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-6 shadow-lg">
            <h3 className="mb-2 text-xl font-semibold text-blue-400">
              PDF Export
            </h3>
            <p className="text-slate-300">
              Download your portfolio as a PDF anytime.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-6 shadow-lg">
            <h3 className="mb-2 text-xl font-semibold text-blue-400">
              Project Showcase
            </h3>
            <p className="text-slate-300">
              Add project links, tech stacks, and live demos.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;