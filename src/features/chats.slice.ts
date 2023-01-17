import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { API } from "./api";
import { getTimeStamp } from "@/utils";

export interface IChat {
  author: "bot" | "user";
  message: string;
  timestamp: string;
}

const initialState: Array<IChat> = [];

export const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    saveChat: (state, action: PayloadAction<IChat>) => {
      return [...state, action.payload];
    },
    clearChat: () => {
      return [];
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      API.endpoints.sendMessage.matchFulfilled,
      (state, { payload }) => {
        return [
          ...state,
          {
            author: "bot",
            message: payload[0],
            timestamp: getTimeStamp(),
          },
        ];
      }
    );
  },
});

// Action creators are generated for each case reducer function
export const { saveChat, clearChat } = chatSlice.actions;

export const selectChats = (state: RootState) => state.chats;

export default chatSlice.reducer;
