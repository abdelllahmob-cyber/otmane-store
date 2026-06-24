import { Link } from 'react-router-dom'
import { useState } from 'react'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-gradient-to-l from-blue-600 to-blue-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 md:w-8 md:h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-lg md:text-2xl font-bold">متجر الدراجات</h1>
              <p className="text-xs text-blue-200 hidden md:block">أفضل الدراجات بأسعار منافسة</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="hover:text-yellow-300 transition-colors font-medium">
              الرئيسية
            </Link>
            <a href="#products" className="hover:text-yellow-300 transition-colors font-medium">
              المنتجات
            </a>
            <a href="#about" className="hover:text-yellow-300 transition-colors font-medium">
              من نحن
            </a>
            <a href="#contact" className="hover:text-yellow-300 transition-colors font-medium">
              اتصل بنا
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 animate-fadeIn">
            <div className="flex flex-col gap-3">
              <Link 
                to="/" 
                className="hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                الرئيسية
              </Link>
              <a 
                href="#products" 
                className="hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                المنتجات
              </a>
              <a 
                href="#about" 
                className="hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                من نحن
              </a>
              <a 
                href="#contact" 
                className="hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                اتصل بنا
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
