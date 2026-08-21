import { Link } from 'react-router-dom'
import { useClubData } from '../store/DataContext'
export default function Footer() {
  const { club } = useClubData()
  return (
    <footer className="bg-ink text-[#aab9c9] text-[0.9rem] py-10">
      <div className="mx-auto max-w-[1280px] px-5 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img src="/logos/club-logo.png" alt="" className="h-20 w-auto object-contain opacity-80"/>
          <div>
            <div className="font-display text-[#ece6d8] text-[1rem] mb-0.5">{club.name}</div>
            <div className="text-[0.8rem]">Chartered {club.chartered} · District {club.district} · RI Club ID {club.clubId}</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-5">
          {[['/',  'Home'],['/leadership','Leadership'],['/board','Board'],['/members','Members'],['/activities','Fellowship & Projects']].map(([to,l])=>(
            <Link key={to} to={to} className="hover:text-[#ece6d8] transition-colors">{l}</Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
