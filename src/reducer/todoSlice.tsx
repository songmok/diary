import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface ITodo {
  id: number;
  completed: boolean;
  uid: string;
  date: string;
  desc: string;
  cateName: string;
  cateId: number;
}

interface ITodoState {
  status: string;
  todo: ITodo[];
}

const initialState: ITodoState = {
  status: "",
  todo: [],
};
export const fetchTodo = createAsyncThunk(
  "todo/fetchTodo",
  async (_, { getState }: any) => {
    try {
      const { uid } = getState().user;
      const response = await axios.get(
        `http://localhost:5000/api/post/todoget?uid=${uid}`
      );
      console.log("lock", response.data.todo);
      return response.data.initTodo;
    } catch (err) {
      throw err;
    }
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodo.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.todo = action.payload;
      })
      .addCase(fetchTodo.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default todoSlice.reducer;
