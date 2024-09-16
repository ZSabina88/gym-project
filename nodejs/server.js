const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const port = 3000;

const baseURL = "https://wk9vk6rq8g.execute-api.eu-north-1.amazonaws.com";

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
app.get("/user", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: "Authorization token is missing or invalid",
      });
    }

    const token = authHeader.split(" ")[1];

    const response = await axios.get(`${baseURL}/api/v1/user`, {
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

app.put("/user", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: "Authorization token is missing or invalid",
      });
    }

    const token = authHeader.split(" ")[1];
    const userData = req.body;

    const response = await axios.put(`${baseURL}/api/v1/user`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.status(200).json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error("Error updating user info:", error);

    if (error.response) {
      return res
        .status(error.response.status)
        .json({ success: false, error: error.response.data.message });
    } else if (error.request) {
      return res
        .status(500)
        .json({ success: false, error: "No response from API" });
    } else {
      return res.status(500).json({ success: false, error: error.message });
    }
  }
});

// app.put("/user", async (req, res) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         success: false,
//         error: "Authorization token is missing or invalid",
//       });
//     }

//     const token = authHeader.split(" ")[1];
//     const userData = req.body;

//     const response = await axios.put(`${baseURL}/api/v1/user`, userData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     res.json(response.data);
//   } catch (error) {
//     if (error.response) {
//       res.status(error.response.status).json(error.response.data);
//     } else if (error.request) {
//       res
//         .status(500)
//         .json({ message: "No response from API", error: error.request });
//     } else {
//       res.status(500).json({ message: error.message });
//     }
//   }
// });

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

