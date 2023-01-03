const router = require("express").Router();
const Event = require("../models/Event");
const moment = require("moment");

router.post( path, "/create-event", handlers, async (req, res) => {
    const event = Event(req.body);
    await_event.save();
    res.sendStatus(201);
})

router.get("/get-events", async(req, res) => {
    const events = await Event.find({
    start: {$gte: moment (req.query.start).toDate() }, 
    end: { $lte: moment(req.query.end).toDate() },
    });

    res.send(events);
});



    module.exports = router;

