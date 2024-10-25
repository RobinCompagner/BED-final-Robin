import { Router } from "express";
import * as userService from '../services/users/exports.js';
import auth from "../middleware/auth.js";

const router = Router();

// Routes
// Get all users with filter for username and email
router.get("/", async (req, res, next) => {
  try {
    const { username, email } = req.query;
    const filters = {};

    if (username) filters.username = username;
    if (email) filters.email = email;

    const users = await userService.getUsers(filters);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

// Get user by ID
router.get("/:id", async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (user === null) {
      return next(null); // This will trigger your 404 in the error handler
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// Create new user
router.post("/", auth, async (req, res, next) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json({ message: `User with id ${newUser} successfully created` });
  } catch (error) {
    next(error);
  }
});

// Update user by ID
router.put("/:id", auth, async (req, res, next) => {
  try {
    const updatedUser = await userService.updateUserById(req.params.id, req.body);
    res.status(200).json({ message: `User with id ${updatedUser} successfully updated` });
  } catch (error) {
    next(error);
  }
});

// Delete user by ID
router.delete("/:id", auth, async (req, res, next) => {
  try {
    const deletedUserId = await userService.deleteUserById(req.params.id);
    res.status(200).json({ message: `User with id ${deletedUserId} successfully deleted` });
  } catch (error) {
    next(error);
  }
});

export default router;
