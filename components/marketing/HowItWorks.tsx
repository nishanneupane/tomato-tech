import { ChevronDown } from "lucide-react";

interface HowItWorksSectionProps {
    activeSection: string | null;
    toggleSection: (section: string) => void;
  }
  
  export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ activeSection, toggleSection }) => (
    <section className="bg-white p-8 sm:p-10 rounded-xl shadow-xl mb-16">
      <h2 className="text-3xl sm:text-4xl font-bold text-red-800 mb-8">How TomatoTech Works</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10">
        {['Scan Tomatoes', 'AI Analysis', 'Tomato Insights'].map((step, index) => (
          <div key={step} className="text-center">
            <div 
              className="bg-red-100 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-6 transition-transform duration-500 ease-in-out hover:rotate-360 cursor-pointer"
              onClick={() => toggleSection(step)}
            >
              <span className="text-2xl sm:text-3xl font-bold text-red-600">{index + 1}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-red-800 mb-4">{step}</h3>
            <div className={`overflow-hidden transition-max-height duration-300 ease-in-out ${activeSection === step ? 'max-h-48' : 'max-h-0'}`}>
              <p className="text-red-700 text-lg mb-4">
                {index === 0 && "Use your phone camera to capture clear images of your tomatoes or upload existing photos for instant analysis."}
                {index === 1 && "Our advanced AI model analyzes the tomato images for health issues and growth status."}
                {index === 2 && "Receive detailed reports and actionable recommendations to optimize your tomato crops."}
              </p>
            </div>
            <button 
              onClick={() => toggleSection(step)}
              className="text-red-600 hover:text-red-700 transition-colors duration-300 flex items-center justify-center mx-auto"
            >
              {activeSection === step ? 'Show Less' : 'Learn More'}
              <ChevronDown className={`ml-1 transform transition-transform duration-300 ${activeSection === step ? 'rotate-180' : ''}`} />
            </button>
          </div>
        ))}
      </div>
    </section>
  )