import { createSlice } from '@reduxjs/toolkit';
let unique_id = localStorage.getItem('unique_id');

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        itemsInfo: unique_id ? JSON.parse(localStorage.getItem(unique_id)) || [] : []
    },
    reducers: {
        
        addToCart: (state, action) => {
            const { items, course_id, course_title, totalPrice } = action.payload;
            let unique_id = localStorage.getItem('unique_id');

            if (unique_id) {
                let cartCache = JSON.parse(localStorage.getItem(unique_id)) || [];

                const existingCourseIndex = cartCache.findIndex(course => course.course_id === course_id);

                if (existingCourseIndex !== -1) {
                    cartCache[existingCourseIndex].courseItems = items;
                    cartCache[existingCourseIndex].course_title = course_title;
                    cartCache[existingCourseIndex].qty = 1;
                    cartCache[existingCourseIndex].totalPrice = totalPrice;
                } else {
                    cartCache.push({
                        course_title,
                        course_id,
                        qty: 1,
                        totalPrice,
                        courseItems: items
                    });
                }

                localStorage.setItem(unique_id, JSON.stringify(cartCache));
                state.itemsInfo = cartCache;
            } else {
                console.log("No unique_id found. Unable to update cart.");
            }
        },

        removeFromCart: (state, action) => {
            const itemId = action.payload;
            state.itemsInfo = state.itemsInfo.filter((item) => item.course_id !== itemId);
            localStorage.setItem(unique_id, JSON.stringify(state.itemsInfo));
        },
      
        removeAllItemsFromCart: (state) => {
            state.itemsInfo = [];
            let unique_id = localStorage.getItem('unique_id');
            localStorage.removeItem(unique_id);
        },

        increaseQuantity: (state, action) => {
            const { course_id } = action.payload;
            const itemToUpdate = state.itemsInfo.find((item) => item.course_id === course_id);

            if (itemToUpdate) {

                itemToUpdate.qty += 1;
                itemToUpdate.totalPrice = itemToUpdate.qty * /* Your item price here */
                localStorage.setItem(unique_id, JSON.stringify(state.itemsInfo));
            }
        },
        
        decreaseQuantity: (state, action) => {
            const { course_id } = action.payload;
            const itemToUpdate = state.itemsInfo.find((item) => item.course_id === course_id);

            if (itemToUpdate && itemToUpdate.qty > 1) {
                itemToUpdate.qty -= 1;
                itemToUpdate.totalPrice = itemToUpdate.qty * /* Your item price here */
                localStorage.setItem(unique_id, JSON.stringify(state.itemsInfo));
            }
        },
       
       
        getAllSavedValues(state) {
            return state.items;
        },
    },
});

export const { addToCart, removeFromCart, removeAllItemsFromCart, increaseQuantity, decreaseQuantity, getAllSavedValues } = cartSlice.actions;
export const selectCartItems = (state) => state.cart.itemsInfo;
export default cartSlice.reducer;
