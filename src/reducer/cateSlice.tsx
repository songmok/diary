import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface CateState {
  status: string;
  cateName: string;
  uid: string;
  categories: any[]; // 카테고리 배열의 타입을 any[]로 지정
}
const initialState: CateState = {
  status: "",
  cateName: "",
  uid: "",
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
      .addCase(fetchCate.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCate.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default cateSlice.reducer;
