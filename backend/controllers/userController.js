const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const Invoice = require("../models/Invoice");

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, company, address, gstin, phone, email, password } = req.body;

  if (
    !name ||
    !company ||
    !address ||
    !gstin ||
    !phone ||
    !email ||
    !password
  ) {
    return res.status(400).json({
      message: "Please provide all the requried fields",
    });
  }

  // const existingCompany = await User.findOne({ company });
  // if (existingCompany) {
  //   return res.status(403).json({
  //     message: "User with this company name already exists",
  //   });
  // }

  const existingGstin = await User.findOne({ gstin });
  if (existingGstin) {
    return res.status(403).json({
      message: "User with this GSTIN number already exists",
    });
  }

  const existingPhone = await User.findOne({ phone });
  if (existingPhone) {
    return res.status(403).json({
      message: "User with this phone number already exists",
    });
  }

  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    return res.status(403).json({
      message: "User with this email already exists",
    });
  }

  const user = await User.create({
    name,
    company,
    address,
    gstin,
    phone,
    email,
    password,
  });

  sendToken(user, 201, res);
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return res.status(400).json({
      message : "Please Provide both email and password"
    });
  }

  let user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password"
    })
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) { 
    return res.status(401).json({
      message:"Invalid Email or Password"
    });
  }

  user = await User.findOne({ email }).select({
    "password":0
  }); 
  // const invoiceCount = await Invoice.countDocuments({firm:user._id})
  // user = {...user, invoiceCount: };
  // console.log(invoiceCount);
  // console.log(user);
  // user = {...user, invoiceCount: invoiceCount}
  // console.log(user);

  sendToken(user, 200, res);
});

// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  console.log(user);

  if (!user) {
    return res.status(404).json({
      message:"User not found"
    })
  }

  // Get ResetPassword Token
  const resetToken = user.PasswordTokengen();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${process.env.W_URL}/reset-password/${resetToken}`;

  const message = `Your password reset token is jjh :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Your Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;  
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return res.status(500).json({
      message: "Internal Server Error"
    })
  }
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  //   console.log(resetPasswordToken);
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({
      message: "Reset password token is invalid or has expired",
    });
  }
  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({
      message:"Password does not match"
    })
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if(!user){
    return res.status(404).json({
      message:"User not Found"
    })
  }
  res.status(200).json({
    success: true,
    user,
  });
});

// update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return res.status(400).json({
      message:"Old password is incorrect"
    })
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    res.status(400).json({
      message:"Password does not match"
    })
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

// update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    company: req.body.company,
    phone: req.body.phone,
    address: req.body.address,
    gstin: req.body.gstin,
  };
  const checkEmail = newUserData.email;
  const existingUser = await User.findOne({ email: checkEmail });
  if (!existingUser) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// // Get all users(admin)
// exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
//   const users = await User.find();

//   res.status(200).json({
//     success: true,
//     users,
//   });
// });

// // Get single user (admin)
// exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
//   const user = await User.findById(req.params.id);

//   if (!user) {
//     return next(
//       new ErrorHander(`User does not exist with Id: ${req.params.id}`)
//     );
//   }

//   res.status(200).json({
//     success: true,
//     user,
//   });
// });

// // update User Role -- Admin
// exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
//   const newUserData = {
//     name: req.body.name,
//     email: req.body.email,
//     role: req.body.role,
//   };

//   await User.findByIdAndUpdate(req.params.id, newUserData, {
//     new: true,
//     runValidators: true,
//     useFindAndModify: false,
//   });

//   res.status(200).json({
//     success: true,
//   });
// });

// // Delete User --Admin
// exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
//   const user = await User.findById(req.params.id);

//   if (!user) {
//     return next(
//       new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
//     );
//   }

//   await cloudinary.v2.uploader.destroy(imageId);

//   await user.remove();

//   res.status(200).json({
//     success: true,
//     message: "User Deleted Successfully",
//   });
// });
