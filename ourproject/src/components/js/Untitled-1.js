[
    {
        course_id: 1,
        qty: 1,
        totalPrice: 10,
        courseItems: [
            { itemId: "1", itemName: "Item A", price: 10 },
            { itemId: "1", itemName: "Item A", price: 10 },
        ]
    },
    {
        course_id: 2,
        qty: 1,
        totalPrice: 10,
        courseItems: [
            { itemId: "1", itemName: "Item A", price: 10 },
            { itemId: "1", itemName: "Item A", price: 10 },
        ]
    }
]
addToCart: (state, action) => {
    // first check if user_id (UUid ) exist in cache
    const { items, course_id, course_title, totalPrice } = action.payload;
    console.log(action, ' action.payload');
    let unique_id = localStorage.getItem('unique_id');
    if (unique_id) {
        let cartCache = localStorage.getItem(unique_id);
        if (cartCache) {
            console.log(cartCache, 'cartCache');
            // const courseIndex = courses.findIndex((course) => course.course_id === courseId);


            console.log("Same course is already there")
        }
        else {
            console.log("saved the course here")
            let itemss = [];
            itemss.push(action.payload)
            localStorage.setItem(unique_id, JSON.stringify(itemss));
        }
        console.log(state.itemsInfo, 'itemsInfo');
    }

    // let isExistInCache = state.itemsInfo.find(item => item.user
    //     .userId === unique_id);



    // const { id, title, price, } = action.payload;
    // const existingItem = state.items.find((item) => item.id === id);

    // if (existingItem) {
    //     existingItem.quantity += 1;
    // } else {
    //     state.items.push({ id, title, price, quantity: 1 });
    // }
},


    //remove 
    removeFromCart: (state, action) => {
        const itemId = action.payload;
        console.log(itemId)
        state.itemsInfo = state.itemsInfo.filter((item) => item.course_id !== itemId);
    },


        //increasing and decressing quanty

        increaseQuantity: (state, action) => {
            const itemId = action.payload;
            const existingItem = state.itemsInfo.find((item) => item.course_id === itemId);
            if (existingItem) {
                existingItem.qty += 1;
            }
        },

            decreaseQuantity: (state, action) => {
                const itemId = action.payload;
                const existingItem = state.itemsInfo.find((item) => item.course_id === itemId);

                if (existingItem && existingItem.qty > 1) {
                    existingItem.qty -= 1;
                }
            },