import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadCloudunary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  //    return res.status(200).json({
  //         message: "this is coder "
  //     })

  // get user details from frontend
  // validation - not empty
  // check if user is already exists : username, email
  // check for images, check for avtar
  // upload them to cloudinary, avatar
  // create user object - create entry in DB
  // remove password and refresh token field from response
  // chaeck for user creation
  // return res

  const { fullName, email, username, password } = req.body;
  // console.log("email: ",email)

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, " all fields are required");
  }
  const existedUser = await User.findOne({ $or: [{ username }, { email }] });

  if (existedUser) {
    throw new ApiError(409, "user with email or username is already exist");
  }

  // console.log(req.files);
  const avatarLocalPath = req.files?.avatar[0]?.path;
  //  const coverImageLocalPath= req.files?.coverImage[0]?.path;

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage && req.files.coverImage.lenght > 0)
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar File is required");
  }

  const avatar = await uploadCloudunary(avatarLocalPath);
  const coverImage = await uploadCloudunary(coverImageLocalPath);

  
  if (!avatar) {
    throw new ApiError(400, "Avatar File is required");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "USerREgister Successfully"));
});

export { registerUser };
