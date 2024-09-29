export const Footer: React.FC = () => (
    <footer className="bg-red-800 text-white py-8 sm:py-10">
      <div className="container mx-auto text-center">
        <p className="text-lg">&copy; 2024 TomatoTech. All rights reserved.</p>
        <div className="mt-4 flex justify-center space-x-6">
          {['Privacy Policy', 'Terms of Service', 'Contact Us'].map((item) => (
            <a key={item} href="#" className="hover:text-red-300 transition-colors duration-300">{item}</a>
          ))}
        </div>
      </div>
    </footer>
  )