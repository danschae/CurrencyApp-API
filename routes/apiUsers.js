const router = require('express').Router();
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

module.exports = (dbHelpers) => {

  router.post("/register", (req, res) => {
    const password = bcrypt.hashSync(req.body.password, salt);
    dbHelpers.validateUsers(req.body.username, req.body.email)
      .then(userData => {
        if (userData) {
          console.log(userData)
          for (const user of userData) {
            if (user.username === req.body.username) {
              return res.json("username already exists")
            }
            if (user.email === req.body.email) {
              return res.json("email already exists")
            }
          }
        }
        dbHelpers.registerUser(req.body.username, req.body.email, password)
          .then((response) => {
            const user = {
              "username": response.username,
              "email": response.email
            }
            return res.json(user)
          })
      })
      .catch(err => console.log(err))
  })

  router.post("/login", (req, res) => {
    dbHelpers.loginUser(req.body.email)
      .then(userData => {
        if (!userData) {
          return res.json("invalid email")
        };
        if (!bcrypt.compareSync(req.body.password, userData.password)) {
          return res.json("invalid password")
        };
        const user = {
          "username": userData.username,
          "email": userData.email
        };
        return res.json(user)
      })
      .catch(err => console.log(err))
  })

  return router
}