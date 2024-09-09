const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const port = 3000;

const baseURL = "https://4e8vwzflq9.execute-api.eu-north-1.amazonaws.com";

app.use(cors());
app.use(bodyParser.json());

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
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: "Authorization token is missing or invalid",
      });
    }

    const token = authHeader.split(" ")[1];

    const response = await axios.get(`${baseURL}/api/v1/user/get-role`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

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

app.get("/coaches", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: "Authorization token is missing or invalid",
      });
    }

    const token = authHeader.split(" ")[1];

    const response = await axios.get(`${baseURL}/api/v1/client/coaches`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    res.json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else if (error.request) {
      res
        .status(500)
        .json({ message: "No response from API", error: error.request });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

const testEndpoint = async () => {
  try {
    const response = await axios.get(
      "https://4e8vwzflq9.execute-api.eu-north-1.amazonaws.com/api/v1/users",
      {
        headers: {
          Authorization:
            "Bearer eyJraWQiOiJSaHNnSWRmNkJUMWExREFibnlndnpEZFU1eHRYckM3REFKbFNSK0F5MmFzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI5MDFjYzk2Yy0zMGExLTcwNzYtYTA3Zi05Zjc0MzE1OTg0NDMiLCJjb2duaXRvOmdyb3VwcyI6WyJBRE1JTkdyb3VwIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LW5vcnRoLTEuYW1hem9uYXdzLmNvbVwvZXUtbm9ydGgtMV84ck5xYW1sbkwiLCJjb2duaXRvOnVzZXJuYW1lIjoiYWRtaW5AYWRtaW4uY29tIiwib3JpZ2luX2p0aSI6Ijk5ZWIzZjg2LWVmMmUtNGZmNy1hMTZkLTBlYzk3OWZhZmI2NyIsImF1ZCI6IjZwazkyZnVoamRrcGF0dmkxb2tlN3Nsc2FoIiwiZXZlbnRfaWQiOiJhZWRmYzVmMC01YzU1LTRlNDUtODg5Ni1hOWFkYWYwMGI4NmUiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTcyNTkyMzA4MCwiZXhwIjoxNzI1OTI2NjgwLCJpYXQiOjE3MjU5MjMwODAsImp0aSI6IjE4Y2VjYTVkLWVhZDQtNDdlOS05NjNlLTkyNTkzNTYzOGVlOSIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIn0.levBhhFu4-k6599Pi-l8rmdD260hcd6n7l3k6qwhp0GuuBnAznqsB9tGEHPmKB_uexntdTlB_0DTlglQKzJ1b7xDM3deFptRuMUO0qTTlzIRBiG4yJnmpIBex27Q9tJIp4VDpWeklPei9qfClm3zIuev9TTEp05rTM_WIYMyLVoMkFbFm3llOXE_0zA9DQWT-8m7JyIVdQZgSLqzPXk0kJQbuTjXhlTuFR50HqeZPm6YrlT_iSPKCaWmASgGCRdlj4FXrLjskMWlXWWKCFuwDvVe9RU_BMtE2WkpnCwZrZXyqMhAvfowTqpkfw9_mXZoi3ScPCNtTNpm_PBq_Fw0FQ",
        },
      }
    );
    console.log("Status:", response.status);
    console.log("Data:", response.data);
  } catch (error) {
    if (error.response) {
      console.error("Error Status:", error.response.status);
      console.error("Error Data:", error.response.data);
    } else if (error.request) {
      console.error("No response from API", error.request);
    } else {
      console.error("Error Message:", error.message);
    }
  }
};

testEndpoint();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