app.post("/api/v1/workout", async (req, res) => {
  try {
    console.log("Received POST request to /api/v1/workout");

    const workoutData = req.body;
    console.log("Workout data received:", workoutData);

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("Authorization header missing or invalid");
      return res.status(401).json({
        success: false,
        error: "Authorization token is missing or invalid",
      });
    }

    const token = authHeader.split(" ")[1];
    console.log("Token extracted:", token);

    const response = await axios.post(
      "https://wk9vk6rq8g.execute-api.eu-north-1.amazonaws.com/api/v1/workout",
      workoutData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Workout created successfully:", response.data);

    res.status(201).json(response.data);
  } catch (error) {
    console.error("Error creating workout:", error.message);

    res.status(error.response?.status || 500).json({
      message: error.response?.data || "Failed to create workout",
    });
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
//       "https://2zdyofp2nl.execute-api.eu-north-1.amazonaws.com/api/v1/client/coaches",
//       {
//         headers: {
//           Authorization:
//             "Bearer eyJraWQiOiJVMXZCTW1RZUczWlE1UG0yXC9IVnhZeEtZaDV5eG93ZXVlVjJwM3JzR1l3Zz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyMGJjZDlhYy0xMGMxLTcwMGUtNGE3Yi01Y2ZlMjM4OGNhZGMiLCJjb2duaXRvOmdyb3VwcyI6WyJBRE1JTkdyb3VwIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LW5vcnRoLTEuYW1hem9uYXdzLmNvbVwvZXUtbm9ydGgtMV9ya2NpY1ZPUlQiLCJjb2duaXRvOnVzZXJuYW1lIjoiYWRtaW5AYWRtaW4uY29tIiwib3JpZ2luX2p0aSI6IjZjNDI0NjViLTViY2ItNGJmNi05Y2U3LWI2M2I2YTZiMDJkZSIsImF1ZCI6Ijc3Yzk5dDJtdjBnOTdnZTVqb25paTRpZzBnIiwiZXZlbnRfaWQiOiJjM2U0YjIzYS1jMTk4LTRlYmItYjdkYi00MjNmZWQ2ZjM5OTAiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTcyNjA4OTk3NiwiZXhwIjoxNzI2MDkzNTc2LCJpYXQiOjE3MjYwODk5NzYsImp0aSI6ImVmOTUwYzE0LTA3NmUtNDFhZi1iN2UyLTlmNWJkODNmY2ZhZCIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIn0.j-qvOrPCoj1vpmUChrkH7dzNlDSqPp0oPGydKr-xKHL9MR8xly6DfVhXzlarAwqULMUbQVjeMbva8ETALZa-2ZCzq4CUdtmrUVT2Ztw2SPOWuSGoL5Lw7tU2k3X250aXOu_eF0xhCwYuwxCO98kPDafG4dmtQi8Ql2fB47ihg_O03-9hyZCsbFILQsa8EAuRb8T2bzuMjlcicbNZcfLCi7AhtS_uj-EwL9UNi5pRKa9-x5h-mjZLsg6-a1b8JtcsNOH_57ZoQ8CqmObDfM_yf6x4GE3WTsmHNBs9aQHJqEOTOQQwKHYOa5PBUsHiijkMMKD-iIwMOJgz2MYtC8Fs1A",
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

// const testCoachesEndpoint = async () => {
//   try {
//     const response = await axios.get(
//       "https://2zdyofp2nl.execute-api.eu-north-1.amazonaws.com/api/v1/user",
//       {
//         headers: {
//           Authorization:
//             "Bearer eyJraWQiOiJVMXZCTW1RZUczWlE1UG0yXC9IVnhZeEtZaDV5eG93ZXVlVjJwM3JzR1l3Zz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI4MDNjZTk3Yy0xMGQxLTcwNzMtMmI3Mi1kNjdjN2Y3YTM1OTIiLCJjb2duaXRvOmdyb3VwcyI6WyJDTElFTlRHcm91cCJdLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS1ub3J0aC0xLmFtYXpvbmF3cy5jb21cL2V1LW5vcnRoLTFfcmtjaWNWT1JUIiwiY29nbml0bzp1c2VybmFtZSI6ImFybUBtYWlsLnJ1Iiwib3JpZ2luX2p0aSI6IjY5Y2ZmOGQ3LTc5MjQtNDM2MS04OWZlLThiMWJlYzYwMWI5MSIsImF1ZCI6Ijc3Yzk5dDJtdjBnOTdnZTVqb25paTRpZzBnIiwiZXZlbnRfaWQiOiIyZmRkNDdmYy03MmU1LTRjYTEtOGI4Mi0xNzQ2NDQ3NmE3MmMiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTcyNjA5MjMyNSwiZXhwIjoxNzI2MDk1OTI1LCJpYXQiOjE3MjYwOTIzMjUsImp0aSI6ImU2N2VjN2ZmLTJhMjktNGUyYy1hNjk1LTAyZmY0MzU1YTAwNiIsImVtYWlsIjoiYXJtQG1haWwucnUifQ.bUpsMx9Wxj2aqDvnF08uRKSNULjUOaXPdQTn9YaSjQTx_mzDNTRmAExARAtFB5Fy_pSNVcG2GYcLsYD1Zif2BHKGj2Cp3rH68Qt2MMsMXcElmz4pHW6Etol9qokB-RvQuSd_PXtC0yn_41k4Oq91KDXkoTj1nZLtRya3zAdoDda8iWYCBSLpIctGvJMhtAXHiR5lwosS7NASbXf9CYaG8hOGogqMF-66U9Qc6Lk6lbdhoNbrDyW8T2eiuMVw5rQNJ30OTSKYgKpL3HJz4d86Kqw2zKGGIoSf2XnIEdXu7DGlCbUnBa3uQ0VhgpW2lQ-RJUxbLXUXnlY-6ckqhhJlSQ",
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

// const testWorkoutEndpoint = async () => {
//   try {
//     const response = await axios.get(
//       "https://wk9vk6rq8g.execute-api.eu-north-1.amazonaws.com/api/v1/user/workouts",
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

// testWorkoutEndpoint();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
