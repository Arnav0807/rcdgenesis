import mongoose from 'mongoose'
const schema = new mongoose.Schema({
  kind: { type: String, enum: ['fellowship','assembly','project'] },
  title: String, when: String, photo: String, description: String,
}, { versionKey: false })
schema.set('toJSON', { virtuals: true, transform: (_, r) => { r.id = r._id; delete r._id; return r } })
export default mongoose.model('Activity', schema)
