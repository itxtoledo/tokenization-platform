import { Outlet } from '@tanstack/react-router'
import Header from './Header'
import Footer from './Footer'
import BottomNav from './BottomNav'

export default function Layout() {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-160px)] mb-16 md:mb-0">
        <Outlet />
      </div>
      <Footer />
      <BottomNav />
    </>
  )
}
