const bcrypt = require('bcrypt')
const mysqlConnection = require("../database/connection")


var getOneUser = (username) => {
    return new Promise((resolve, reject) => {
        const query = `select * from user where username = "${username}"`
        mysqlConnection.query(query, (err, rows) => {
            if (err) throw err
            resolve(rows)
        })
    })
}

var CreateUser = async (req, res) => {
    try {
        const { username, password, fullname, isActive } = req.body;
        const result = await getOneUser(username);
        const hashPassword = await bcrypt.hash(password, 10);
        if (!result[0]) {
            const query = `insert into user (fullName, username, password, isActive) values("${fullname}", "${username}", "${hashPassword}", "${isActive}" )`
            mysqlConnection.query(query, (err, rows) => {
                if (err) throw err
                res.status(200).send({ message: "User created Successfully" })
            })
        } else {
            res.status(500).send({ message: "User Already Exist" })
        }
    } catch (err) {
        console.log(err)
    }
}

var LogIn = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!req.body.username) return res.status(200).send({ message: 'User Does Not Exist' })

        const result = await getOneUser(username);
        if (result[0]) {
            bcrypt.compare(password, result[0].password, (error, isMatch) => {
                if (error) return res.status(500).send({ message: error })
                if (!isMatch) {
                    res.status(500).send({
                        message: 'Wrong Credential !',
                    })
                    console.log('Password is Incorrect: ', !isMatch)
                    return
                } else {
                    res.status(200).send({
                        message: 'You Have Successfully Logged In',
                        // token: service.createToken(user)
                    })
                }
            })
        } else {
            res.status(500).send({ message: "User Does Not Exist! Create User First" })
        }
    } catch (err) {
        console.log(err)
    }

}

var getAllData = async (req, res) => {
    const query = `select * from user`
    mysqlConnection.query(query, (err, rows) => {
        if (err) throw err
        res.send(JSON.stringify(rows))
    })
}

module.exports = {
    LogIn,
    CreateUser,
    getAllData,
}