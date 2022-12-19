const Neas = require('./esquemas/esquemaNeas.js')
const express = require('express')
const router = express.Router()


//NEAS

router.get("/", async (req, res) => {
    const resultado = await Neas.find({ orbit_class: "Aten" })
        .select("designation period_yr")
    res.send(resultado)
})

router.get("/date/", async (req, res) => {
    if (req.query.from && req.query.to) {
        res.send(await Neas.find({ discovery_date: { $gt: req.query.from, $lt: req.query.to } })
            .select("designation discovery_date period_yr"))
    }
    else if (req.query.from) {
        res.send(await Neas.find({ discovery_date: { $gte: req.query.from } })
        .select("designation discovery_date period_yr"))
    }
    else if (req.query.to) {
        res.send(await Neas.find({ discovery_date: { $lte: req.query.to } })
        .select("designation discovery_date period_yr"))
    }
    else {
        res.send(await Neas.find({}))
    }
})

router.post('/create', async (req, res) => {
    const neas = new Neas(req.body)

    const newNeas = await neas.save()

    res.send(newNeas)
})

router.put('/edit', async (req, res) => {
    const neas = await Neas.findOneAndUpdate(req.body)

    res.send(neas)
})

router.delete('/delete/:designation', async (req, res) => {
    const neas = await Neas.findOneAndDelete({ designation: req.params.designation })

    res.send(neas)
})


module.exports = router