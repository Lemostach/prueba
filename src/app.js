const express = require("express")
const router = require("./router.js")
const neas = require("./neas.js")
const users = require("./users.js")
require("dotenv").config()
require("./db")()


const port = process.env.PORT || 3000

const app = express()
app.use(express.json())
app.use("/api/astronomy/landings", router)
app.use("/api/astronomy/neas", neas)
app.use("/api/users", users)


app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`))