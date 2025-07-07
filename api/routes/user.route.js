import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { deleteUser, test, updateUser,  getUserListings} from '../controllers/user.controller.js' ;

const router = express.Router();

router.get('/test',test);
router.post('/update/:id', verifyToken, updateUser)//will call verifyToken middleware first and if next() is called,  updateUser also
router.delete('/delete/:id', verifyToken, deleteUser)//will call verifyToken middleware first and if next() is called,  updateUser also
router.get('/listings/:id', verifyToken, getUserListings)

export default router;