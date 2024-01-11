import { configureStore } from '@reduxjs/toolkit';
import courseReducer from './courseSlice';
import cartReducer from './cartSlice';

const store = configureStore({
    reducer: {
        course: courseReducer,
        cart: cartReducer,
    },
});

export default store;
