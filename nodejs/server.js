const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const port = 3000;


app.use(cors());
app.use(bodyParser.json());


app.post("/api/v1/user/register", async (req, res) => {
  try {
    const { name, email, password, target, activity } = req.body;


    const response = await axios.post(
      "https://lw2s1l27y3.execute-api.eu-north-1.amazonaws.com/api/v1/user/register",
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
      "https://lw2s1l27y3.execute-api.eu-north-1.amazonaws.com/api/v1/user/login",
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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});