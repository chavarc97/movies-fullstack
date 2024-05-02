import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  adult: {
    type: Boolean,
    default: false,
  },
  backdrop_path: {
    type: String,
    default: "",
  },
  genreIds: {
    type: Array,
    required: true,
    ref: "Genre",
  },
  id: {
    type: Number,
  },
  original_language: {
    type: String,
    default: "en",
  },
  original_title: {
    type: String,
    required: [true, "Movie original title is required"],
  },
  overview: {
    type: String,
    required: [true, "Movie overview is required"],
  },
  popularity: {
    type: Number,
    default: 0,
  },
  poster_path: {
    type: String,
    default:
      "https://static.vecteezy.com/system/resources/previews/014/585/760/original/movie-poster-frame-template-with-now-showing-png.png",
  },
  release_date: {
    type: String,
    required: [true, "Movie release date is required"],
  },
  title: {
    type: String,
    required: [true, "Movie title is required"],
  },
  vote_average: {
    type: Number,
    default: 0,
  },
  vote_count: {
    type: Number,
    default: 0,
  },
  users_likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      }
    }
  ],
  users_dislikes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      }
    }
  ],
  addURLPrefix: {
    type: Boolean,
    default: true
  },
}, { timestamps: true });

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
