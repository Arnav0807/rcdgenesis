import mongoose from 'mongoose'
const schema = new mongoose.Schema({ role: String, name: String }, { versionKey: false })
schema.set('toJSON', { virtuals: true, transform: (_, r) => { r.id = r._id; delete r._id; return r } })
export default mongoose.model('Board', schema)
