import Club from './models/Club.js'
import Leadership from './models/Leadership.js'
import Board from './models/Board.js'
import Member from './models/Member.js'
import Activity from './models/Activity.js'
import FocusArea from './models/FocusArea.js'
import PresidentMessage from './models/PresidentMessage.js'

export default async function seed() {
  if (!await Club.findOne()) {
    await Club.create({ name:'Rotary Club of Delhi Genesis', clubId:'225504', district:'3011', chartered:'19 September 2023', charterPresident:'Mayank Rustagi', currentPresident:'Arnav Arvind', sponsorClub:'Rotary Club of Delhi South East', sponsoredClub:'Rotaract Club of South East' })
    console.log('✓ Club seeded')
  }
  if (!await Leadership.findOne()) {
    await Leadership.insertMany([
      { year:'2023 – 24', tag:'Charter Year', president:'Mayank Rustagi', firstLady:'Ridhima Thukral', secretary:'V. Ganesh', dg:'Jeetender Gupta', ag:null, note:"Chartered 19 September 2023 — the club's founding term." },
      { year:'2024 – 25', tag:null, president:'Rachit Bakshi', firstLady:'Diksha Gera', secretary:'Rahul Kapoor', dg:'Mahesh Trikha', ag:'Samrat Yadav', note:null },
      { year:'2025 – 26', tag:null, president:'Rahul Kapoor', firstLady:'Nupur Kapoor', secretary:'Arnav Arvind', dg:'Ravi Gugnani', ag:'Pragyan Pradip Sharma', note:null },
      { year:'2026 – 27', tag:'Current Term', president:'Arnav Arvind', firstLady:null, secretary:'Diksha Gera', dg:'Ajeet Jalan', ag:null, note:null },
    ])
    console.log('✓ Leadership seeded')
  }
  if (!await Board.findOne()) {
    await Board.insertMany([
      { role:'President', name:'Arnav Arvind' },
      { role:'Immediate Past President', name:'Rahul Kapoor' },
      { role:'Secretary', name:'Diksha Gera' },
      { role:'President-Elect', name:null },
      { role:'Treasurer', name:null },
      { role:'Sergeant-at-Arms', name:null },
      { role:'Club Service Director', name:null },
      { role:'Community Service Director', name:null },
      { role:'International Service Director', name:null },
      { role:'Membership Chair', name:null },
    ])
    console.log('✓ Board seeded')
  }
  if (!await Member.findOne()) {
    await Member.insertMany([
      { firstName:'Arnav',  lastName:'Arvind',     city:'New Delhi, DL', since:'Jul 2023', role:'President',               photo:null },
      { firstName:'Aksh',   lastName:'Bains',      city:'Noida, UP',     since:'Jul 2023', role:'',                        photo:null },
      { firstName:'Rachit', lastName:'Bakshi',     city:'New Delhi, DL', since:'Jul 2023', role:'Past President · 2024–25', photo:null },
      { firstName:'Tushar', lastName:'Chandna',    city:'New Delhi, DL', since:'Oct 2025', role:'',                        photo:null },
      { firstName:'Diksha', lastName:'Gera',       city:'New Delhi, DL', since:'May 2025', role:'Secretary',               photo:null },
      { firstName:'Kshitij',lastName:'Grover',     city:'New Delhi, DL', since:'Oct 2025', role:'',                        photo:null },
      { firstName:'Nupur',  lastName:'Kapoor',     city:'Gurgaon, HR',   since:'May 2025', role:'First Lady · 2025–26',    photo:null },
      { firstName:'Rahul',  lastName:'Kapoor',     city:'Gurugram, HR',  since:'Oct 2023', role:'Past President · 2025–26', photo:null },
      { firstName:'Mayank', lastName:'Rustagi',    city:'New Delhi, DL', since:'Jul 2023', role:'Charter President',       photo:null },
      { firstName:'Shruti', lastName:'Shivakumar', city:'New Delhi, DL', since:'Jul 2025', role:'',                        photo:null },
      { firstName:'Ridhima',lastName:'Thukral',    city:'New Delhi, DL', since:'May 2025', role:'First Lady · 2023–24',    photo:null },
      { firstName:'Jai',    lastName:'Verdhan',    city:'Ghaziabad, UP', since:'Dec 2023', role:'',                        photo:null },
      { firstName:'Akshit', lastName:'Verma',      city:'New Delhi, DL', since:'Jul 2023', role:'',                        photo:null },
      { firstName:'Puneet', lastName:'Virmani',    city:'Gurgaon, HR',   since:'May 2025', role:'',                        photo:null },
    ])
    console.log('✓ Members seeded')
  }
  if (!await Activity.findOne()) {
    await Activity.insertMany([
      { kind:'fellowship', title:'Fellowship Dinner',            when:'Add date', photo:'/images/fellowship-1.jpg', description:'Replace with who hosted, where, and what made the evening memorable.' },
      { kind:'fellowship', title:"Founders' Day Gathering",      when:'Add date', photo:'/images/fellowship-2.jpg', description:'Replace with a short description including any guests or traditions.' },
      { kind:'assembly',   title:'Club Assembly',                when:'Add date', photo:'/images/assembly-1.jpg',   description:"Replace with the assembly's agenda, attendance, or key decisions." },
      { kind:'assembly',   title:'Mid-Year Review Assembly',     when:'Add date', photo:'/images/assembly-2.jpg',   description:"Replace with what was reviewed and what's planned next." },
      { kind:'project',    title:'Community Service Project',    when:'Add date', photo:'/images/project-1.jpg',   description:"Replace with focus area, location, beneficiaries, and outcomes." },
      { kind:'project',    title:'Health Camp / Donation Drive', when:'Add date', photo:'/images/project-2.jpg',   description:"Replace with the cause supported and the club's contribution." },
    ])
    console.log('✓ Activities seeded')
  }
  if (!await FocusArea.findOne()) {
    await FocusArea.insertMany([
      { title:'Peacebuilding & Conflict Prevention',  description:'Training community and youth leaders to prevent and mediate conflict.',        color:'#3e7c7b' },
      { title:'Disease Prevention & Treatment',       description:'Strengthening local health care capacity and helping communities.',            color:'#c45a4d' },
      { title:'Water, Sanitation & Hygiene',          description:'Helping communities build sustainable access to clean water and sanitation.',  color:'#22405e' },
      { title:'Maternal & Child Health',              description:'Improving access to care that keeps mothers and children healthy.',             color:'#e2a33b' },
      { title:'Basic Education & Literacy',           description:"Strengthening communities' ability to provide quality basic education.",       color:'#172d44' },
      { title:'Community Economic Development',       description:'Creating opportunities for decent work and helping local economies grow.',     color:'#c45a4d' },
      { title:'Environment',                          description:'Protecting natural resources and supporting communities adapt to change.',     color:'#3e7c7b' },
    ])
    console.log('✓ Focus areas seeded')
  }
  if (!await PresidentMessage.findOne()) {
    await PresidentMessage.create({ enabled:false, showAsPopup:false, name:'Arnav Arvind', title:'President, 2026 – 27', message:"Welcome to the Rotary Club of Delhi Genesis. We're a young club with a simple belief — that service, done consistently and with real friendship behind it, is what changes communities. Thank you for visiting, and I hope you'll consider joining us.", photo:null })
    console.log('✓ President message seeded')
  }
}
