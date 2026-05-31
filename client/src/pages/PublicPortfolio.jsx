import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PortfolioPreview from "../components/PortfolioPreview";

function PublicPortfolio() {
  const { userId } = useParams();

  const [portfolio, setPortfolio] = useState(null);
  const [message, setMessage] = useState("Loading portfolio...");

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await axios.get(
          `https://portfolioforge-backend-fl80.onrender.com/api/portfolio/${userId}`
        );

        setPortfolio(res.data);
        setMessage("");
      } catch (error) {
        setMessage("Portfolio not found");
      }
    };

    fetchPortfolio();
  }, [userId]);

  if (message) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <h1 className="text-3xl font-bold">{message}</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <PortfolioPreview portfolio={portfolio} />
      </div>
    </div>
  );
}

export default PublicPortfolio;