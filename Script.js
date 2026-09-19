// ===============================
// IMAGE VIEWER
// ===============================

function openImage(src) {
    const viewer = document.getElementById("imageViewer");
    const bigImage = document.getElementById("bigImage");

    if (viewer && bigImage) {
        bigImage.src = src;
        viewer.classList.add("show");
    }
}

function closeImage() {
    const viewer = document.getElementById("imageViewer");

    if (viewer) {
        viewer.classList.remove("show");
    }
}


// ===============================
// CART
// ===============================

let cart = [];


function toggleCart() {
    const cartBox = document.getElementById("cart");

    if (cartBox) {
        cartBox.classList.toggle("show");
    }
}


function addProduct(name, price) {

    const existingProduct = cart.find(
        product => product.name === name
    );

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            name: name,
            price: Number(price),
            quantity: 1
        });
    }

    updateCart();

    // Cart automatically open
    const cartBox = document.getElementById("cart");

    if (cartBox) {
        cartBox.classList.add("show");
    }
}


function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    if (!cartItems || !cartCount || !cartTotal) {
        return;
    }

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

    } else {

        cart.forEach((product, index) => {

            const productTotal =
                product.price * product.quantity;

            total += productTotal;
            count += product.quantity;

            const item = document.createElement("div");

            item.className = "cart-item";

            item.innerHTML = `
                <div>
                    <strong>${product.name}</strong>
                    <br>
                    PKR ${product.price}
                </div>

                <div class="cart-controls">

                    <button
                        type="button"
                        class="qty-btn"
                        onclick="changeQuantity(${index}, -1)">
                        −
                    </button>

                    <span>${product.quantity}</span>

                    <button
                        type="button"
                        class="qty-btn"
                        onclick="changeQuantity(${index}, 1)">
                        +
                    </button>

                    <button
                        type="button"
                        class="remove-btn"
                        onclick="removeProduct(${index})">
                        ✕
                    </button>

                </div>
            `;

            cartItems.appendChild(item);
        });
    }

    cartCount.textContent = count;
    cartTotal.textContent = total.toLocaleString();
}


function changeQuantity(index, change) {

    if (!cart[index]) {
        return;
    }

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}


function removeProduct(index) {

    if (!cart[index]) {
        return;
    }

    cart.splice(index, 1);

    updateCart();
}


// ===============================
// SEARCH
// ===============================

function searchProducts() {

    const searchInput =
        document.getElementById("searchInput");

    if (!searchInput) {
        return;
    }

    const search =
        searchInput.value.toLowerCase().trim();

    const products =
        document.querySelectorAll(".product");

    products.forEach(product => {

        const name =
            (product.getAttribute("data-name") || "")
            .toLowerCase();

        const category =
            (product.getAttribute("data-category") || "")
            .toLowerCase();

        const text =
            name + " " + category;

        if (text.includes(search)) {
            product.style.display = "";
        } else {
            product.style.display = "none";
        }

    });
}





// ===============================
// CHECKOUT
// ===============================

function openCheckout() {

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    const checkout =
        document.getElementById("checkout");

    const cartBox =
        document.getElementById("cart");

    if (cartBox) {
        cartBox.classList.remove("show");
    }

    if (checkout) {
        checkout.style.display = "block";

        checkout.scrollIntoView({
            behavior: "smooth"
        });
    }
}


function closeCheckout() {

    const checkout =
        document.getElementById("checkout");

    if (checkout) {
        checkout.style.display = "none";
    }
}


// ===============================
// PLACE ORDER
// ===============================

function placeOrder() {

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    const checkout =
        document.getElementById("checkout");

    if (!checkout) {
        return;
    }

    const inputs =
        checkout.querySelectorAll("input, textarea, select");

    let customerName = "";
    let phone = "";
    let city = "";
    let address = "";

    inputs.forEach(input => {

        const value = input.value.trim();

        const placeholder =
            (input.placeholder || "").toLowerCase();

        if (
            placeholder.includes("name")
        ) {
            customerName = value;
        }

        else if (
            placeholder.includes("phone") ||
            placeholder.includes("mobile")
        ) {
            phone = value;
        }

        else if (
            placeholder.includes("city")
        ) {
            city = value;
        }

        else if (
            placeholder.includes("address")
        ) {
            address = value;
        }

    });


    if (
        customerName === "" ||
        phone === "" ||
        city === "" ||
        address === ""
    ) {
        alert("Please fill in all checkout information.");
        return;
    }


    let message =
        "New Order - Sada Market%0A%0A";

    message +=
        "Customer: " +
        encodeURIComponent(customerName) +
        "%0A";

    message +=
        "Phone: " +
        encodeURIComponent(phone) +
        "%0A";

    message +=
        "City: " +
        encodeURIComponent(city) +
        "%0A";

    message +=
        "Address: " +
        encodeURIComponent(address) +
        "%0A%0A";


    message += "Products:%0A";


    let total = 0;

    cart.forEach(product => {

        const productTotal =
            product.price * product.quantity;

        total += productTotal;

        message +=
            encodeURIComponent(product.name) +
            " × " +
            product.quantity +
            " = PKR " +
            productTotal +
            "%0A";
    });


    message +=
        "%0ATotal: PKR " +
        total;


    // اپنا WhatsApp business number یہاں لگائیں
    const whatsappNumber = "923XXXXXXXXX";


    const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        message;


    window.open(
        whatsappURL,
        "_blank"
    );
}


// ===============================
// CATEGORY
// ===============================

function goCategory(category) {

    const section =
        document.getElementById(category);

    if (section) {

        section.scrollIntoView({
            behavior: "smooth"
        });
    }
}


// ===============================
// PAGE LOAD
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateCart();

        // Saved account
        const savedName =
            localStorage.getItem("accountName");

        if (savedName) {

            const accountButton =
                document.querySelector(".account-btn");

            if (accountButton) {
                accountButton.title =
                    "Welcome " + savedName;
            }
        }

    }
);
