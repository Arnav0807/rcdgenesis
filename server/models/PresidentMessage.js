import mongoose from 'mongoose'
const schema = new mongoose.Schema({
  enabled: Boolean, showAsPopup: Boolean,
  name: String, title: String, message: String, photo: String,
}, { versionKey: false })
export default mongoose.model('PresidentMessage', schema)
