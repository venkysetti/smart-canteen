let cart = [];
let total = 0;

let tokenNumber = 27;


// =====================================================
// SCROLL TO MENU
// =====================================================

function scrollToMenu() {

    const menu = document.getElementById("menu");

    if (menu) {
        menu.scrollIntoView({
            behavior: "smooth"
        });
    }

}


// =====================================================
// ADD FOOD TO CART
// =====================================================

function addToCart(name, price, preparationTime) {

    cart.push({
        name: name,
        price: price,
        preparationTime: preparationTime
    });

    total += price;

    updateCart();

}


// =====================================================
// UPDATE CART
// =====================================================

function updateCart() {

    const cartPopup =
        document.getElementById("cartPopup");

    const cartCount =
        document.getElementById("cartCount");

    const cartTotal =
        document.getElementById("cartTotal");


    if (cartCount) {
        cartCount.innerText = cart.length;
    }

    if (cartTotal) {
        cartTotal.innerText = "₹" + total;
    }

    if (cartPopup) {
        cartPopup.style.display = "flex";
    }

}


// =====================================================
// VIEW CART
// =====================================================

function viewCart() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }


    let message = "YOUR PRE-ORDER\n\n";


    cart.forEach((item, index) => {

        message +=
            `${index + 1}. ${item.name} - ₹${item.price}\n`;

    });


    message += `\nTotal: ₹${total}`;

    message +=
        "\n\nClick OK to confirm your pre-order.";


    const confirmOrder =
        confirm(message);


    if (confirmOrder) {

        placeOrder();

    }

}


// =====================================================
// PLACE ORDER
// =====================================================

function placeOrder() {

    const currentToken =
        tokenNumber;


    tokenNumber++;


    let maxPreparationTime = 0;


    cart.forEach(item => {

        if (
            item.preparationTime >
            maxPreparationTime
        ) {

            maxPreparationTime =
                item.preparationTime;

        }

    });


    // Create complete order

    const order = {

        token: currentToken,

        studentName: "Rahul",

        items: cart.map(item => ({

            name: item.name,

            price: item.price,

            quantity: 1

        })),

        total: total,

        preparationTime:
            maxPreparationTime,

        status: "Preparing",

        pickupCounter: "Counter 2",

        orderTime:
            new Date().toLocaleTimeString(
                [],
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            )

    };


    // Save complete order

    localStorage.setItem(
        "smartCanteenOrder",
        JSON.stringify(order)
    );


    // Save individual values

    localStorage.setItem(
        "orderToken",
        currentToken
    );


    localStorage.setItem(
        "orderTotal",
        total
    );


    localStorage.setItem(
        "preparationTime",
        maxPreparationTime
    );


    localStorage.setItem(
        "orderStatus",
        "Preparing"
    );


    // Show confirmation

    showOrderConfirmation(
        currentToken,
        maxPreparationTime
    );

}


// =====================================================
// ORDER CONFIRMATION
// =====================================================

