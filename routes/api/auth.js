const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const User = require('../../models/User');

// @route GET api/auth
// @desc test route
// @access public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) throw Error('User is not in the database. Please signup.'); // sends error to catch block
    res.json(user);
  } catch (err) {
    res.status(401).json({ errors: [{ msg: `Server error: ${err.message}` }] });
  }
});

// @route POST api/auth
// @desc authenticate user and get token
// @access public
router.post(
  '/',
  [
    check('email', 'Email must be valid.').isEmail(),
    check('password', 'Password is required.').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // see if user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Invalid credentials.' // generic message to avoid potential security risk
            }
          ]
        });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials.' }] }); // same generic message to avoid potential security risk
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token
          });
        }
      );
    } catch (err) {
      res
        .status(500)
        .json({ errors: [{ msg: `Server error: ${err.message}` }] });
    }
  }
);

module.exports = router;
