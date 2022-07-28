const express = require("express");
const router = express.Router();
const con = require("../lib/dbConnection");
const jwt = require("jsonwebtoken");
const middleware = require("../middleware/auth");

// All users

router.get("/", middleware, (req, res) => {
  try {
    con.query("SELECT * FROM users", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

// Single user

router.get("/:id", (req, res) => {
  id = req.params.id;
  try {
    con.query(
      `SELECT * FROM users WHERE users.user_id = ${id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// Add user

router.post("/", (req, res) => {
  const {
    email,
    password,
    full_name,
    billing_address,
    default_shipping_address,
    country,
    phone,
    user_type,
  } = req.body;

  try {
    con.query(
      `INSERT INTO users (email,password,full_name,billing_address,default_shipping_address,country,phone,user_type) VALUES ("${email}","${password}","${full_name}","${billing_address}","${default_shipping_address}","${country}","${phone}","${user_type}")`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// Edit user

router.put("/:id", (req, res) => {
  const {
    email,
    password,
    full_name,
    billing_address,
    default_shipping_address,
    country,
    phone,
    user_type,
  } = req.body;

  let id = req.params.id;

  try {
    con.query(
      `UPDATE users SET email="${email}",password="${password}",full_name="${full_name}",billing_address="${billing_address}",default_shipping_address="${default_shipping_address}",country="${country}",phone="${phone}",user_type="${user_type}" WHERE users.user_id = "${id}"`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// Delete user

router.delete("/:id", (req, res) => {
  let id = req.params.id;

  try {
    con.query(
      `DELETE FROM users WHERE users.user_id = "${id}"`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// Encryption

const bcrypt = require("bcryptjs");
const { decode } = require("jsonwebtoken");

// Register user

router.post("/register", (req, res) => {
  try {
    let sql = "INSERT INTO users SET ?";
    const {
      email,
      password,
      full_name,
      billing_address,
      default_shipping_address,
      country,
      phone,
      user_type,
    } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    let user = {
      email,
      password: hash,
      full_name,
      billing_address,
      default_shipping_address,
      country,
      phone,
      user_type,
    };

    con.query(sql, user, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(`User ${(user.full_name, user.email)} created successfully`);
    });
  } catch (error) {
    console.log(error);
  }
});

// Login user

router.post("/login", (req, res) => {
  try {
    let sql = "SELECT * FROM users WHERE ?";

    let user = {
      email: req.body.email,
    };

    con.query(sql, user, async (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        res.send("Email not found please register");
      } else {
        const isMatch = await bcrypt.compare(
          req.body.password,
          result[0].password
        );
        console.log(req.body.password, result[0].password);
        console.log(isMatch);
        if (!isMatch) {
          res.send("Password incorrect");
        } else {
          const payload = {
            user: {
              user_id: result[0].user_id,
              email: result[0].email,
              full_name: result[0].full_name,
              billing_address: result[0].billing_address,
              default_shipping_address: result[0].default_shipping_address,
              country: result[0].country,
              phone: result[0].phone,
              user_type: result[0].user_type,
            },
          };

          jwt.sign(
            payload,
            process.env.jwtSecret,
            {
              expiresIn: "365d",
            },
            (err, token) => {
              if (err) throw err;
              res.json({ token });
            }
          );
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
});

// Verify

router.get("/users/verify", (req, res) => {
  const token = req.header("x-auth-token");
  jwt.verify(token, process.env.jwtSecret, (error, decodedToken) => {
    if (error) {
      res.status(401).json({
        msg: "Unauthorized Access!",
      });
    } else {
      res.status(200);
      res.send(decodedToken);
    }
  });
});

module.exports = router;
