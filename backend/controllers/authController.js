const User = require("../models/User");
const jwt = require("jsonwebtoken");

//generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
}
  
//register user
exports.registerUser = async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        //create user
    const user = await User.create({ fullName, email, password });

        res.status(201).json({ 
            message: "User registered successfully",
            id: user._id, 
            user,
            token: generateToken(user._id)
        });
    } catch (err) {
        res.status(500).json({ message: "Error Registering User", error: err.message });
    }
};

//login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login successful",
      id: user._id,
      email: user.email,
      token: token,
    });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};


// get user info
exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json(user);
 } 
    catch (err) {
    res
    .status(500)
    .json({ message: "Error fetching user info", error: err.message });
    }
};