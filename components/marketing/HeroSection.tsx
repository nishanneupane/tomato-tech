import Image from "next/image";

interface HeroSectionProps {
    toggleCamera: () => void;
    tomatoBounce: boolean;
  }
  
  export const HeroSection: React.FC<HeroSectionProps> = ({ toggleCamera, tomatoBounce }) => (
    <section className="text-center mb-16">
      <div className={`transition-transform duration-300 ease-in-out transform ${tomatoBounce ? '-translate-y-2' : 'translate-y-0'}`}>
        <Image src="/tomato.png" alt="Tomato" width={150} height={150} className="mx-auto mb-6" />
      </div>
      <h2 className="text-4xl sm:text-5xl font-bold text-red-800 mb-6">Revolutionize Your Tomato Farming</h2>
      <p className="text-xl sm:text-2xl text-red-700 mb-8 max-w-3xl mx-auto">
        Harness the power of AI to analyze, track, and optimize your tomato crop in real-time.
      </p>
      <button 
        onClick={toggleCamera}
        className="bg-red-600 text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-red-700 transition duration-300 w-full sm:w-auto hover:scale-105 active:scale-95 shadow-lg"
      >
        Scan Your Tomatoes
      </button>
    </section>
  )