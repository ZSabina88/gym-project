const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const port = 3000;

const baseURL = "https://twnfip5yne.execute-api.eu-north-1.amazonaws.com";

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

app.get("/users", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: "Authorization token is missing or invalid",
      });
    }

    const token = authHeader.split(" ")[1];

    const response = await axios.get(`${baseURL}/api/v1/users`, {
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

app.put("/api/v1/admin/role-change", async (req, res) => {
  try {
    const { userId, newRole, email } = req.body;

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: "Authorization token is missing or invalid",
      });
    }

    const token = authHeader.split(" ")[1];

    const response = await axios.put(
      `${baseURL}/api/v1/admin/role-change`,
      { userId, newRole, email },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = response.data;

    res.status(response.status).json(data);
  } catch (error) {
    console.error("Error making API call:", error);
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else if (error.request) {
      res.status(500).json({
        message: "No response from API",
        error: error.request,
      });
    } else {
      res.status(500).json({
        message: "An error occurred",
        error: error.message,
      });
    }
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const testEndpoint = async () => {
//   try {
//     const response = await axios.get(
//       "https://snyivrnrf9.execute-api.eu-north-1.amazonaws.com/api/v1/users",
//       {
//         headers: {
//           Authorization:
//             "Bearer ",
//         },
//       }
//     );
//     console.log("Status:", response.status);
//     console.log("Data:", response.data);
//   } catch (error) {
//     if (error.response) {
//       console.error("Error Status:", error.response.status);
//       console.error("Error Data:", error.response.data);
//     } else if (error.request) {
//       console.error("No response from API", error.request);
//     } else {
//       console.error("Error Message:", error.message);
//     }
//   }
// };

// testEndpoint();

// const testCoachesEndpoint = async () => {
//   try {
//     const response = await axios.get(
//       "https://snyivrnrf9.execute-api.eu-north-1.amazonaws.com/api/v1/client/coaches",
//       {
//         headers: {
//           Authorization:
//             "Bearer ",
//         },
//       }
//     );
//     console.log("Status:", response.status);
//     console.log("Data:", response.data);
//   } catch (error) {
//     if (error.response) {
//       console.error("Error Status:", error.response.status);
//       console.error("Error Data:", error.response.data);
//     } else if (error.request) {
//       console.error("No response from API", error.request);
//     } else {
//       console.error("Error Message:", error.message);
//     }
//   }
// };

// testCoachesEndpoint();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
