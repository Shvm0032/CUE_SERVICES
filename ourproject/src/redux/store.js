import { configureStore } from '@reduxjs/toolkit';
import courseReducer from './courseSlice';
import cartReducer from './cartSlice';
import speakerReducer from './speakerSlice';

const store = configureStore({
    reducer: {
        course: courseReducer,
        cart: cartReducer,
        speaker: speakerReducer,
    },
});

export default store;
