import mongoose from 'mongoose'
const schema = new mongoose.Schema({
  firstName: String, lastName: String, city: String,
  since: String, role: String, photo: String,
}, { versionKey: false })
schema.set('toJSON', { virtuals: true, transform: (_, r) => { r.id = r._id; delete r._id; return r } })
export default mongoose.model('Member', schema)
