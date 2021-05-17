const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');

router.post('/register', async (req, res) => {

    const { error } = registerValidation(req.body);
    
    if(error) return res.status(400).json({ msg: error.details[0].message})

    const emailExist = await User.findOne({ email: req.body.email });

    if (emailExist) return res.status(400).json({ msg: 'Email already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        phoneNumber: req.body.phoneNumber,
        company: req.body.company,
    });
    try {
        const savedUser = await user.save();
        res.json({ savedUser });
    } catch (err) {
        res.status(400).json({ msg: err });
    }
})

router.post('/login', async (req, res) => {

    try {
        const { error } = loginValidation(req.body);

        if (error) return res.status(400).json({ msg: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });

        if (!user) return res.status(400).json({ msg: 'Email or password is wrong' });

        const validPass = await bcrypt.compare(req.body.password, user.password);

        if (!validPass) return res.status(400).json({ msg: 'Email or password is wrong' });

        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_KEY);
        res.status(200).json({
            token,
            user: {
              id: user._id,
              name: user.name,
              email: user.email
            }
        });

    } catch (err) {
        res.status(500).json({ msg: err });
    }
})

module.exports = router;