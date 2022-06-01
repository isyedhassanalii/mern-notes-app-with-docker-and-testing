import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
export const registerUser = asyncHandler( async (req,res)=>{

    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
      }

      const userExists = await User.findOne({ email })

      if (userExists) {
        res.status(400)
        throw new Error('User already exists')
      }

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      })
    
      if (user) {
        res.status(201).json({
          _id: user.id,
          name: user.name,
          email: user.email,
          token:generateToken(user._id),
          
        })
      } else {
        res.status(400)
        throw new Error('Invalid user data')
      }
})

export const loginUser= asyncHandler( async  (req,res)=>{

    const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token:generateToken(user._id),

     
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }

})

export const getMe= asyncHandler( async  (req,res)=>{
    res.status(200).json(req.user)
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })
}