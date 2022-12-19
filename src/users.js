const Users = require('./esquemas/esquemaUsers.js')
const express = require('express')
const router = express.Router()



router.get("/", async (req, res) => {
    const resultado = await Users.find({})
        .sort("name")
    res.send(resultado)
})

router.get("/date/", async (req, res) => {
    const resultado = await Users.find({email: req.query.email})
        .sort("name")
    res.send(resultado)
    
})

router.post('/create', async (req, res) => {
    const user = new Users(req.body)

    const newUser = await user.save()

    res.send(newUser)
})

// router.put('/edit', async (req, res) => {
//     const neas = await Neas.findOneAndUpdate(req.body)

//     res.send(neas)
// })

// router.delete('/delete/:designation', async (req, res) => {
//     const neas = await Neas.findOneAndDelete({ designation: req.params.designation })

//     res.send(neas)
// })


module.exports = router