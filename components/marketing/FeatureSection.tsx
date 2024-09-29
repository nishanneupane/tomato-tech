import { BarChart, Camera, Leaf } from "lucide-react";

export const FeaturesSection: React.FC = () => (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
        {[
            { icon: Leaf, title: "Tomato Analysis", description: "Get instant, AI-powered insights into your tomato plant's health." },
            { icon: Camera, title: "Easy Scanning", description: "Use your smartphone to capture and analyze tomato images in seconds." },
            { icon: BarChart, title: "Tomato Reports", description: "Receive comprehensive reports on tomato health with actionable recommendations." }
        ].map(({ icon: Icon, title, description }) => (
            <div key={title} className="bg-white p-8 rounded-xl shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
                <Icon className="w-16 h-16 sm:w-20 sm:h-20 text-red-600 mb-6 mx-auto" />
                <h3 className="text-xl sm:text-2xl font-semibold text-red-800 mb-4">{title}</h3>
                <p className="text-red-700 text-lg">{description}</p>
            </div>
        ))}
    </section>
)