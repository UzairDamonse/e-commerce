const express = require("express");
const router = express.Router();
const con = require("../lib/dbConnection");

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

router.post("/", (req, res) => {
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
});

// Edit category

router.put("/:id", (req, res) => {
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
});

// Delete category

router.delete("/:id", (req, res) => {
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
});

module.exports = router;
