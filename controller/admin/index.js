const bcrypt = require("bcryptjs");
const con = require("../../lib/dbConnection");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Add functions

async function addProduct(req, res) {
  if (req.user.user_type === "admin") {
    const {
      sku,
      name,
      price,
      weight,
      descriptions,
      thumbnail,
      image,
      category,
      stock,
    } = req.body;

    const create_date = new Date().toISOString().slice(0, 19).replace("T", " ");

    try {
      con.query(
        `INSERT INTO products (sku,name,price,weight,descriptions,thumbnail,image,category,create_date,stock) VALUES ("${sku}","${name}","${price}","${weight}","${descriptions}","${thumbnail}","${image}","${category}","${create_date}","${stock}")`,
        (err, result) => {
          if (err) throw err;
          res.send(result);
        }
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send("Not valid user");
  }
}
async function addCategory(req, res) {
  if (req.user.user_type === "admin") {
    const { name, description, thumbnail } = req.body;

    try {
      con.query(
        `INSERT INTO categories (name,description,thumbnail) VALUES ("${name}","${description}","${thumbnail}")`,
        (err, result) => {
          if (err) throw err;
          res.send(result);
        }
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send("Not valid user");
  }
}
async function addOrder(req, res) {
  if (req.user.user_type === "admin") {
    const { user_id, amount, shipping_address, order_email, order_status } =
      req.body;

    const order_date = new Date().toISOString().slice(0, 19).replace("T", " ");

    try {
      con.query(
        `INSERT INTO orders (user_id,amount,shipping_address,order_email,order_date,order_status) VALUES ("${user_id}","${amount}","${shipping_address}","${order_email}","${order_date}","${order_status}")`,
        (err, result) => {
          if (err) throw err;
          res.send(result);
        }
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send("Not valid user");
  }
}

// Edit functions

async function editProduct(req, res) {
  if (req.user.user_type === "admin") {
    const {
      sku,
      name,
      price,
      weight,
      descriptions,
      thumbnail,
      image,
      category,
      stock,
    } = req.body;

    const create_date = new Date().toISOString().slice(0, 19).replace("T", " ");

    let id = req.params.id;

    try {
      con.query(
        `UPDATE products SET sku="${sku}",name="${name}",price="${price}",weight="${weight}",descriptions="${descriptions}",thumbnail="${thumbnail}",image="${image}",category="${category}",stock="${stock}" WHERE products.product_id = "${id}"`,
        (err, result) => {
          if (err) throw err;
          res.send(result);
        }
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send("Not valid user");
  }
}
async function editCategory(req, res) {
  if (req.user.user_type === "admin") {
    const { name, description, thumbnail } = req.body;

    let id = req.params.id;

    try {
      con.query(
        `UPDATE categories SET name="${name}",description="${description}",thumbnail="${thumbnail}" WHERE categories.category_id = "${id}"`,
        (err, result) => {
          if (err) throw err;
          res.send(result);
        }
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send("Not valid user");
  }
}
async function editOrder(req, res) {
  if (req.user.user_type === "admin") {
    const { user_id, amount, shipping_address, order_email, order_status } =
      req.body;

    const order_date = new Date().toISOString().slice(0, 19).replace("T", " ");

    let id = req.params.id;

    try {
      con.query(
        `UPDATE orders SET user_id="${user_id}",amount="${amount}",shipping_address="${shipping_address}",order_email="${order_email}",order_date="${order_date}",order_status="${order_status}" WHERE order_id = "${id}"`,
        (err, result) => {
          if (err) throw err;
          res.send(result);
        }
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send("Not valid user");
  }
}

// Delete functions

async function deleteProduct(req, res) {
  if (req.user.user_type === "admin") {
    let id = req.params.id;

    try {
      con.query(
        `DELETE FROM products WHERE products.product_id = "${id}"`,
        (err, result) => {
          if (err) throw err;
          res.send(result);
        }
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send("Not valid user");
  }
}
async function deleteCategory(req, res) {
  if (req.user.user_type === "admin") {
    let id = req.params.id;

    try {
      con.query(
        `DELETE FROM categories WHERE categories.category_id = "${id}"`,
        (err, result) => {
          if (err) throw err;
          res.send(result);
        }
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send("Not valid user");
  }
}
async function deleteOrder(req, res) {
  if (req.user.user_type === "admin") {
    let id = req.params.id;

    try {
      con.query(
        `DELETE FROM orders WHERE orders.order_id = "${id}"`,
        (err, result) => {
          if (err) throw err;
          res.send(result);
        }
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send("Not valid user");
  }
}

module.exports = {
  addProduct,
  addCategory,
  addOrder,
  editProduct,
  editCategory,
  editOrder,
  deleteProduct,
  deleteCategory,
  deleteOrder,
};
