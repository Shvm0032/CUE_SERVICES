import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import http from "../utils/http-client";

export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
    try {
        const response = await http.get('/coursesData');
        return response.data;
    } catch (error) {
        throw error;
    }
});

const courseSlice = createSlice({
    name: 'course',
    initialState: {
        courses: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCourses.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCourses.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.courses = action.payload;
            })
            .addCase(fetchCourses.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default courseSlice.reducer;
