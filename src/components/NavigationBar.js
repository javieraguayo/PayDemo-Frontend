import { useState } from 'react';
import { Home, CreditCard as CreditCardIcon, History, LogOut, Menu, X } from 'lucide-react';

export default function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Inicio', icon: Home, href: '/' },
    { name: 'Pagar', icon: CreditCardIcon, href: '/pagar' },
    { name: 'Historial', icon: History, href: '/historial' },
  ];

  return (
    <nav className="bg-gray-100 text-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-3 bg-gradient-to-r from-gray-50 to-gray-100 p-2 rounded-lg">
              <div className="relative">
                <CreditCardIcon className="h-8 w-8 text-indigo-600" />
                <div className="absolute -top-1 -right-1 h-2 w-2 bg-indigo-400 rounded-full animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-800">
                  Pay<span className="text-indigo-500">Demo</span>
                </span>
                <span className="text-[10px] font-semibold text-indigo-700 tracking-wider">SECURE PAYMENTS</span>
              </div>
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition duration-150 ease-in-out"
                >
                  <item.icon className="w-5 h-5 mr-2" />
                  {item.name}
                </a>
              ))}
              <button
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition duration-150 ease-in-out"
                onClick={() => console.log('Cerrar sesión')}
              >
                <LogOut className="w-5 h-5 mr-2" />
                Cerrar sesión
              </button>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition duration-150 ease-in-out"
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </a>
          ))}
          <button
            className="w-full flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition duration-150 ease-in-out"
            onClick={() => {
              console.log('Cerrar sesión');
              setIsOpen(false);
            }}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
}
