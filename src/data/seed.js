export const seedClub = {
  name: 'Rotary Club of Delhi Genesis',
  clubId: '225504',
  district: '3011',
  chartered: '19 September 2023',
  charterPresident: 'Mayank Rustagi',
  currentPresident: 'Arnav Arvind',
  sponsorClub: 'Rotary Club of Delhi South East',
  sponsoredClub: 'Rotaract Club of South East',
}

export const seedLeadership = [
  { id:'ly-1', year:'2023 – 24', tag:'Charter Year', president:'Mayank Rustagi', firstLady:'Ridhima Thukral', secretary:'V. Ganesh', dg:'Jeetender Gupta', ag:null, note:"Chartered 19 September 2023 — the club's founding term." },
  { id:'ly-2', year:'2024 – 25', tag:null, president:'Rachit Bakshi', firstLady:'Diksha Gera', secretary:'Rahul Kapoor', dg:'Mahesh Trikha', ag:'Samrat Yadav', note:null },
  { id:'ly-3', year:'2025 – 26', tag:null, president:'Rahul Kapoor', firstLady:'Nupur Kapoor', secretary:'Arnav Arvind', dg:'Ravi Gugnani', ag:'Pragyan Pradip Sharma', note:null },
  { id:'ly-4', year:'2026 – 27', tag:'Current Term', president:'Arnav Arvind', firstLady:null, secretary:'Diksha Gera', dg:'Ajeet Jalan', ag:null, note:null },
]

export const seedBoard = [
  { id:'b-1', role:'President', name:'Arnav Arvind' },
  { id:'b-2', role:'Immediate Past President', name:'Rahul Kapoor' },
  { id:'b-3', role:'Secretary', name:'Diksha Gera' },
  { id:'b-4', role:'President-Elect', name:null },
  { id:'b-5', role:'Treasurer', name:null },
  { id:'b-6', role:'Sergeant-at-Arms', name:null },
  { id:'b-7', role:'Club Service Director', name:null },
  { id:'b-8', role:'Community Service Director', name:null },
  { id:'b-9', role:'International Service Director', name:null },
  { id:'b-10', role:'Membership Chair', name:null },
]

export const seedMembers = [
  { id:'m-1',  firstName:'Arnav',  lastName:'Arvind',      city:'New Delhi, DL', since:'Jul 2023', role:'President' },
  { id:'m-2',  firstName:'Aksh',   lastName:'Bains',       city:'Noida, UP',     since:'Jul 2023', role:'' },
  { id:'m-3',  firstName:'Rachit', lastName:'Bakshi',      city:'New Delhi, DL', since:'Jul 2023', role:'Past President · 2024–25' },
  { id:'m-4',  firstName:'Tushar', lastName:'Chandna',     city:'New Delhi, DL', since:'Oct 2025', role:'' },
  { id:'m-5',  firstName:'Diksha', lastName:'Gera',        city:'New Delhi, DL', since:'May 2025', role:'Secretary' },
  { id:'m-6',  firstName:'Kshitij',lastName:'Grover',      city:'New Delhi, DL', since:'Oct 2025', role:'' },
  { id:'m-7',  firstName:'Nupur',  lastName:'Kapoor',      city:'Gurgaon, HR',   since:'May 2025', role:'First Lady · 2025–26' },
  { id:'m-8',  firstName:'Rahul',  lastName:'Kapoor',      city:'Gurugram, HR',  since:'Oct 2023', role:'Past President · 2025–26' },
  { id:'m-9',  firstName:'Mayank', lastName:'Rustagi',     city:'New Delhi, DL', since:'Jul 2023', role:'Charter President' },
  { id:'m-10', firstName:'Shruti', lastName:'Shivakumar',  city:'New Delhi, DL', since:'Jul 2025', role:'' },
  { id:'m-11', firstName:'Ridhima',lastName:'Thukral',     city:'New Delhi, DL', since:'May 2025', role:'First Lady · 2023–24' },
  { id:'m-12', firstName:'Jai',    lastName:'Verdhan',     city:'Ghaziabad, UP', since:'Dec 2023', role:'' },
  { id:'m-13', firstName:'Akshit', lastName:'Verma',       city:'New Delhi, DL', since:'Jul 2023', role:'' },
  { id:'m-14', firstName:'Puneet', lastName:'Virmani',     city:'Gurgaon, HR',   since:'May 2025', role:'' },
]

export const seedActivities = [
  { id:'a-1', kind:'fellowship', title:'Fellowship Dinner',        when:'Add date', photo:'/images/fellowship-1.jpg', description:'Replace this with a short description — who hosted, where it was held, and what made the evening memorable.' },
  { id:'a-2', kind:'fellowship', title:"Founders' Day Gathering",  when:'Add date', photo:'/images/fellowship-2.jpg', description:'Replace this with a short description of the event, including any guests or traditions worth noting.' },
  { id:'a-3', kind:'assembly',   title:'Club Assembly',            when:'Add date', photo:'/images/assembly-1.jpg',   description:"Replace this with the assembly's agenda, attendance, or key decisions made." },
  { id:'a-4', kind:'assembly',   title:'Mid-Year Review Assembly', when:'Add date', photo:'/images/assembly-2.jpg',   description:"Replace this with a short summary of what was reviewed and what's planned next." },
  { id:'a-5', kind:'project',    title:'Community Service Project', when:'Add date', photo:'/images/project-1.jpg',   description:"Replace this with the project's focus area, location, beneficiaries, and outcomes." },
  { id:'a-6', kind:'project',    title:'Health Camp / Donation Drive', when:'Add date', photo:'/images/project-2.jpg', description:"Replace this with a short description of the cause supported and the club's contribution." },
]

export const seedFocusAreas = [
  { title:'Peacebuilding & Conflict Prevention',  description:'Training community and youth leaders to prevent and mediate conflict, and supporting those displaced by it.', color:'#3e7c7b' },
  { title:'Disease Prevention & Treatment',       description:'Strengthening local health care capacity and helping communities prevent and manage major diseases.',           color:'#c45a4d' },
  { title:'Water, Sanitation & Hygiene',          description:'Helping communities build and maintain sustainable access to clean water and basic sanitation.',               color:'#22405e' },
  { title:'Maternal & Child Health',              description:'Improving access to care that keeps mothers and children healthy before, during, and after birth.',            color:'#e2a33b' },
  { title:'Basic Education & Literacy',           description:"Strengthening communities' ability to provide quality basic education and reduce illiteracy.",                 color:'#172d44' },
  { title:'Community Economic Development',       description:'Creating opportunities for decent work and helping local economies grow sustainably.',                         color:'#c45a4d' },
  { title:'Environment',                          description:'Protecting natural resources and supporting communities adapting to a changing environment.',                  color:'#3e7c7b' },
]

export const seedPresidentMessage = {
  enabled: false,
  showAsPopup: false,
  name: 'Arnav Arvind',
  title: 'President, 2026 – 27',
  message: "Welcome to the Rotary Club of Delhi Genesis. We're a young club with a simple belief — that service, done consistently and with real friendship behind it, is what changes communities. Thank you for visiting, and I hope you'll consider joining us.",
  photo: null,
}
