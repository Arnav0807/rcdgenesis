import mongoose from 'mongoose'
const schema = new mongoose.Schema({
  name: String, clubId: String, district: String, chartered: String,
  charterPresident: String, currentPresident: String,
  sponsorClub: String, sponsoredClub: String,
}, { versionKey: false })
export default mongoose.model('Club', schema)
