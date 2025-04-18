'use client'

import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
        const res = await fetch('/api/logout')
        console.log(res);
        
        if (res.ok) {
          router.push('/auth/login')
        } else {
          console.error('Logout failed')
          alert('Logout failed')
        }
    } catch (error) {
      console.error("Logout failed", error)        
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
    >
      Logout
    </button>
  )
}
