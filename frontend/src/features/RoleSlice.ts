import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface JwtPayloadType extends JwtPayload {
    "cognito:groups"?: string[];
    email_verified?: boolean;
    iss?: string;
    "cognito:username"?: string;
    origin_jti?: string;
    aud?: string;
    event_id?: string;
    token_use?: string;
    auth_time?: number;
    exp?: number;
    iat?: number;
    jti?: string;
    email?: string;
}

interface RoleState {
  role: string | undefined;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: RoleState = {
  role: undefined,
  status: 'idle',
};

export const fetchRole = createAsyncThunk('role/fetchRole', async () => {
  const token = localStorage.getItem('userToken');
  if (token) {
    const decodedData = jwtDecode<JwtPayloadType>(token);
    const role = decodedData['cognito:groups']?.[0];
    return role;
  }
});

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRole.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRole.fulfilled, (state, action: PayloadAction<string | undefined>) => {
        state.role = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchRole.rejected, (state) => {
        state.status = 'failed';
      });
  },
});



export default roleSlice;