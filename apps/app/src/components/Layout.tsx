import { Outlet } from '@tanstack/react-router'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-160px)]">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
