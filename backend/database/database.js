require("dotenv").config();

const database = require("knex")({
    client: 'mysql2',
    connection: {
        host: "127.0.0.1",
        user: "root",
        password: process.env.DB_PASS,
        database: "gaster"
    }
})

module.exports = database;