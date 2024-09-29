interface CallToActionSectionProps {
    toggleCamera: () => void;
  }
  
 export const CallToActionSection: React.FC<CallToActionSectionProps> = ({ toggleCamera }) => (
    <section className="text-center mb-16">
      <h2 className="text-3xl sm:text-4xl font-bold text-red-800 mb-6">Ready to Revolutionize Your Tomato Farming?</h2>
      <p className="text-xl sm:text-2xl text-red-700 mb-8 max-w-3xl mx-auto">
        Join thousands of tomato farmers using TomatoTech to ensure bountiful harvests and healthier crops.
      </p>
      <button 
        onClick={toggleCamera}
        className="bg-red-600 text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-red-700 transition duration-300 w-full sm:w-auto hover:scale-105 active:scale-95 shadow-lg"
      >
        Start Analyzing Your Tomatoes
      </button>
    </section>
  )