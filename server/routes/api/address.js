const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const Address = require('../../models/address');
const auth = require('../../middleware/auth');

router.get("/test",  (req,res)=> {
  console.log("//======= API Got Hit ======//");
  return res.status(200).send("Test Hit Successfully");
})

router.post('/add', auth, (req, res) => {
  const user = req.user;

  const address = new Address(Object.assign(req.body, { user: user._id }));

  address.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again!.'
      });
    }

    res.status(200).json({
      success: true,
      message: `Address has been added successfully!`,
      address: data
    });
  });
});

// fetch all addresses api
router.get('/', auth, async(req, res) => {
  console.log("//============== all adress api ===================//");
  // Address.find({ user: req.user._id }, (err, data) => {
  //   if (err) {
  //     return res.status(400).json({
  //       error: 'Your request could not be processed. Please try again.'
  //     });
  //   }

  //   res.status(200).json({
  //     addresses: data
  //   });
  // });
  const data = await Address.find({user : req.user._id});
  console.log("data : ", data);
  return res.status(200).json({addresses : data});
  
});

router.get('/:id', async (req, res) => {
  console.log("//==================== address by id =====================//")
  try {
    const addressId = req.params.id;

    const addressDoc = await Address.findOne({ _id: addressId });

    if (!addressDoc) {
      res.status(404).json({
        message: `Cannot find Address with the id: ${addressId}.`
      });
    }

    res.status(200).json({
      address: addressDoc
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const addressId = req.params.id;
    const update = req.body;
    const query = { _id: addressId };

    await Address.findOneAndUpdate(query, update, {
      new: true
    });

    res.status(200).json({
      success: true,
      message: 'Address has been updated successfully!'
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.delete('/delete/:id', (req, res) => {
  Address.deleteOne({ _id: req.params.id }, (err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }

    res.status(200).json({
      success: true,
      message: `Address has been deleted successfully!`,
      address: data
    });
  });
});

module.exports = router;
