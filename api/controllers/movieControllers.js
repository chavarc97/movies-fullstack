import Movie from "../models/movieModel.js";
import Genre from "../models/genreModel.js";
import asyncHandler from "express-async-handler";

export const getMovies = asyncHandler(async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let filter = {};

    // Check if 'adult' parameter is provided
    if (req.query.adult) {
      filter.adult = req.query.adult === "true"; // convert boolean to string
    }

    // Check if 'genre' parameter is provided
    if (req.query.genre) {
      filter.genreIds = { $in: [req.query.genre] };
    }

    // Check if 'title' parameter is provided
    if (req.query.title) {
      filter.title = { $regex: new RegExp(req.query.title, "i") }; // Case-insensitive search
    }

    // Check if 'releaseDate' parameter is provided
    if (req.query.release_date) {
      filter.release_date = req.query.release_dat
    }

    // Check if 'genre' parameter is provided
    

    const movies = await Movie.find(filter)
      .limit(limit)
      .skip(startIndex)
      .exec();

    const totalMoviesCount = await Movie.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: movies,
      totalCount: totalMoviesCount,
    });
  } catch (error) {
    next(error);
  }
});

export const getGenres = asyncHandler(async (req, res, next) => {
  try {
    const genres = await Genre.find({}).exec();
    res.status(200).json({
      success: true,
      data: genres,
    });
  } catch (error) {
    next(error);
  }
});
