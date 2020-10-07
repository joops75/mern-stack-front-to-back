const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route POST api/users
// @desc register user
// @access public
router.post(
  '/',
  [
    check('name', 'Name is required.').notEmpty(),
    check('email', 'Email must be valid.').isEmail(),
    check('password', 'Password must be 6 or more characters.').isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // see if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'That email is already in use.' }] });
      }

      const avatar = gravatar.url(email, {
        size: 200,
        rating: 'pg',
        default: 'mm'
      });

      user = new User({
        name,
        email,
        password: bcrypt.hashSync(password, 10),
        avatar
      });

      await user.save();

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
