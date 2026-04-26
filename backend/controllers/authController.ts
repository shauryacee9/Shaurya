import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/User.ts";

const generateToken = (id: string) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET as string,
    { expiresIn: "30d" }
  );
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user: any = await User.create({
      name,
      email,
      password,
      role,
    });

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id.toString()),
    });

  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const user: any = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id.toString()),
      });
    }

    return res.status(401).json({
      message: "Invalid email or password",
    });

  } catch (error) {
    next(error);
  }
};

export const getProfile = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.json(user);

  } catch (error) {
    next(error);
  }
};