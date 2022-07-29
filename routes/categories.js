const express = require("express");
const router = express.Router();
const con = require("../lib/dbConnection");
const jwt = require("jsonwebtoken");
const middleware = require("../middleware/auth");

// All categories

router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM categories", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

// Single categories

router.get("/:id", (req, res) => {
  id = req.params.id;
  try {
    con.query(
      `SELECT * FROM categories WHERE categories.category_id = ${id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// Add category

router.post("/", middleware, (req, res) => {
  if (req.users.user_type === "admin") {
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
});

// Edit category

router.put("/:id", middleware, (req, res) => {
  if (req.users.user_type === "admin") {
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
});

// Delete category

router.delete("/:id", middleware, (req, res) => {
  if (req.users.user_type === "admin") {
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
});

module.exports = router;
