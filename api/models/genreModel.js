import mongoose from 'mongoose'

const genreSchema = new mongoose.Schema({
  genre_id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

const Genre = mongoose.model('Genre', genreSchema)

export default Genre