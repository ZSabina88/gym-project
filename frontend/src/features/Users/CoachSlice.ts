import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Coach {
  id: string;
  name: string;
  description: string;
  activity: string;
  target: string;
  status: string;
  rating: number;
}

interface CoachesState {
  coaches: Coach[];
  error: string | null | undefined;
  loading: boolean;
}

const initialState: CoachesState = {
  coaches: [],
  error: null,
  loading: false,
};

export const fetchCoaches = createAsyncThunk<
  Coach[],
  void,
  { rejectValue: string }
>("coaches/fetchCoaches", async (_, { rejectWithValue }) => {
  const token = localStorage.getItem("userToken");

  if (!token) {
    return rejectWithValue("Token not available");
  }

  try {
    const response = await axios.get("/coaches", { 
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Fetch Coaches Error:", error);
    return rejectWithValue(error.response?.data.message || "An error occurred");
  }
});

const coachesSlice = createSlice({
  name: "coaches",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoaches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoaches.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.coaches = action.payload;
      })
      .addCase(fetchCoaches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default coachesSlice;
