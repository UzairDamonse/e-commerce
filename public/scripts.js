let items = [];
let users = [];

const prodContainer = document.getElementById("products");
const userContainer = document.getElementById("users");

fetch("http://localhost:6969/products")
  .then((res) => res.json())
  .then((data) => {
    items = data;
    console.log(data);
    showItems(data);
  });

function showItems(products) {
  //   prodContainer.innerHTML = "";
  products.forEach((product) => {
    prodContainer.innerHTML += `
    <div class="col-md-6 d-flex justify-content-center my-4">
        <div id="Products" clas="w-100">
            <div class='d-flex justify-content-center'>
                <img id="productImage" src="${product.image}" alt=${product.name}/>
            </div>
            <div class='text-center'>
                <h2 id="productName">${product.name}</h2>
                <h4 id="productDescriptions">${product.descriptions}</h4>
                <p id="productPrice">Price: R${product.price}</p>
                <p id="productStock">Stock: ${product.stock}</p>
            </div>
        </div>
    </div>

    `;
  });
}

fetch("http://localhost:6969/users")
  .then((res) => res.json())
  .then((data) => {
    users = data;
    console.log(data);
    showUsers(data);
  });

function showUsers(users) {
  //   prodContainer.innerHTML = "";
  users.forEach((user) => {
    userContainer.innerHTML += `
    <div class="col-md-6 d-flex justify-content-center my-4">
        <div id="users" clas="w-100">
            <div class='text-center'>
                <h2 id="userId">${user.user_id}</h2>
                <h4 id="userFullName">${user.full_name}</h4>
                <p id="userBillingAddress">Billing Address: ${user.billing_address}</p>
                <p id="userDefaultShippingAddress">Shipping Address: ${user.default_shipping_address}</p>
                <p id="userCountry">Country: ${user.country}</p>
                <p id="userPhone">Phone: ${user.phone}</p>
                <p id="userType">User Type: ${user.user_type}</p>
            </div>
        </div>
    </div>

    `;
  });
}

async function Login(e) {
  e.preventDefault();
  const response = await fetch("http://localhost:6969/users/login", {
    method: "POST",
    body: JSON.stringify({
      email: document.querySelector("#email").value,
      password: document.querySelector("#password").value,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data);
  alert("Logged in successfully");
  return data;
}
