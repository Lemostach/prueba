const Landing = require('./esquemas/esquema.js')
const express = require('express')
const router = express.Router()


//LANDINGS 
router.get("/", async (req, res) => {
    res.send(await Landing.find({mass: {$gte: req.query.minimum_mass}})
    .sort("mass")
    .select("name mass"))
})

router.get("/date/", async (req, res) => {

    if (req.query.from && req.query.to) {
        res.send(await Landing.find({ year: { $gte: req.query.from, $lte: req.query.to } })
        .sort("year")
        .select("name mass year"))
    } else if (req.query.from) {
        res.send(await Landing.find({ year: { $gte: req.query.from } }).select("name mass year"))
    } else if (req.query.to) {
        res.send(await Landing.find({ year: { $lte: req.query.to } }).select("name mass year"))
    } else {
        res.send(await Landing.find({}))
    }
})

router.get('/mass/:mass', async (req, res) => {
    const landings = await Landing.find({ mass: req.params.mass })
        .sort("mass")
        .select("mass name")

    res.send(landings)
})

router.get('/class/:class', async (req, res) => {
    const landings = await Landing.find({ recclass: req.params.class })
        .sort("class")
        .select("mass name recclass")
    res.send(landings)
})

router.post('/create', async (req, res) => {
    const landings = new Landing(req.body)

    const newLanding = await landings.save()

    res.send(newLanding)
})

router.put('/edit', async (req, res) => {
    const landing = await Landing.findOneAndUpdate(req.body)

    res.send(landing)
})

router.delete('/:id', async (req, res) => {
    const landing = await Landing.findOneAndDelete({ id: req.params.id })

    res.send(landing)
})


module.exports = router