const router = require('express').Router()
var jwt = require('jsonwebtoken');
const userModel = require("../models/userModel")
const bcrypt = require("bcrypt");
const { db } = require('../models/userModel');
const { role, ROLES } = require('../models/index');
var refreshTokens = {};




router.get('/register', function (req, res) {
    res.render('register');
})


router.post('/register', async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.json(" vui long nhap lai")
        }

        const { username, password } = req.body
        const user = await userModel.findOne({ username })
        if (user) return res.status(400).json({ msg: " Username da tồn tại" })


        const hashPassword = bcrypt.hashSync(req.body.password, 10);

        let isvalid = ROLES.indexOf(req.body.role);
        console.log("isvalid : " + isvalid);
        if (isvalid == 1) {
            return res.json(500).message("Role is not found.");
        }

        console.log(req.body);

        let registerRequestModel = new userModel({
            username: req.body.username,
            password: hashPassword,
            role: req.body.role

        })
        let result = await registerRequestModel.save()
        // res.json(result)
        return res.send("Đăng kí thành công!");
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await userModel.findOne({ username })
        if (!user) return res.status(400).json({ msg: " Username ko tồn tại" })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ msg: "Mật khẩu sai" })
        const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

        const dataForAccessToken = {
            username: user.username,
        };

        const accessToken = await jwt.sign(
            {
                dataForAccessToken,

            },
            accessTokenSecret,
            {
                algorithm: 'HS256',
                expiresIn: accessTokenLife,
            },
        );
        if (!accessToken) {
            return res
                .status(401)
                .send('Đăng nhập không thành công, vui lòng thử lại.');
        }
        const _CONF = {
            username: user.username,
        };
        const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "365d";


        const refreshToken = jwt.sign({
            _CONF,

        },
            refreshTokenLife,

        )
        console.log(user.role);
        if (user.role == "admin") {
            return res.status(200).send("trang cho admin").redirect("/1")
        }
        return res.json({
            msg: 'Đăng nhập thành công.',

            accessToken, refreshToken,
        });
        
    } catch (error) {
        res.status(500).send(error.message)
    }
})



router.get('/1', (req, res) => {
    const key = require('crypto').randomBytes(12).toString('hex')
    console.log("key", key);
    return res.status(200).json(key);
})



module.exports = router
