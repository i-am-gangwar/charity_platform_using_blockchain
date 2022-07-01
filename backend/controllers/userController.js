import UserModel from '../models/User.js'
import BlogModel from '../models/Blog.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import transporter from '../config/emailConfig.js'
import AlltxnsModel from '../models/Alltxns.js'
class UserController {
  // user registration query
  static userRegistration = async (req, res) => {
    const { name, email, password, password_confirmation, tc } = req.body
    const user = await UserModel.findOne({ email: email })
    if (user) {
      res.send({ "status": "failed", "message": "Email already exists" })
    } else {
      if (name && email && password && password_confirmation && tc) {
        if (password === password_confirmation) {
          try {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt)
            const doc = new UserModel({
              name: name,
              email: email,
              password: hashPassword,
              tc: tc
            })
            await doc.save()
            const saved_user = await UserModel.findOne({ email: email })
            // Generate JWT Token
            const token = jwt.sign({ userID: saved_user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '30m' })
            res.status(201).send({ "status": "success", "message": "Registration Success", "token": token })
          } catch (error) {
            console.log(error)
            res.send({ "status": "failed", "message": "Unable to Register" })
          }
        } else {
          res.send({ "status": "failed", "message": "Password and Confirm Password doesn't match" })
        }
      } else {
        res.send({ "status": "failed", "message": "All fields are required" })
      }
    }
  }
  //  user login query
  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body
      if (email && password) {
        const user = await UserModel.findOne({ email: email })
        if (user != null) {
          const isMatch = await bcrypt.compare(password, user.password)
          if ((user.email === email) && isMatch) {
            // Generate JWT Token
            const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '30m' })
            res.send({ "status": "success", "message": "Login Success", "token": token })
          } else {
            res.send({ "status": "failed", "message": "Email or Password is not Valid" })
          }
        } else {
          res.send({ "status": "failed", "message": "You are not a Registered User" })
        }
      } else {
        res.send({ "status": "failed", "message": "All Fields are Required" })
      }
    } catch (error) {
      console.log(error)
      res.send({ "status": "failed", "message": "Unable to Login" })
    }
  }
  // creating new blogfrom for user for raising the fund
  static userBlogform = async (req, res) => {
    const { Blog_title, Blog_content, Blog_amount, Blog_fundraised, Blog_wallet, Blog_author, tc, Blog_reason
      , Blog_city, Blog_state, Blog_pincode } = req.body;
    const new_blog = new BlogModel({
      Blog_title, Blog_content, Blog_amount, Blog_fundraised, Blog_wallet, Blog_author, Blog_city, Blog_pincode, Blog_reason, Blog_state, tc,
    })
    await new_blog.save();
    const saved_blog = await new_blog.save();
    const token = jwt.sign({ blogID: saved_blog._id }, process.env.JWT_SECRET_KEY, { expiresIn: '30m' })
    res.status(201).send({ "status": "success", "message": "blog creation  Success", "token": token })
  }
  // saving transaction for showing the history on history page
  static alltxnssave = async (req, res) => {
    const { from_account, to_account, amount, block_hash, block_number, txn_hash, gas_used, status } = req.body;
    const new_txn = new AlltxnsModel({ from_account, to_account, amount, block_hash, block_number, txn_hash, gas_used, status, })
    await new_txn.save();
    const saved_txn = await new_txn.save();
    res.status(201).send({ "status": "success", "message": "txn saved" })
  }
  // accessing all transaction history  and showing on transaction history
  static alltxnsinfo = async (req, res) => {
    const got_alltxns = await AlltxnsModel.find();
    got_alltxns.reverse();
    res.send(got_alltxns)
  }
  // querying user created projects data
  static loggedUserProjects = async (req, res) => {
    const email = req.user.email
    const got_blog = await BlogModel.find({ Blog_author: email }).sort({ Blog_fundraised: 1 })
    res.send(got_blog)
  }
  //   showing all blogs on donor page
  static loggedAllUserProjects = async (req, res) => {
    const got_blog = await BlogModel.find().sort({ Blog_fundraised: 1 })  // sorting on the basis of fundraised % 
    res.send(got_blog)
  }
  // for changing password
  static changeUserPassword = async (req, res) => {
    const { password, password_confirmation } = req.body
    if (password && password_confirmation) {
      if (password !== password_confirmation) {
        res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
      } else {
        const salt = await bcrypt.genSalt(10)
        const newHashPassword = await bcrypt.hash(password, salt)
        await UserModel.findByIdAndUpdate(req.user._id, { $set: { password: newHashPassword } })
        res.send({ "status": "success", "message": "Password changed succesfully" })
      }
    } else {
      res.send({ "status": "failed", "message": "All Fields are Required" })

    }
  }
  //  updating total fund raised after getting donation for that blog
  static totalfundraised = async (req, res) => {
    const { Blog_fundraised, id } = req.body
    const blog = await BlogModel.findByIdAndUpdate(id, { $set: { Blog_fundraised: Blog_fundraised } })
    res.send({ "status": "success", "message": "fundraised updated" })
  }
  // getting logged user data to show name of user in  his account 
  static loggedUser = async (req, res) => {
    res.send({ "user": req.user })
  }

  //sending password reset mail
  static sendUserPasswordResetEmail = async (req, res) => {
    const { email } = req.body
    if (email) {
      const user = await UserModel.findOne({ email: email })
      if (user) {
        const secret = user._id + process.env.JWT_SECRET_KEY
        const token = jwt.sign({ userID: user._id }, secret, { expiresIn: '15m' })
        const link = `http://127.0.0.1:3000/api/user/reset/${user._id}/${token}`
        console.log(link)
        // Send Email
        let info = await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: user.email,
          subject: " Password Reset Link",
          html: `<a href=${link}>Click Here</a> to Reset Your Password`
        })
        res.send({ "status": "success", "message": "Password Reset Email Sent... Please Check Your Email" })
      } else {
        res.send({ "status": "failed", "message": "Email doesn't exists" })
      }
    } else {
      res.send({ "status": "failed", "message": "Email Field is Required" })
    }
  }
  // resetting user password
  static userPasswordReset = async (req, res) => {
    const { password, password_confirmation } = req.body
    const { id, token } = req.params
    const user = await UserModel.findById(id)
    const new_secret = user._id + process.env.JWT_SECRET_KEY
    try {
      jwt.verify(token, new_secret)
      if (password && password_confirmation) {
        if (password !== password_confirmation) {
          res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
        } else {
          const salt = await bcrypt.genSalt(10)
          const newHashPassword = await bcrypt.hash(password, salt)
          await UserModel.findByIdAndUpdate(user._id, { $set: { password: newHashPassword } })
          res.send({ "status": "success", "message": "Password Reset Successfully" })
        }
      } else {
        res.send({ "status": "failed", "message": "All Fields are Required" })
      }
    } catch (error) {
      console.log(error)
      res.send({ "status": "failed", "message": "Invalid Token" })
    }
  }
}

export default UserController