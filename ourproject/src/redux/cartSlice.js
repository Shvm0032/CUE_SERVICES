import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            const { id, title, price } = action.payload;
            const existingItem = state.find((item) => item.id === id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.push({ id, title, price, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            const itemId = action.payload;
            return state.filter((item) => item.id !== itemId);
        },
        increaseQuantity: (state, action) => {
            const itemId = action.payload;
            const existingItem = state.find((item) => item.id === itemId);

            if (existingItem) {
                existingItem.quantity += 1;
            }
        },
        decreaseQuantity: (state, action) => {
            const itemId = action.payload;
            const existingItem = state.find((item) => item.id === itemId);

            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity -= 1;
            }
        },
    },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
