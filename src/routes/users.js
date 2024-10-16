import { Router } from "express";
import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js';
import getUsers from '../services/users/getUsers.js'
import getUserById from "../services/users/getUserById.js";
import createUser from "../services/users/createUser.js";
import deleteUserById from "../services/users/deleteUserById.js";
import updateUserById from "../services/users/updateUserById.js";
import auth from "../middleware/auth.js";
// auth extracted from routers for testing purpose
const router = Router()

router.get("/", async (req, res, next) => {
  try {
    const users = await getUsers()

    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
},
  notFoundErrorHandler
)

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    if (!user) {
      res.status(404).json({ message: `User with id ${id} not found` });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
});
// auth, 
router.post("/", async (req, res, next) => {
  try {
    console.log("Params createRoute:", req.params);  // Log the params (you already see the id correctly logged)
    console.log("Body before destructuring createRoute:", req.body);  // Log req.body before destructuring
    const { username, name, password, email, phoneNumber, profilePicture } = req.body;
    const newUser = await createUser(username, name, password, email, phoneNumber, profilePicture);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});
// auth, 
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await deleteUserById(id);

    if (user) {
      res.status(200).send({
        message: `User with id ${id} successfully deleted`,
        user,
      });
    } else {
      res.status(404).json({
        message: `User with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
});
// auth, 
// my code
/* router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, name, password, email, phoneNumber, profilePicture } = req.body;
    const user = await updateUserById(id, { username, name, password, email, phoneNumber, profilePicture });

    if (user) {
      res.status(200).send({
        message: `User with id ${id} successfully updated`,
      });
    } else {
      res.status(404).json({
        message: `User with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
}); */
// chatgpt code review
router.post("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("Params:", req.params);  // Log the params (you already see the id correctly logged)
    console.log("Body before destructuring:", req.body);  // Log req.body before destructuring
    const { username, name, password, email, phoneNumber, profilePicture } = req.body;
    console.log(username);

    // Call the update service
    const updatedUser = await updateUserById(id, { username, name, password, email, phoneNumber, profilePicture });

    if (updatedUser) {
      res.status(200).send({
        message: `User with id ${id} successfully updated`,
        user: updatedUser  // Return the updated user details if necessary
      });
    } else {
      res.status(404).json({
        message: `User with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
});

// test post route
router.post("/test", (req, res) => {
  console.log("Request Body test:", req.body);
  res.status(200).json(req.body);
});


export default router