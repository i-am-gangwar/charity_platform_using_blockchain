import express from 'express';
const router = express.Router();
import UserController from '../controllers/userController.js';
import checkUserAuth from '../middlewares/auth-middleware.js';

// ROute Level Middleware - To Protect Route
router.use('/changepassword', checkUserAuth)
router.use('/loggeduser', checkUserAuth)
router.use('/userprojects', checkUserAuth)


// Public Routes
router.post('/register', UserController.userRegistration)
router.post('/login', UserController.userLogin)
router.post('/createblog', UserController.userBlogform)
router.post('/alltxn', UserController.alltxnssave)
router.post('/send-reset-password-email', UserController.sendUserPasswordResetEmail)
router.post('/reset-password/:id/:token', UserController.userPasswordReset)

// Protected Routes
router.post('/changepassword', UserController.changeUserPassword)
router.post('/totalfundraised', UserController.totalfundraised)
router.get('/loggeduser', UserController.loggedUser)
router.get('/userprojects', UserController.loggedUserProjects)
router.get('/allblogs', UserController.loggedAllUserProjects)
router.get('/alltxnsinfo', UserController.alltxnsinfo)

export default router