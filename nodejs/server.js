const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const port = 3000;

const baseURL = "https://wk9vk6rq8g.execute-api.eu-north-1.amazonaws.com";

app.use(cors());
app.use(bodyParser.json());

//////////////////////////////   USER AUTH ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

//////////////////////////////   COACHES ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

//////////////////////////////   USERS ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

//////////////////////////////   SINGLE USER ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

//////////////////////////////   ROLE-CHANGE ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

//////////////////////////////   WORKOUTS///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/api/v1/workout", async (req, res) => {
  try {
    const workoutData = req.body;
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: "Authorization token is missing or invalid",
      });
    }

    const token = authHeader.split(" ")[1];

    const response = await axios.post(
      `${baseURL}/api/v1/workout`,
      workoutData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(201).json(response.data);
  } catch (error) {
    console.error("Error creating workout:", error.message);

    res.status(error.response?.status || 500).json({
      message: error.response?.data || "Failed to create workout",
    });
  }
});

app.get("/api/v1/workouts", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: "Authorization token is missing or invalid",
      });
    }

    const token = authHeader.split(" ")[1];

    const response = await axios.get(`${baseURL}/api/v1/user/workouts`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error retrieving workouts:", error.message);

    res.status(error.response?.status || 500).json({
      message: error.response?.data || "Failed to retrieve workouts",
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

// const testCoachesEndpoint = async () => {
//   try {
//     const response = await axios.get(
//       "https://2zdyofp2nl.execute-api.eu-north-1.amazonaws.com/api/v1/user",
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

// const testWorkoutEndpoint = async () => {
//   try {
//     const response = await axios.get(
//       "https://wk9vk6rq8g.execute-api.eu-north-1.amazonaws.com/api/v1/user/workouts",
//       {
//         headers: {
//           Authorization: "Bearer ",
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

// const testUnavailableTimeslotsEndpoint = async () => {
//   try {
//     const response = await axios.get(
//       `https://wk9vk6rq8g.execute-api.eu-north-1.amazonaws.com/api/v1/coach/e0aca92c-a0c1-702e-08f5-cd95845db34e/unavailable-timeslots`,
//       {
//         headers: {
//           Authorization: "Bearer ",
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

// testUnavailableTimeslotsEndpoint();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
