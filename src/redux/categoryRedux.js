import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: [],
    isFetching: false,
    error: null,
    message: "",
}

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        getCategories: (state, action) => {
            console.log(action.payload);
            state.categories = action.payload.categoryList;
        }
    }
});

export const { getCategories } = categorySlice.actions;

export default categorySlice.reducer;