function showOrderConfirmation(
    token,
    preparationTime
) {

    const orderItems = cart
        .map(
            item =>
                `${item.name} × 1`
        )
        .join("<br>");


    document.body.innerHTML = `

        <div class="confirmation-page">

            <div class="confirmation-card">


                <div class="success-icon">
                    ✓
                </div>


                <p class="success-label">
                    ORDER CONFIRMED
                </p>


                <h1>
                    Your food is being prepared!
                </h1>


                <p class="confirmation-text">
                    You can collect your order during your break.
                </p>


                <!-- TOKEN -->

                <div class="token-box">

                    <span>
                        YOUR DIGITAL TOKEN
                    </span>

                    <strong>
                        #${token}
                    </strong>

                </div>


                <!-- ORDER SUMMARY -->

                <div class="order-summary">

                    <h3>
                        Order Summary
                    </h3>


                    <p>
                        ${orderItems}
                    </p>


                    <div class="summary-line">

                        <span>
                            Total
                        </span>

                        <strong>
                            ₹${total}
                        </strong>

                    </div>

                </div>


                <!-- PICKUP INFORMATION -->

                <div class="pickup-info">


                    <div>

                        <span>
                            ⏱️
                        </span>

                        <div>

                            <small>
                                ESTIMATED PREPARATION
                            </small>

                            <strong>
                                ${preparationTime} minutes
                            </strong>

                        </div>

                    </div>


                    <div>

                        <span>
                            📍
                        </span>

                        <div>

                            <small>
                                PICKUP LOCATION
                            </small>

                            <strong>
                                Counter 2
                            </strong>

                        </div>

                    </div>


                </div>


                <!-- STATUS -->

                <div class="status">

                    <span class="status-dot"></span>

                    Order Status:

                    <strong>
                        Preparing
                    </strong>

                </div>


                <!-- TRACK -->

                <button
                    class="track-btn"
                    onclick="showTracking()">

                    Track My Order →

                </button>


            </div>

        </div>

    `;

}


// =====================================================
// SHOW ORDER TRACKING
// =====================================================

function showTracking() {

    const token =
        localStorage.getItem("orderToken") || "27";


    const preparationTime =
        localStorage.getItem("preparationTime") || "20";


    const status =
        localStorage.getItem("orderStatus") || "Preparing";


    document.body.innerHTML = `

        <div class="tracking-page">

            <div class="tracking-card">


                <!-- HEADER -->

                <p class="success-label">
                    ORDER TRACKING
                </p>


                <h1>
                    Order #${token}
                </h1>


                <p class="tracking-subtitle">

                    Estimated preparation time:

                    <strong>
                        ${preparationTime} minutes
                    </strong>

                </p>


                <!-- TRACKING TIMELINE -->

                <div class="tracking-line">


                    <!-- ORDER PLACED -->

                    <div class="tracking-step completed">

                        <div class="step-circle">
                            ✓
                        </div>


                        <div>

                            <strong>
                                Order Placed
                            </strong>


                            <p>
                                Your order has been received.
                            </p>

                        </div>

                    </div>


                    <!-- PREPARING -->

                    <div
                        class="tracking-step
                        ${
                            status === "Ready" ||
                            status === "Collected"
                                ? "completed"
                                : "active"
                        }"
                    >

                        <div class="step-circle">

                            ${
                                status === "Ready" ||
                                status === "Collected"
                                    ? "✓"
                                    : "🍳"
                            }

                        </div>


                        <div>

                            <strong>
                                Preparing
                            </strong>


                            <p>

                                ${
                                    status === "Ready" ||
                                    status === "Collected"

                                        ? "Food preparation completed."

                                        : "The canteen is preparing your food."
                                }

                            </p>

                        </div>

                    </div>


                    <!-- READY FOR PICKUP -->

                    <div
                        class="tracking-step
                        ${
                            status === "Ready" ||
                            status === "Collected"
                                ? "completed"
                                : ""
                        }"
                    >

                        <div class="step-circle">

                            ${
                                status === "Ready" ||
                                status === "Collected"
                                    ? "✓"
                                    : "○"
                            }

                        </div>


                        <div>

                            <strong>
                                Ready for Pickup
                            </strong>


                            <p>

                                ${
                                    status === "Ready" ||
                                    status === "Collected"

                                        ? "Your food is ready for pickup."

                                        : "You'll be notified when it's ready."
                                }

                            </p>

                        </div>

                    </div>


                    <!-- FOOD COLLECTED -->

                    <div
                        class="tracking-step
                        ${
                            status === "Collected"
                                ? "active"
                                : ""
                        }"
                    >

                        <div class="step-circle">

                            ${
                                status === "Collected"
                                    ? "✓"
                                    : "○"
                            }

                        </div>


                        <div>

                            <strong>
                                Food Collected
                            </strong>


                            <p>

                                ${
                                    status === "Collected"

                                        ? "Order successfully collected. Enjoy your meal!"

                                        : "Collect your order from Counter 2."
                                }

                            </p>

                        </div>

                    </div>


                </div>


                <!-- CURRENT STATUS -->

                ${
                    status === "Collected"

                    ?

                    `

                    <div class="collected-notification">

                        <div class="collected-icon">
                            ✓
                        </div>


                        <div>

                            <strong>
                                ORDER COLLECTED!
                            </strong>


                            <p>
                                Your order has been successfully collected.
                            </p>

                        </div>

                    </div>

                    `

                    :

                    status === "Ready"

                    ?

                    `

                    <div class="ready-notification">

                        <div class="ready-icon">
                            ✓
                        </div>


                        <div>

                            <strong>
                                ORDER READY!
                            </strong>


                            <p>
                                Your food is ready for pickup.
                            </p>

                        </div>

                    </div>

                    `

                    :

                    `

                    <div class="status">

                        <span class="status-dot"></span>

                        Order Status:

                        <strong>
                            Preparing
                        </strong>

                    </div>

                    `
                }


                <!-- PICKUP INFORMATION -->

                <div class="pickup-box">

                    <strong>
                        📍 Pickup Counter 2
                    </strong>


                    <p>

                        ${
                            status === "Collected"

                            ?

                            "Your order has been collected."

                            :

                            `
                            Show your digital token
                            <strong>#${token}</strong>
                            when collecting your order.
                            `
                        }

                    </p>

                </div>


                <!-- REFRESH -->

                <button
                    class="track-btn"
                    onclick="showTracking()">

                    🔄 Refresh Status

                </button>


                <!-- BACK -->

                <button
                    class="back-menu-btn"
                    onclick="location.href='index.html'">

                    ← Back to Menu

                </button>


            </div>

        </div>

    `;

}


