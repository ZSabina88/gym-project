const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const baseURL = "https://w1u46j41ub.execute-api.eu-north-1.amazonaws.com";

app.post("/api/v1/user/register", async (req, res) => {
  try {
    const { name, email, password, target, activity } = req.body;

    const response = await axios.post(
      `${baseURL}/api/v1/user/register`,
      { name, email, password, target, activity },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;

    res.status(response.status).json(data);
  } catch (error) {
    console.error("Error making API call:", error);
    res.status(500).json({
      success: false,
      error: "An error occurred while communicating with the external API",
    });
  }
});

app.post("/api/v1/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const response = await axios.post(
      `${baseURL}/api/v1/user/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;

    res.status(response.status).json(data);
  } catch (error) {
    console.error("Error making API call:", error);
    res.status(500).json({
      success: false,
      error: "An error occurred while communicating with the external API",
    });
  }
});

app.get("/api/v1/user/get-role", async (req, res) => {
  try {
    // Extract the Bearer token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: "Authorization token is missing or invalid",
      });
    }

    const token = authHeader.split(" ")[1]; // Get the token part

    // Make the external API call with the Bearer token
    const response = await axios.get(`${baseURL}/api/v1/user/get-role`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Include the Bearer token in the headers
      },
    });

    const data = response.data;

    // Respond with the data from the external API
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Error making API call:", error);
    res.status(500).json({
      success: false,
      error: "An error occurred while communicating with the external API",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
