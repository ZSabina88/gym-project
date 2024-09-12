import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface User {
  id: string;
  name: string;
  email: string;
  activity: string;
  target: string;
  role: string;
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null | undefined;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};
interface UserInfo {
  name: string;
  target: string;
  activity: string;
}
interface ChangeInfoState {
  changeInfo: UserInfo | null;
  loading: boolean;
  error: string | null | undefined;
}


interface UserPayload {
  name: string;
  target: string;
  activity: string;
}
const initialStateChangeInfo: ChangeInfoState = {
  changeInfo: null,
  loading: false,
  error: null,
};

export const fetchUser = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>("user/fetchUser", async (_, { rejectWithValue }) => {
  const token = localStorage.getItem("userToken");

  if (!token) {
    return rejectWithValue("Token not available");
  }

  try {
    const response = await axios.get("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Fetch User Error:", error);
    return rejectWithValue(error.response?.data.message || "An error occurred");
  }
});

export const changeUserInfo = createAsyncThunk<
  UserInfo,
  UserPayload,
  { rejectValue: string }
>(
  "user/changeUserInfo",
  async ({ name, target, activity }, { rejectWithValue }) => {
    const token = localStorage.getItem("userToken");

    if (!token) {
      return rejectWithValue("Token not available");
    }

    try {
      const response = await axios.put(
        "/user",
        { name, target, activity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || "An error occurred while updating user info");
      }
      console.error("Update User Info Error:", error);
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const changeInfoSlice = createSlice({
  name: "changeInfo",
  initialState: initialStateChangeInfo,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changeUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.changeInfo = action.payload;
      })
      .addCase(changeUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice;
export { changeInfoSlice };
