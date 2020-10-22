const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const axios = require('axios');
const config = require('config');
const normalizeUrl = require('normalize-url');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

// @route GET api/profile/me
// @desc get current users profile
// @access private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      'name avatar'
    );

    if (!profile) {
      return res
        .status(400)
        .json({ errors: [{ msg: "You don't have a profile." }] });
    }

    res.json(profile);
  } catch (err) {
    res.status(500).json({ errors: [{ msg: `Server error: ${err.message}` }] });
  }
});

// @route GET api/profile
// @desc get all profiles
// @access public

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', 'name avatar');
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ errors: [{ msg: `Server error: ${err.message}` }] });
  }
});

// @route GET api/profile/user/:user_id
// @desc get a user's profile
// @access public

router.get('/user/:user_id', async (req, res) => {
  const { user_id } = req.params;

  try {
    const profile = await Profile.findOne({ user: user_id }).populate(
      'user',
      'name avatar'
    );

    if (!profile) {
      return res.status(400).json({ errors: [{ msg: 'Profile not found.' }] });
    }

    res.json(profile);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ errors: [{ msg: 'Profile not found.' }] });
    }
    res.status(500).json({ errors: [{ msg: `Server error: ${err.message}` }] });
  }
});

// @route POST api/profile
// @desc create or update current users profile
// @access private
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required.').notEmpty(),
      check('skills', 'Skills is required.').notEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      location,
      website,
      bio,
      skills,
      status,
      githubusername,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook
    } = req.body;

    const profileFields = {
      user: req.user.id,
      company,
      location,
      website: website ? normalizeUrl(website, { forceHttps: true }) : '',
      bio,
      skills: skills.replace(/^\s*,\s*|\s*,\s*$/g, '').split(/\s*,\s*/),
      status,
      githubusername
    };

    const socialFields = { youtube, twitter, instagram, linkedin, facebook };

    for (const [key, value] of Object.entries(socialFields)) {
      if (value) {
        socialFields[key] = normalizeUrl(value, { forceHttps: true });
      }
    }

    profileFields.social = socialFields;

    try {
      const profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        profileFields,
        { new: true, upsert: true, setDefaultsOnInsert: true } // defaults only saved to db on insert, not on update (although returned profile will have them)
      );

      res.json(profile);
    } catch (err) {
      res
        .status(500)
        .json({ errors: [{ msg: `Server error: ${err.message}` }] });
    }
  }
);

// @route DELETE api/profile
// @desc delete profile, user and posts
// @access private

router.delete('/', auth, async (req, res) => {
  try {
    await Promise.all([
      Profile.findOneAndRemove({ user: req.user.id }),
      User.findByIdAndDelete(req.user.id),
      Post.deleteMany({ user: req.user.id })
    ]);

    res.json({ msg: 'User deleted.' });
  } catch (err) {
    res.status(500).json({ errors: [{ msg: `Server error: ${err.message}` }] });
  }
});

// @route PUT api/profile/experience
// @desc add profile experience
// @access private

router.put(
  '/experience',
  [
    auth,
    check('title', 'Title is required.').notEmpty(),
    check('company', 'Company is required.').notEmpty(),
    check('from', 'From is required.').notEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;

    const newExperience = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };

    try {
      // const profile = await Profile.findOne({ user: req.user.id });

      // profile.experience.unshift(newExperience);

      // await profile.save();

      // use db methods instead:
      const profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $push: { experience: { $each: [newExperience], $position: 0 } } },
        { new: true }
      );

      res.json(profile);
    } catch (err) {
      res
        .status(500)
        .json({ errors: [{ msg: `Server error: ${err.message}` }] });
    }
  }
);

// @route DELETE api/profile/experience/:exp_id
// @desc delete specific experience data
// @access private

router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { experience: { _id: req.params.exp_id } } },
      { new: true }
    );

    res.json(profile);
  } catch (err) {
    res.status(500).json({ errors: [{ msg: `Server error: ${err.message}` }] });
  }
});

// @route PUT api/profile/education
// @desc add profile education
// @access private

router.put(
  '/education',
  [
    auth,
    check('school', 'School is required.').notEmpty(),
    check('degree', 'Degree is required.').notEmpty(),
    check('fieldofstudy', 'Fieldofstudy is required.').notEmpty(),
    check('from', 'From is required.').notEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;

    const newEducation = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    };

    try {
      const profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $push: { education: { $each: [newEducation], $position: 0 } } },
        { new: true }
      );

      res.json(profile);
    } catch (err) {
      res
        .status(500)
        .json({ errors: [{ msg: `Server error: ${err.message}` }] });
    }
  }
);

// @route DELETE api/profile/education/:edu_id
// @desc delete specific education data
// @access private

router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { education: { _id: req.params.edu_id } } },
      { new: true }
    );

    res.json(profile);
  } catch (err) {
    res.status(500).json({ errors: [{ msg: `Server error: ${err.message}` }] });
  }
});

// @route GET api/profile/github/:username
// @desc get user repos from github
// @access public

router.get('/github/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const uri = encodeURI(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`
    );
    const headers = { Authorization: `token ${config.get('githubToken')}` };

    const githubResponse = await axios.get(uri, { headers });

    res.json(githubResponse.data);
  } catch (err) {
    res.status(404).json({ errors: [{ msg: 'No Github profile found' }] });
  }
});

module.exports = router;
