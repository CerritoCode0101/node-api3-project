const express = require("express");
const usrModel = require("./users-model");
const router = express.Router();
const {validateUserId, validateUser} = require('../middleware/middleware')

router.get("/", (req, res) => {
  usrModel
    .get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(() => res.status(404).json({ message: "Users not found" }));
});

router.get("/:id", validateUserId, (req, res) => {
  const idVar = req.params.id;
  usrModel
    .getById(idVar)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(() => res.status(404).json({ message: "The user was not found" }));
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
});

router.post("/",validateUser, (req, res) => {
  const user = req.body;
  usrModel
    .insert(user)
    .then((user) => {
      res.status(201).json({ message: `New user Created! ${user.name}` });
    })
    .catch(() => res.status(500).json({ message: "Error adding the user" }));
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put("/:id",validateUserId, validateUser,(req, res) => {
  const idVar = req.params.id;
  const changes = req.body;
  usrModel.update(idVar, changes).then(changes => {
    res.status(200).json({message: `The user at id: ${changes.id} has been updated!`})
  }).catch(err => {
    console.log("SERVER ERROR", err)
    res.status(500).json({message: 'Error updating the user'})
  })

  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete("/:id",validateUserId, (req, res) => {
  const idVar = req.params.id;
  usrModel.remove(idVar).then( id => {
    res.status(200).json({message: `The user at id: ${idVar} has been Deleted!`})
  }).catch(err => {
    console.log("SERVER ERROR",err)
    res.status(500).json({message: `The user at id: ${idVar} could not be deleted..` })
  })
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

// do not forget to export the router
module.exports = router;
