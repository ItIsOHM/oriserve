import { Heart } from 'lucide-react'
import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NPM Clone',
  description: 'A clone of the npmjs website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <Heart className='w-5 h-5 fill-black hover:fill-slate-600'/>
              <nav>
                <ul className="flex space-x-4 text-sm">
                  <li><Link href="/" className="text-gray-600 font-bold hover:text-black">Pro</Link></li>
                  <li><Link href="/" className="text-gray-600 font-bold hover:text-black">Teams</Link></li>
                  <li><Link href="/" className="text-gray-600 font-bold hover:text-black">Pricing</Link></li>
                  <li><Link href="/" className="text-gray-600 font-bold hover:text-black">Documentation</Link></li>
                </ul>
              </nav>
            </div>
            
          </div>
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}