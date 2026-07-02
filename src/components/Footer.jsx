import { Link } from 'react-router-dom'
import { useClubData } from '../store/DataContext'

export default function Footer() {
  const { club } = useClubData()
  return (
    <footer className="bg-ink text-[#aab9c9] text-[0.92rem] py-11">
      <div className="mx-auto max-w-[1180px] px-7 flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="font-display text-[#ece6d8] text-[1.05rem] mb-2">{club.name}</div>
          <div>Chartered {club.chartered} · District {club.district} · RI Club ID {club.clubId}</div>
        </div>
        <div className="flex flex-wrap gap-5">
          <Link to="/" className="hover:text-[#ece6d8]">Home</Link>
          <Link to="/leadership" className="hover:text-[#ece6d8]">Leadership</Link>
          <Link to="/board" className="hover:text-[#ece6d8]">Board</Link>
          <Link to="/members" className="hover:text-[#ece6d8]">Members</Link>
          <Link to="/activities" className="hover:text-[#ece6d8]">Fellowship &amp; Projects</Link>
        </div>
      </div>
    </footer>
  )
}
