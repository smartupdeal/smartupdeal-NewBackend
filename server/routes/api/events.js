const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const EventType = require('../../models/event-types');
const Event = require('../../models/events');
const Organizer = require('../../models/organizer');

router.post('/addEventType', (req, res) => {
  const typeName = req.body.type_name;
  const isMostlyUsed = req.body.is_mostly_used;

  if (!typeName) {
    return res.status(400).json({ error: 'You must enter an Event Type!' });
  }

  if (!isMostlyUsed) {
    return res
      .status(400)
      .json({ error: 'You must enter used status of Event Type.' });
  }

  const eventType = new EventType({
    typeName,
    isMostlyUsed
  });

  eventType.save(async (err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }

    res.status(200).json({
      success: true,
      message: `Event Type has been added successfully!`,
      event_type: data
    });
  });
});

router.post('/addOrganizer', (req, res) => {
  const email = req.body.organizer_name;
  const postedBy = req.body.posted_by;
  if (!email) {
    return res
      .status(400)
      .json({ error: 'You must enter an Organizer Email.' });
  }

  if (!postedBy) {
    return res.status(400).json({ error: 'You must enter an Organizer.' });
  }

  const organizer = new Organizer(req.body);

  organizer.save(async (err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }

    res.status(200).json({
      success: true,
      message: `Organizer Details has been added successfully!`,
      event_type: data
    });
  });
});

router.post('/addEvent', (req, res) => {
  const eventType = req.body.eventType;
  const organizer = req.body.organizerDetails;
  if (!eventType) {
    return res.status(400).json({ error: 'You must enter an Event Type.' });
  }

  if (!organizer) {
    return res.status(400).json({ error: 'You must enter an Organizer.' });
  }

  const event = new Event(req.body);

  event.save(async (err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }

    res.status(200).json({
      success: true,
      message: `Event Details has been added successfully!`,
      event_type: data
    });
  });
});

// fetch store brands api
router.get('/eventList', async (req, res) => {
  console.log("//====================== Event List ==================//");
  try {
    const events = await Event.find({
      isActive: true
    })
      .populate('eventType')
      .populate('organizerDetails')
      .populate('eventSegment');

    res.status(200).json({
      events
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

module.exports = router;
