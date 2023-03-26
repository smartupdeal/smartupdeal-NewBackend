const express = require('express');
const router = express.Router();
const Mongoose = require('mongoose');
const SaleTemp = require('../../models/saleTemp');
const Category = require('../../models/category');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');

// add saleTemp api
router.post('/add', auth, role.checkRole(role.ROLES.Admin, role.ROLES.Merchant), async (req, res) => {
  try {
    const name = req.body.name;
    const description = req.body.description;
    const category = req.body.category;
    const industry = req.body.industry;
    const skill = req.body.skill;
    const technology = req.body.technology;
    const isActive = req.body.isActive;
    const imageUrls = req.body.imageUrls;
    const packages = req.body.packages;
    const highLights = req.body.highLights;
    const faqs = req.body.faqs;
    const connectSlot=req.body.connectSlot;

    if (!description || !name) {
      return res.status(400).json({ error: 'You must enter description & name.' });
    }

    const saleTemp = new SaleTemp({
      name,
      description,
      category,
      industry,
      skill,
      technology,
      isActive,
      imageUrls,
      packages,
      highLights,
      faqs,
      connectSlot
    });

    const savedTemp = await saleTemp.save();
    res.status(200).json({
      success: true,
      message: `Temp has been added successfully!`,
      savedTemp
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch saleTemps api
router.get('/', auth, role.checkRole(role.ROLES.Admin, role.ROLES.Merchant), async (req, res) => {
  try {
    let saleTemps = [];

    saleTemps =[]; // await SaleTemp.find({});
    saleTemps = await SaleTemp.aggregate([
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'saleTemp',
          as: 'reviews'
        }
      },
      {
        $addFields: {
          totalRatings: { $sum: '$reviews.rating' },
          totalReviews: { $size: '$reviews' }
        }
      },
      {
        $addFields: {
          averageRating: {
            $cond: [{ $eq: ['$totalReviews', 0] }, 0, { $divide: ['$totalRatings', '$totalReviews'] }]
          }
        }
      }
  ])

    res.status(200).json({
      saleTemps
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch saleTemps api
router.get('/category/:slug', auth, role.checkRole(role.ROLES.Admin, role.ROLES.Merchant), async (req, res) => {
  try {
    let saleTemps = [];
    
    const categorySlug = req.params.slug;
    const categoryData = await Category.findOne({ slug: categorySlug });
    saleTemps =[]; // await SaleTemp.find({});
    saleTemps = await SaleTemp.aggregate([
      { "$match": { "category": categoryData._id } },
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'saleTemp',
          as: 'reviews'
        }
      },
      {
        $addFields: {
          totalRatings: { $sum: '$reviews.rating' },
          totalReviews: { $size: '$reviews' }
        }
      },
      {
        $addFields: {
          averageRating: {
            $cond: [{ $eq: ['$totalReviews', 0] }, 0, { $divide: ['$totalRatings', '$totalReviews'] }]
          }
        }
      }
  ])

    res.status(200).json({
      saleTemps
    });
  } catch (error) {
    res.status(400).json({
      error: error
    });
  }
});

// edit Sale Temp
router.put('/:id', auth, role.checkRole(role.ROLES.Admin, role.ROLES.Merchant), async (req, res) => {
  try {
    const saleTempId = req.params.id;
    const update = req.body.saleTemp;
    const query = { _id: saleTempId };

    await SaleTemp.findOneAndUpdate(query, update, {
      new: true
    });

    res.status(200).json({
      success: true,
      message: 'Sale Template  has been updated successfully!'
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch saleTem slug api
router.get('/item/:slug', async (req, res) => {
  try {
    const slug = req.params.slug;

    const saleTemp = await SaleTemp.findOne({ slug })
    .populate({
      path: 'packages',
      populate: {
        path: 'noneOptionalProducts',
      }
    })
    .populate({
      path: 'packages',
      populate: {
        path:'optionalProducts'
      }
    }) .populate({
      path: 'connectSlot',
      populate: {
        path:'speakers'
      }
    })

    if (!saleTemp) {
      return res.status(404).json({
        message: 'No SaleTemp found.'
      });
    }

    res.status(200).json({
      saleTemp
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch Sale Temp api
router.get('/:id', auth, role.checkRole(role.ROLES.Admin, role.ROLES.Merchant), async (req, res) => {
  try {
    const saleTempId = req.params.id;

    let saleTemp = null;

    saleTemp = await SaleTemp.findOne({ _id: saleTempId });
    // .populate(
    //   {
    //   path: 'packages',
    //   populate: {
    //     path: 'products',

    //   }
    // });

    if (!saleTemp) {
      return res.status(404).json({
        message: 'No SaleTemp found.'
      });
    }

    res.status(200).json({
      saleTemp
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// delete saleTemp API
router.delete('/delete/:id', auth, role.checkRole(role.ROLES.Admin, role.ROLES.Merchant), async (req, res) => {
  try {
    const deletedTemp = await SaleTemp.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      message: `Template has been deleted successfully!`,
      deletedTemp
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});
module.exports = router;
