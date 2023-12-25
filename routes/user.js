import {Router} from 'express';
import {login,logout,register,getMyProfile} from '../controller/userController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = Router();

router.post('/login',login);

router.get('/logout',logout);

router.post('/register',register);

router.get('/myprofile',isAuthenticated,getMyProfile);

export default router;