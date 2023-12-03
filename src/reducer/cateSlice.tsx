import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ICate } from "./cateType";

interface CateState {
  status: string;
  categories: string[];
}

const initialState: CateState = {
  status: "",
  categories: [],
};

export const fetchCate = createAsyncThunk("cate/fetchCate", async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/cate/categet");
    return response;
  } catch (err) {
    return err;
  }
});
const cateSlice = createSlice({
  name: "cate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCate.fulfilled, (state: any, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCate.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default cateSlice.reducer;
