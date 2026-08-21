import mongoose from 'mongoose'
const schema = new mongoose.Schema({ title: String, description: String, color: String }, { versionKey: false })
export default mongoose.model('FocusArea', schema)
