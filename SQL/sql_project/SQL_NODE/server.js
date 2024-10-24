const express = require("express");
const sql = require("mssql");
require("dotenv").config();

const app = express();
const port = 3001;

// Database configuration
const dbConfig = {
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    trustServerCertificate: true, // Bypass SSL certificate validation
    trustedConnection: true,
    connectTimeout: 30000, // Increase connection timeout to 30 seconds
  },
};

// Route to get data
app.get("/data", async (req, res) => {
  try {
    sql
      .connect(dbConfig)
      .then(() => {
        console.log("Connected successfully!");
      })
      .catch((err) => {
        console.error("Connection failed:", err);
      });

    // Query the database
    const result = await sql.query("select * from Items");

    // Send the results as JSON
    res.json(result.recordset);
  } catch (err) {
    console.error("SQL error", err);
    res.status(500).send("Server Error");
  }
});

app.get("/FinancialSituation", async (req, res) => {
  try {
    sql
      .connect(dbConfig)
      .then(() => {
        console.log("Connected successfully!");
      })
      .catch((err) => {
        console.error("Connection failed:", err);
      });

    // Query the database
    const result = await sql.query("select * from customers");

    // Send the results as JSON
    res.json(result.recordset);
  } catch (err) {
    console.error("SQL error", err);
    res.status(500).send("Server Error");
  }
});

app.get("/OrdersToBeDone", async (req, res) => {
  try {
    sql
      .connect(dbConfig)
      .then(() => {
        console.log("Connected successfully!");
      })
      .catch((err) => {
        console.error("Connection failed:", err);
      });

    // Query the database
    const result = await sql.query("select * from items");

    // Send the results as JSON
    res.json(result.recordset);
  } catch (err) {
    console.error("SQL error", err);
    res.status(500).send("Server Error");
  }
});

app.get("/ReturningCustomer", async (req, res) => {
  try {
    sql
      .connect(dbConfig)
      .then(() => {
        console.log("Connected successfully!");
      })
      .catch((err) => {
        console.error("Connection failed:", err);
      });

    // Query the database
    const result = await sql.query("select * from accounting");

    // Send the results as JSON
    res.json(result.recordset);
  } catch (err) {
    console.error("SQL error", err);
    res.status(500).send("Server Error");
  }
});

app.get("/PendingOrders", async (req, res) => {
  try {
    sql
      .connect(dbConfig)
      .then(() => {
        console.log("Connected successfully!");
      })
      .catch((err) => {
        console.error("Connection failed:", err);
      });

    // Query the database
    const result = await sql.query("select * from ");

    // Send the results as JSON
    res.json(result.recordset);
  } catch (err) {
    console.error("SQL error", err);
    res.status(500).send("Server Error");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
