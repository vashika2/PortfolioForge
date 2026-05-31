const express = require("express");
const Portfolio = require("../models/Portfolio");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userId } = req.body;

    const portfolio = await Portfolio.findOneAndUpdate(
      { userId },
      req.body,
      {
        new: true,
        upsert: true,
      }
    );

    res.status(200).json({
      message: "Portfolio saved successfully",
      portfolio,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to save portfolio",
      error,
    });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({
      userId: req.params.userId,
    });

    if (!portfolio) {
      return res.status(404).json({
        message: "Portfolio not found",
      });
    }

    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch portfolio",
      error,
    });
  }
});

module.exports = router;