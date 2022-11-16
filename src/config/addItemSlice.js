import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

const itemSlice = createSlice({
  name: 'Item',
  initialState,
  reducers: {
    add: (state, action) => {
      state.value.push(action.payload);
    },
    increaseAmount: (state, action) => {
      for (let index = 0; index < state.value.length; index++) {
        if (state.value[index].name === action.payload.name) {
          state.value[index].amount += 1;
          break;
        }
      }
    },
  },
});

export const {add, increaseAmount} = itemSlice.actions;

export default itemSlice.reducer;
