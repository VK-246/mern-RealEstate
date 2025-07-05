import express from 'express';
import { test, updateUser,deleteUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.get('/test',test);
router.post('/update/:id', verifyToken, updateUser)//will call verifyToken middleware first and if next() is called,  updateUser also
router.delete('/delete/:id', verifyToken, deleteUser)//will call verifyToken middleware first and if next() is called,  updateUser also


export default router;