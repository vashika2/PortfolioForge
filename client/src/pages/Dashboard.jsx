import { useEffect, useState } from "react";
import axios from "axios";
import PortfolioForm from "../components/PortfolioForm";
import PortfolioPreview from "../components/PortfolioPreview";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Dashboard() {
  const navigate = useNavigate();

  const defaultPortfolio = {
    name: "",
    title: "",
    about: "",
    skills: "",
    github: "",
    linkedin: "",
    profileImage: "",
    resume: "",
    education: {
      college: "",
      degree: "",
      branch: "",
      cgpa: "",
      graduationYear: "",
    },
    experience: {
      role: "",
      organization: "",
      duration: "",
      description: "",
    },
    projects: [],
  };

  const [loading, setLoading] = useState(true);
  const [portfolio, setPortfolio] = useState(defaultPortfolio);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `https://portfolioforge-backend-fl80.onrender.com/api/portfolio/${userId}`
        );

        setPortfolio({
          ...defaultPortfolio,
          ...res.data,
        });
      } catch (error) {
        console.log("No saved portfolio found yet");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [userId]);

  const savePortfolio = async () => {
    if (!userId) {
      toast.error("Please login first");
      return;
    }

    try {
      const res = await axios.post(
        "https://portfolioforge-backend-fl80.onrender.com/api/portfolio",
        {
          ...portfolio,
          userId,
        }
      );

      toast.success(res.data.message);
    } catch (error) {
      toast.error("Failed to save portfolio");
    }
  };

  const copyPortfolioLink = () => {
    const link = `${window.location.origin}/portfolio/${userId}`;
    navigator.clipboard.writeText(link);
    toast.success("Portfolio link copied!");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  const handleChange = (e) => {
    setPortfolio({ ...portfolio, [e.target.name]: e.target.value });
  };

  const handleEducationChange = (e) => {
    setPortfolio({
      ...portfolio,
      education: { ...portfolio.education, [e.target.name]: e.target.value },
    });
  };

  const handleExperienceChange = (e) => {
    setPortfolio({
      ...portfolio,
      experience: { ...portfolio.experience, [e.target.name]: e.target.value },
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setPortfolio({
        ...portfolio,
        profileImage: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setPortfolio({
        ...portfolio,
        resume: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  const addProject = () => {
    setPortfolio({
      ...portfolio,
      projects: [
        ...portfolio.projects,
        {
          title: "",
          description: "",
          techStack: "",
          githubLink: "",
          demoLink: "",
        },
      ],
    });
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...portfolio.projects];
    updatedProjects[index][field] = value;

    setPortfolio({
      ...portfolio,
      projects: updatedProjects,
    });
  };

  const deleteProject = (index) => {
    setPortfolio({
      ...portfolio,
      projects: portfolio.projects.filter((_, i) => i !== index),
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="animate-pulse text-2xl font-bold">
          Loading Portfolio...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-8 text-white">
      <h1 className="mb-4 text-center text-4xl font-bold">
        Portfolio Builder Dashboard
      </h1>

      <div className="mb-8 text-center">
        <button
          onClick={savePortfolio}
          className="rounded-lg bg-green-600 px-6 py-3 font-semibold hover:bg-green-700"
        >
          Save Portfolio
        </button>

        <button
          onClick={copyPortfolioLink}
          className="ml-4 rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
        >
          Share Portfolio
        </button>

        <button
          onClick={handleLogout}
          className="ml-4 rounded-lg bg-red-600 px-6 py-3 font-semibold hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <PortfolioForm
          portfolio={portfolio}
          handleChange={handleChange}
          handleEducationChange={handleEducationChange}
          handleExperienceChange={handleExperienceChange}
          handleImageUpload={handleImageUpload}
          handleResumeUpload={handleResumeUpload}
          addProject={addProject}
          handleProjectChange={handleProjectChange}
          deleteProject={deleteProject}
        />

        <PortfolioPreview portfolio={portfolio} />
      </div>
    </div>
  );
}

export default Dashboard;