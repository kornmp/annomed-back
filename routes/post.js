const router = require('express').Router();
const verify = require('./varifyToken');

router.get('/', verify, (req,res) => {
    res.json({
        posts: {
            title: 'test',
            desc: 'test too'
        }
    });
});

module.exports = router;