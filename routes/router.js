const { LogIn, CreateUser, getAllData } = require("../controller/Controller");
const router = require("express").Router()


router.post('/create-user', CreateUser)

router.post('/auth', LogIn)

router.get('/get-details', getAllData)



module.exports = router;