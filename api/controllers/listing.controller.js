import Listing from "../models/listing.model.js";
import { errorHandler } from '../utils/error.js';
export const createListing = async (req, res, next) => {
  try {
     const listing = await Listing.create(req.body);
     return res.status(201).json(listing);//send back the created listing
       
  } catch (error) {
    next(error);
  }
};
export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only delete your own listings!'));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('Listing has been deleted!');
  } catch (error) {
    next(error);
  }
};
export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only update your own listings!'));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};
export const getListing = async (req, res, next) => {
try {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }
  res.status(200).json(listing);
} catch (error) {
  next(error);
  }
};
export const getListings = async (req, res, next) => {
  try {
    // Get limit from query, default to 9 if not provided
    const limit = parseInt(req.query.limit) || 9;

    // Get starting index for pagination, default to 0
    const startIndex = parseInt(req.query.startIndex) || 0;

    // Get 'offer' filter from query
    let offer = req.query.offer;

    // If 'offer' is not given or 'false', include both true & false (no filter)
    if (offer === undefined || offer === 'false') {
      offer = { $in: [false, true] };
    }

    // Get 'furnished' filter from query
    let furnished = req.query.furnished;

    // If 'furnished' is not given or 'false', include both true & false
    if (furnished === undefined || furnished === 'false') {
      furnished = { $in: [false, true] };
    }

    // Get 'parking' filter from query
    let parking = req.query.parking;

    // If 'parking' is not given or 'false', include both true & false
    if (parking === undefined || parking === 'false') {
      parking = { $in: [false, true] };
    }

    // Get 'type' filter (sale/rent) from query
    let type = req.query.type;

    // If 'type' is not given or 'all', include both 'sale' and 'rent'
    if (type === undefined || type === 'all') {
      type = { $in: ['sale', 'rent'] };
    }

    // Get search term from query, default to empty string
    const searchTerm = req.query.searchTerm || '';

    // Get sort field, default to 'createdAt'
    const sort = req.query.sort || 'createdAt';

    // Get sort order, default to 'desc'
    const order = req.query.order || 'desc';

    // Query DB for listings matching filters
    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: 'i' }, // case-insensitive name match
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order }) // sort by given field and order
      .limit(limit) // limit results
      .skip(startIndex); // skip for pagination

    // Send back listings
    return res.status(200).json(listings);
  } catch (error) {
    next(error); // Pass error to error handler
  }
};
