import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface ICateArr {
  cateId: Number;
  cateName: string;
  uid: string;
}

interface ICateState {
  status: string;
  categories: ICateArr[];
}
const initialState: ICateState = {
  status: "",
  categories: [],
};

export const fetchCate = createAsyncThunk(
  "cate/fetchCate",
  async (_, { getState }: any) => {
    try {
      const { uid } = getState().user;
      const response = await axios.get(
        `http://localhost:5000/api/cate/categet?uid=${uid}`
      );
      console.log("cate", response.data.category);
      return response.data.category;
    } catch (err) {
      throw err;
    }
  }
);

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
