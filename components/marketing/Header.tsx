export const Header: React.FC = () => (
    <header className="bg-white shadow-md text-red-800 p-4 sticky top-0 z-50">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-0">TomatoTech</h1>
        <nav className="w-full sm:w-auto">
          <ul className="flex justify-center sm:justify-end space-x-6">
            {['Home', 'About', 'Contact'].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-red-600 transition-colors duration-300">{item}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )