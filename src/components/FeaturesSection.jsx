import React from 'react';
import { GiMeat, GiThermometerScale } from 'react-icons/gi';
import { TbCertificate } from 'react-icons/tb';
import { BeakerIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col items-center text-center">
        <div className="w-12 h-12 text-blue-600 mb-4">
          {React.createElement(Icon, { className: "w-full h-full" })}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: BeakerIcon,
      title: "Sterile Environment",
      description: "State-of-the-art facility maintained under strict sterile conditions to ensure the highest standards of cleanliness"
    },
    {
      icon: GiThermometerScale,
      title: "Advanced Preservation",
      description: "Cutting-edge lyophilization technology that preserves 100% of meat nutrients and extends shelf life"
    },
    {
      icon: ShieldCheckIcon,
      title: "Strict Hygiene Protocols",
      description: "Comprehensive hygiene protocols enforced at every step of the meat processing journey"
    },
    {
      icon: TbCertificate,
      title: "Professional Expertise",
      description: "Skilled butchers trained in modern meat processing techniques and safety standards"
    },
    {
      icon: GiMeat,
      title: "Quality Processing",
      description: "Premium meat processing with careful attention to cut quality and portion consistency"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          The Jagger's Difference
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;