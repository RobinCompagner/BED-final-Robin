import { Router } from "express";
import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js';
import * as userService from '../services/users/exports.js';
import auth from "../middleware/auth.js";

const router = Router();

// Routes
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
}, notFoundErrorHandler);

router.get("/:id", async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: `User with id ${req.params.id} not found` });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    if (error.message === 'Username or email already exists' || error.message === 'Invalid user data') {
      res.status(400).json({ message: error.message });
    } else {
      next(error);
    }
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const deletedUserId = await userService.deleteUserById(req.params.id);
    if (!deletedUserId) {
      return res.status(404).json({ message: `User with id ${req.params.id} not found` });
    }
    res.status(200).json({
      message: `User with id ${deletedUserId} successfully deleted`,
      userId: deletedUserId,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const updatedUser = await userService.updateUserById(req.params.id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ message: `User with id ${req.params.id} not found` });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    if (error.message === 'Username already exists') {
      return res.status(409).json({ message: 'Username already exists' });
    }
    next(error);
  }
});

export default router;
