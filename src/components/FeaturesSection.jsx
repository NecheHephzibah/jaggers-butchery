import React from 'react';
import { GiMeat, GiThermometerScale } from 'react-icons/gi';
import { TbCertificate } from 'react-icons/tb';
import { BeakerIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { DivideIcon } from '@heroicons/react/24/solid';

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

    const testimonials = [
        {
            name: "Damian Okafor",
            image: "/images/happy_customer.jpg",
            quote: "Jagger's Butchery has transformed the way I think about meat. The quality and care they put into their products are unmatched."
        },
        {
            name: "Jide Eze",
            image: "/images/satisfied_client.jpg",
            quote: "I trust Jagger's Butchery for providing safe and nutritious meat for my family. Their innovative approach is commendable."
        },
        {
            name: "Nifemi Adebayo",
            image: "/images/satisfied_client.jpg",
            quote: "I trust Jagger's Butchery for providing safe and nutritious meat for my family. Their innovative approach is commendable."
        }
    ];

{/* <article className="flex items-center justify-center px-6 lg:px-8">
<section className="text-center max-w-3xl space-y-6"> */}

    return (
        <section className="py-16 px-16 bg-gray-50 text-center justify-center space-y-6">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">
                    The Jagger's Difference
                </h2>
                <div className="grid grid-cols-1 gap-8">
                    {/* Top row - 3 cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        {features.slice(0, 3).map((feature, index) => (
                            <FeatureCard
                                key={index}
                                icon={() => <feature.icon className="text-yellow-700 w-8 h-8" />}
                                title={feature.title}
                                description={feature.description}
                            />
                        ))}
                    </div>
                    
                    {/* Bottom row - 2 cards with centering wrapper */}
                    <div className="flex justify-center w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-2/3">
                            {features.slice(3, 5).map((feature, index) => (
                                <FeatureCard
                                    key={index + 3}
                                    icon={() => <feature.icon className="text-yellow-700 w-8 h-8" />}
                                    title={feature.title}
                                    description={feature.description}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>


            <div className=" pt-10">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-900">
                        What Our Customers Say
                    </h2>
                </div>
                
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-7 max-w-6xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <li key={index} className="bg-gray-100 p-6 rounded-lg shadow-lg transform transition-transform duration-500 ease-in-out hover:scale-105">
                            <figure>
                                <img 
                                    src={testimonial.image} 
                                    alt={testimonial.name} 
                                    className="w-16 h-16 rounded-full mx-auto mb-4" 
                                />
                                <blockquote className="text-lg text-gray-600 italic">
                                    "{testimonial.quote}"
                                </blockquote>
                                <figcaption className="text-gray-900 mt-4 font-bold">
                                    - {testimonial.name}
                                </figcaption>
                            </figure>
                        </li>
                    ))}
                </ul>
                
                <div className="mt-12 text-center">
                    <nav>
                        <a 
                            href="/contact" 
                            className="inline-block px-8 py-3 bg-orange-500 text-white text-lg font-semibold rounded hover:bg-orange-700 transition-colors duration-300"
                        >
                            Contact Us
                        </a>
                    </nav>
                </div>
            </div>
        </section >

    );
};

export default FeaturesSection;