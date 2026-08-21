import mongoose from 'mongoose'
const schema = new mongoose.Schema({
  year: String, tag: String, president: String, firstLady: String,
  secretary: String, dg: String, ag: String, note: String,
}, { versionKey: false })
schema.set('toJSON', { virtuals: true, transform: (_, r) => { r.id = r._id; delete r._id; return r } })
export default mongoose.model('Leadership', schema)
