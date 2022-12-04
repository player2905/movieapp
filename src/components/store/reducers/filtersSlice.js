import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    maxYear: null,
    minYear: null,
    genre: null,
    country: null,
    maxRate: 10,
    minRate: 0,

}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setMaxYear: (state, action) => {
            state.maxYear = action.payload;
        },
        setMinYear: (state, action) => {
            state.minYear = action.payload;
        },
        setGenre: (state, action) => {
            state.genre = action.payload;
        },
        setCountry: (state, action) => {
            state.country = action.payload;
        },
        setMaxRate: (state, action) => {
            state.maxRate = action.payload;
        },
        setMinRate: (state, action) => {
            state.minRate = action.payload;
        },
        clearFilters: (state) => {
            state.maxYear = null;
            state.minYear = null;
            state.genre = null;
            state.country = null;
            state.maxRate = 10;
            state.minRate = 0;
        },
        
    },
});

const {actions, reducer} = filtersSlice;

export default reducer;

export const {setMaxYear, setMinYear, setGenre, setCountry, setMaxRate, setMinRate, clearFilters} = actions;