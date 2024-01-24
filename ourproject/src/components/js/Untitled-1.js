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

                <div className="card-body">
                    {/* Single item */}
                    <div className="row">
                        <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                            {/* Image */}
                            <div
                                className="bg-image hover-overlay hover-zoom ripple rounded"
                                data-mdb-ripple-color="light"
                            >
                                <img
                                    src="img/img4.jpg"
                                    className="w-100"
                                    alt="Blue Jeans Jacket"
                                />
                                <a href="#!">
                                    <div
                                        className="mask"
                                        style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
                                    />
                                </a>
                            </div>
                            {/* Image */}
                        </div>
                        <div className="col-lg-5 col-md-6 mt-5 mb-lg-0">
                            {/* Data */}
                            <h5>
                                <strong>{courseName}</strong>
                            </h5>

                            <button
                                type="button"
                                className="btn btn-primary btn-sm me-1 mb-2"
                                data-mdb-toggle="tooltip"
                                title="Remove item"
                            >
                                <i className="fas fa-trash" />
                            </button>

                            {/* Data */}
                        </div>
                        <div className="col-lg-4 col-md-6 mt-5 mb-lg-0">
                            {/* Quantity */}
                            <div className="d-flex mb-4" style={{ maxWidth: 300 }}>
                                <button
                                    className="btn btn-primary px-3 me-2"
                                    onClick={decrement}
                                >
                                    <i className="fas fa-minus" />
                                </button>
                                <div className="p-3 row text-center border ms-1 me-1  fs-4 fw-bold">

                                    <span>{quantity}</span>

                                </div>
                                <button
                                    className="btn btn-primary px-3 me-2"
                                    onClick={increment}
                                >
                                    <i className="fa-solid fa-plus"></i>
                                </button>
                            </div>
                            {/* Quantity */}
                            {/* Price */}
                            <p className="text-start text-md-center">
                                <strong> $ {finalAmount}</strong>
                            </p>
                            {/* Price */}
                            {/* <button onClick={checkout} className='btn btn-success'>buy now</button> */}
                        </div>
                    </div>
                    {/* Single item */}
                    <hr className="my-4" />
                    {/* Single item */}
                    <div className="row">
                        <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                            {/* Image */}
                            <div
                                className="bg-image hover-overlay hover-zoom ripple rounded"
                                data-mdb-ripple-color="light">
                                <img src="img/girl2.jpg" className="w-100" alt='' />
                                <a href="#!">
                                    <div
                                        className="mask"
                                        style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
                                    />
                                </a>
                            </div>
                            {/* Image */}
                        </div>


                    </div>
                    {/* Single item */}
                </div>