// =====================================================
// MARK ORDER READY
// =====================================================

function markOrderReady() {

    const savedOrder =
        localStorage.getItem(
            "smartCanteenOrder"
        );


    if (!savedOrder) {

        alert("No order found.");

        return;

    }


    const order =
        JSON.parse(savedOrder);


    // Change status

    order.status =
        "Ready";


    // Save complete order

    localStorage.setItem(
        "smartCanteenOrder",
        JSON.stringify(order)
    );


    // Save tracking status

    localStorage.setItem(
        "orderStatus",
        "Ready"
    );


    // Update dashboard

    const statusElement =
        document.getElementById(
            "orderStatus"
        );


    const button =
        document.getElementById(
            "readyButton"
        );


    if (statusElement) {

        statusElement.innerText =
            "Ready";

        statusElement.className =
            "order-status ready";

    }


    if (button) {

        button.innerText =
            "✓ Ready";

        button.disabled =
            true;

        button.style.background =
            "#dff1e2";

        button.style.color =
            "#247c43";

    }


    alert(
        "Order #" +
        order.token +
        " is ready for pickup!"
    );

}


// =====================================================
// LOAD CANTEEN ORDER
// =====================================================

function loadCanteenOrder() {

    const savedOrder =
        localStorage.getItem(
            "smartCanteenOrder"
        );


    if (!savedOrder) {

        alert("No student order found.");

        return;

    }


    const order =
        JSON.parse(savedOrder);


    // -----------------------------------------------
    // TOKEN
    // -----------------------------------------------

    const tokenElement =
        document.querySelector(
            ".token-number"
        );


    if (tokenElement) {

        tokenElement.innerText =
            "#" + order.token;

    }


    // -----------------------------------------------
    // FIRST ORDER ROW
    // -----------------------------------------------

    const firstRow =
        document.querySelector(
            ".order-row"
        );


    if (firstRow) {

        const spans =
            firstRow.querySelectorAll(
                ":scope > span"
            );


        if (spans.length >= 6) {


            // TOKEN

            spans[0].innerText =
                "#" + order.token;


            // STUDENT

            spans[1].innerText =
                order.studentName;


            // FOOD

            const orderName =
                spans[2].querySelector(
                    "strong"
                );


            if (orderName) {

                orderName.innerText =
                    order.items
                        .map(
                            item => item.name
                        )
                        .join(", ");

            }


            // QUANTITY

            const orderQuantity =
                spans[2].querySelector(
                    "small"
                );


            if (orderQuantity) {

                orderQuantity.innerText =
                    "× " +
                    order.items.length;

            }


            // ORDER TIME

            spans[3].innerText =
                order.orderTime;


            // STATUS

            const status =
                spans[4].querySelector(
                    ".order-status"
                );


            if (status) {

                status.innerText =
                    order.status;


                if (
                    order.status === "Preparing"
                ) {

                    status.className =
                        "order-status preparing";

                }


                else if (
                    order.status === "Ready"
                ) {

                    status.className =
                        "order-status ready";

                }


                else if (
                    order.status === "Collected"
                ) {

                    status.className =
                        "order-status ready";

                }

            }


            // BUTTON

            const button =
                spans[5].querySelector(
                    "button"
                );


            if (button) {


                if (
                    order.status === "Preparing"
                ) {

                    button.innerText =
                        "Mark as Ready";

                    button.disabled =
                        false;

                    button.style.background =
                        "";

                    button.style.color =
                        "";

                }


                else if (
                    order.status === "Ready"
                ) {

                    button.innerText =
                        "✓ Ready";

                    button.disabled =
                        true;

                    button.style.background =
                        "#dff1e2";

                    button.style.color =
                        "#247c43";

                }


                else if (
                    order.status === "Collected"
                ) {

                    button.innerText =
                        "✓ Collected";

                    button.disabled =
                        true;

                    button.style.background =
                        "#dff1e2";

                    button.style.color =
                        "#247c43";

                }

            }

        }

    }


    // -----------------------------------------------
    // DASHBOARD COUNTS
    // -----------------------------------------------

    const totalOrders =
        document.getElementById(
            "totalOrders"
        );


    if (totalOrders) {

        totalOrders.innerText =
            "43";

    }


    const preparingOrders =
        document.getElementById(
            "preparingOrders"
        );


    if (preparingOrders) {

        preparingOrders.innerText =
            order.status === "Preparing"
                ? "9"
                : "8";

    }


    const readyOrders =
        document.getElementById(
            "readyOrders"
        );


    if (readyOrders) {

        readyOrders.innerText =
            order.status === "Ready"
                ? "6"
                : "5";

    }


    const pickupOrders =
        document.getElementById(
            "pickupOrders"
        );


    if (pickupOrders) {

        pickupOrders.innerText =
            order.status === "Ready"
                ? "4"
                : "3";

    }

}


// =====================================================
// PICKUP COUNTER
// =====================================================

function callNextToken() {

    const savedOrder =
        localStorage.getItem(
            "smartCanteenOrder"
        );


    if (!savedOrder) {

        alert("No order available.");

        return;

    }


    const order =
        JSON.parse(savedOrder);


    // Only READY orders can be collected

    if (order.status !== "Ready") {

        alert(
            "Order #" +
            order.token +
            " is not ready yet."
        );

        return;

    }


    const currentToken =
        document.getElementById(
            "currentPickupToken"
        );


    const nextToken =
        document.getElementById(
            "nextToken"
        );


    // Show token

    if (currentToken) {

        currentToken.innerText =
            "#" + order.token;

    }


    if (nextToken) {

        nextToken.innerText =
            "Waiting";

    }


    // Change order status

    order.status =
        "Collected";


    // Save updated order

    localStorage.setItem(
        "smartCanteenOrder",
        JSON.stringify(order)
    );


    // Save tracking status

    localStorage.setItem(
        "orderStatus",
        "Collected"
    );


    alert(
        "Token #" +
        order.token +
        " has been collected!"
    );

}