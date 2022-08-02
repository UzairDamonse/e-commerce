const express = require("express");
const router = express.Router();
const con = require("../lib/dbConnection");
const jwt = require("jsonwebtoken");
const middleware = require("../middleware/auth");
const adminController = require("../controller/admin/index");

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
  return adminController.addCategory(req, res);
});

// Edit category

router.put("/:id", middleware, (req, res) => {
  return adminController.editCategory(req, res);
});

// Delete category

router.delete("/:id", middleware, (req, res) => {
  return adminController.deleteCategory(req, res);
});

module.exports = router;
