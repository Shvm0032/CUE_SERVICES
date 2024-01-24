// speakerSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import http from "../utils/http-client";

export const fetchSpeakers = createAsyncThunk('speakers/fetchSpeakers', async () => {
    try {
        // Update the URL to match your API endpoint
        const response = await http.get('/Speaker');
        return response.data.data;
    } catch (error) {
        throw error;
    }
});



const speakerSlice = createSlice({
    name: 'speaker',
    initialState:{
    speakers: [],
    status: 'idle',
    error: null,

    },
    reducers: {
        // Add any specific speaker-related actions if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSpeakers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSpeakers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.speakers = action.payload;
            })
            .addCase(fetchSpeakers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default speakerSlice.reducer;
