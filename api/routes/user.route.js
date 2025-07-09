import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { deleteUser, test, updateUser,  getUserListings, getUser} from '../controllers/user.controller.js' ;

const router = express.Router();

router.get('/test',test);
router.post('/update/:id', verifyToken, updateUser)//will call verifyToken middleware first and if next() is called,  updateUser also
router.delete('/delete/:id', verifyToken, deleteUser)//will call verifyToken middleware first and if next() is called,  updateUser also
router.get('/listings/:id', verifyToken, getUserListings)
router.get('/:id', verifyToken, getUser) // get user by id , verifyToken and then getUser to get user data for contact component in Listing.jsx

export default router;