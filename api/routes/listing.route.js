import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createListing, deleteListing, updateListing, getListing, getListings } from '../controllers/listing.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id', verifyToken, updateListing);
router.get('/get/:id', getListing);
router.get('/get', getListings); // This route can be used to get all listings or filter them based on query parameters for search functionality

export default router;
