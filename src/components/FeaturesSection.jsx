import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { GiMeat, GiThermometerScale } from 'react-icons/gi';
import { TbCertificate } from 'react-icons/tb';
import { BeakerIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { DivideIcon } from '@heroicons/react/24/solid';

const FeatureCard = ({ icon: Icon, title, description, index, inView }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className={`bg-white p-6 rounded-xl transform transition-all duration-700
                ${inView 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-16'
                }
                hover:shadow-2xl hover:-translate-y-2 group`}
            style={{ 
                transitionDelay: `${index * 150}ms`,
                boxShadow: isHovered ? '0 25px 50px -12px rgba(0, 0, 0, 0.15)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex flex-col items-center text-center">
                <div className={`w-12 h-12 mb-4 transition-all duration-500 transform
                    ${isHovered ? 'scale-110 rotate-6' : 'scale-100 rotate-0'}
                `}>
                    {React.createElement(Icon, { 
                        className: `w-full h-full transition-colors duration-300 
                            ${isHovered ? 'text-yellow-600' : 'text-yellow-700'}`
                    })}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 transition-all duration-300 group-hover:text-yellow-700">
                    {title}
                </h3>
                <p className="text-gray-600 transition-all duration-300 group-hover:text-gray-800">
                    {description}
                </p>
            </div>
        </div>
    );
};

const FeaturesSection = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

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
        <section 
            className="py-16 px-16 bg-gray-50 text-center justify-center space-y-6 overflow-hidden" 
            id='features'
            ref={ref}
        >
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 gap-8">
                    {/* Top row - 3 cards */}
                    <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 transition-all duration-1000 transform
                        ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`}
                    >
                        {features.slice(0, 3).map((feature, index) => (
                            <FeatureCard
                                key={index}
                                icon={() => <feature.icon className="text-yellow-700 w-8 h-8" />}
                                title={feature.title}
                                description={feature.description}
                                index={index}
                                inView={inView}
                            />
                        ))}
                    </div>
                    
                    {/* Bottom row - 2 cards with centering wrapper */}
                    <div className={`flex justify-center w-full transition-all duration-1000 transform
                        ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-2/3">
                            {features.slice(3, 5).map((feature, index) => (
                                <FeatureCard
                                    key={index + 3}
                                    icon={() => <feature.icon className="text-yellow-700 w-8 h-8" />}
                                    title={feature.title}
                                    description={feature.description}
                                    index={index + 3}
                                    inView={inView}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;