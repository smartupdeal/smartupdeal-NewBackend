const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

// Bring in Models & Helpers
const User = require("../../models/user");
const Address = require("../../models/address");
const Brand = require("../../models/brand");
const auth = require("../../middleware/auth");
const role = require("../../middleware/role");
const Skills = require("../../models/skill");
const Technology = require("../../models/technology");
const Industries = require("../../models/industries");
const { uploadFileGC, deleteFileGC } = require("../../services/firebase");

// search users api
router.get(
  "/search",
  auth,
  role.checkRole(role.ROLES.Admin),
  async (req, res) => {
    try {
      const { search } = req.query;

      const regex = new RegExp(search, "i");

      const users = await User.find(
        {
          $or: [
            { firstName: { $regex: regex } },
            { lastName: { $regex: regex } },
            { email: { $regex: regex } },
          ],
        },
        { password: 0, _id: 0 }
      ).populate("merchant", "name");

      res.status(200).json({
        users,
      });
    } catch (error) {
      res.status(400).json({
        error: "Your request could not be processed. Please try again.",
      });
    }
  }
);


//=========> get user By id with interest
router.get("/", auth, async (req, res) => {
  try {
    const user = req.user._id;
    const userDoc = await User.findById(user, { password: 0, _id: 0 })
      .populate("interests.skills")
      .populate("interests.industries")
      .populate("interests.technologies")
      .populate("merchant");


    res.status(200).json({
      user: userDoc,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});
// Add user education
// TODO Add payload validation
router.post("/education", auth, async (req, res) => {
  try {
    const user = req.user._id;
    const { institution, program, passingYear } = req.body;

    const userDoc = await User.findByIdAndUpdate(
      user,
      { $push: { education: { institution, program, passingYear } } },
      {
        new: true,
      }
    )
      .populate("interests.skills")
      .populate("interests.industries")
      .populate("interests.technologies")
      .populate("merchant");

    res.status(200).json({
      success: true,
      message: "Your profile is successfully updated!",
      user: userDoc,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});
// Update user education
// TODO Add payload validation
router.put("/education", auth, async (req, res) => {
  try {
    const user = req.user._id;
    const { _id, institution, program, passingYear } = req.body;
    const query = {
      _id: user,
      "education._id": _id,
    };

    const userDoc = await User.findOneAndUpdate(
      query,
      {
        $set: {
          "education.$.institution": institution,
          "education.$.program": program,
          "education.$.passingYear": passingYear,
        },
      },
      {
        new: true,
      }
    )
      .populate("interests.skills")
      .populate("interests.industries")
      .populate("interests.technologies")
      .populate("merchant");
    res.status(200).json({
      success: true,
      message: "Your profile is successfully updated!",
      user: userDoc,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});
// get all users

router.get('/userList', auth, role.checkRole(role.ROLES.Admin, role.ROLES.Merchant), async (req, res) => {
  try {
    let userList = [];

    userList = await User.find({}, { password: 0});


    res.status(200).json({
      userList
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// Delete user education
// TODO Add payload validation
router.delete("/education/:id", auth, async (req, res) => {
  try {
    const user = req.user._id;
    const { id } = req.params;
    const query = {
      _id: user,
    };

    const userDoc = await User.findOneAndUpdate(
      query,
      {
        $pull: {
          education: { _id: id },
        },
      },
      {
        new: true,
      }
    )
      .populate("interests.skills")
      .populate("interests.industries")
      .populate("interests.technologies")
      .populate("merchant");
    res.status(200).json({
      success: true,
      message: "Your profile is successfully updated!",
      user: userDoc,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});

// Add user experience
// TODO Add payload validation
router.post("/experience", auth, async (req, res) => {
  try {
    const user = req.user._id;
    let { organization, designation, fromDate, toDate, isCurrent } = req.body;
    if (isCurrent) {
      await User.updateOne(
        { _id: user, "experience.isCurrent": true },
        { $set: { "experience.$.isCurrent": false } }
      );
      toDate = null;
    }
    const userDoc = await User.findByIdAndUpdate(
      user,
      {
        $push: {
          experience: {
            organization,
            designation,
            fromDate,
            toDate,
            isCurrent,
          },
        },
      },
      {
        new: true,
      }
    )
      .populate("interests.skills")
      .populate("interests.industries")
      .populate("interests.technologies")
      .populate("merchant");

    res.status(200).json({
      success: true,
      message: "Your profile is successfully updated!",
      user: userDoc,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});
// Update user experience
// TODO Add payload validation
router.put("/experience", auth, async (req, res) => {
  try {
    const user = req.user._id;
    let { _id, organization, designation, fromDate, toDate, isCurrent } =
      req.body;
    const query = {
      _id: user,
      "experience._id": _id,
    };
    if (isCurrent) {
      await User.updateOne(
        { _id: user, "experience.isCurrent": true },
        {
          $set: {
            "experience.$.isCurrent": false,
            "experience.$.toDate": new Date(),
          },
        }
      );
      toDate = null;
    }
    const userDoc = await User.findOneAndUpdate(
      query,
      {
        $set: {
          "experience.$.organization": organization,
          "experience.$.designation": designation,
          "experience.$.fromDate": fromDate,
          "experience.$.toDate": toDate,
          "experience.$.isCurrent": isCurrent,
        },
      },
      {
        new: true,
      }
    )
      .populate("interests.skills")
      .populate("interests.industries")
      .populate("interests.technologies")
      .populate("merchant");

    res.status(200).json({
      success: true,
      message: "Your profile is successfully updated!",
      user: userDoc,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});
// Delete user experience
// TODO Add payload validation
router.delete("/experience/:id", auth, async (req, res) => {
  try {
    const user = req.user._id;
    const { id } = req.params;
    const query = {
      _id: user,
    };

    const userDoc = await User.findOneAndUpdate(
      query,
      {
        $pull: {
          experience: { _id: id },
        },
      },
      {
        new: true,
      }
    )
      .populate("interests.skills")
      .populate("interests.industries")
      .populate("interests.technologies")
      .populate("merchant");
    res.status(200).json({
      success: true,
      message: "Your profile is successfully updated!",
      user: userDoc,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});
router.put("/profile_picture", auth, async (req, res) => {
  try {
    const user = req.user._id;
    const { profilePicture } = req.body;
    const query = { _id: user };
    console.log(req.user.avatar);
    if (req.user.avatar) {
      await deleteFileGC(req.user.avatar);
    }
    const extension = profilePicture.substring(
      "data:image/".length,
      profilePicture.indexOf(";base64")
    );
    const filename = `${uuidv4()}.${extension}`;
    await uploadFileGC(profilePicture, filename);

    const avatar = filename;
    const userDoc = await User.findOneAndUpdate(
      query,
      { avatar },
      {
        new: true,
      }
    )
      .populate("interests.skills")
      .populate("interests.industries")
      .populate("interests.technologies")
      .populate("merchant");

    res.status(200).json({
      success: true,
      message: "Your profile picture is successfully updated!",
      user: userDoc,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});
router.put("/", auth, async (req, res) => {
  try {
    const user = req.user._id;
    const {
      firstName,
      lastName,
      phoneNumber,
      dob: dateOfBirth,
      gender,
      about,
      currentAddress,
    } = req.body;
    const query = { _id: user };
    if (currentAddress) {
      await Address.updateMany(
        { user: user },
        {
          isDefault: false,
        }
      );
      await Address.updateOne(
        { _id: currentAddress },
        {
          isDefault: true,
        }
      );
    }
    const userDoc = await User.findOneAndUpdate(
      query,
      { firstName, lastName, phoneNumber, dateOfBirth, gender, about },
      {
        new: true,
      }
    )
      .populate("interests.skills")
      .populate("interests.industries")
      .populate("interests.technologies")
      .populate("merchant");

    res.status(200).json({
      success: true,
      message: "Your profile is successfully updated!",
      user: userDoc,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});

// Add user achievements
// TODO Add payload validation
router.post("/achievements", auth, async (req, res) => {
  try {
    const user = req.user._id;
    const achievements = req.body?.achievements;
    const query = { _id: user };

    const userDoc = await User.findOneAndUpdate(
      query,
      { achievements },
      {
        new: true,
        fields: { password: 0, _id: 0 },
      }
    )
      .populate("interests.skills")
      .populate("interests.industries")
      .populate("interests.technologies")
      .populate("merchant");

    res.status(200).json({
      success: true,
      message: "Your profile is successfully updated!",
      user: userDoc,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});

// Add user skills
// TODO Add payload validation
router.post("/skills", auth, async (req, res) => {
  try {
    const user = req.user._id;
    const skills = req.body?.skills;
    const userDoc = await User.findByIdAndUpdate(
      user,
      { $set: { "interests.skills": skills } },
      {
        new: true,
      }
    )
      .populate("interests.skills")
      .populate("interests.industries")
      .populate("interests.technologies")
      .populate("merchant");

    res.status(200).json({
      success: true,
      message: "Your profile is successfully updated!",
      user: userDoc,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});

// Add user technologies
// TODO Add payload validation
router.post("/technologies", auth, async (req, res) => {
  try {
    const user = req.user._id;
    const technologies = req.body?.technologies;

    const userDoc = await User.findByIdAndUpdate(
      user,
      { $set: { "interests.technologies": technologies } },
      {
        new: true,
      }
    )
      .populate("interests.skills")
      .populate("interests.industries")
      .populate("interests.technologies")
      .populate("merchant");

    res.status(200).json({
      success: true,
      message: "Your profile is successfully updated!",
      user: userDoc,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});

// Add user industries
// TODO Add payload validation
router.post("/industries", auth, async (req, res) => {
  try {
    const user = req.user._id;
    const industries = req.body?.industries;

    const userDoc = await User.findByIdAndUpdate(
      user,
      { $set: { "interests.industries": industries } },
      {
        new: true,
      }
    )
      .populate("interests.skills")
      .populate("interests.industries")
      .populate("interests.technologies")
      .populate("merchant");

    res.status(200).json({
      success: true,
      message: "Your profile is successfully updated!",
      user: userDoc,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});
module.exports = router;
