import { configureStore } from '@reduxjs/toolkit';
import courseReducer from './courseSlice';
import cartReducer from './cartSlice';
import speakerReducer from './speakerSlice';
import authReducer from './authSlice';
const store = configureStore({
    reducer: {
        auth: authReducer,
        course: courseReducer,
        cart: cartReducer,
        speaker: speakerReducer,
    },
});

export default store;
