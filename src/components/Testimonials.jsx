import React from "react";


const Testimonials = () => {
    const testimonials = [
        {
            name: "Damian Okafor, Restaurant Owner",
            image: "./src/assets/img0.jpg",
            quote: "Jagger's Butchery has transformed the way I think about meat. The quality and care they put into their products are unmatched."
        },
        {
            name: "Jide Eze, Family Customer",
            image: "./src/assets/img7.jpg",
            quote: "I trust Jagger's Butchery for providing safe and nutritious meat for my family. Their innovative approach is commendable."
        },
        {
            name: "Nifemi Adebayo",
            image: "./src/assets/img9.jpg",
            quote: "The attention to detail at Jagger's is exceptional. Every cut of meat I've purchased has been perfectly trimmed and incredibly fresh."
        },
        {
            name: "Chef Jenny N.",
            image: "./src/assets/img10.jpg",
            quote: "Finally, a butcher that understands premium quality! I've been importing meat for years, but Jagger's local products match or exceed international standards."
        },
        {
            name: "Dr. Fabian Y., Food Safety Consultant",
            image: "./src/assets/img12.jpg",
            quote: "You can actually see their state-of-the-art facility through the viewing window, and their staff is always ready to explain their unique preservation techniques."
        },
    
        {
            name: "Wonder Amah",
            image: "./src/assets/img11.jpg",
            quote: "The meat quality is consistently excellent. "
        }
    ];

    return (
        <section className="py-16 px-16 bg-gray-50 text-center justify-center space-y-6">
            <div className=" pt-10">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-medium text-gray-900">
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
                                <blockquote className="text-sm text-gray-600 italic">
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
                            className="inline-block px-8 py-3 bg-yellow-700 text-white text-lg font-semibold rounded hover:bg-yellow-900 transition-colors duration-300"
                        >
                            Contact Us
                        </a>
                    </nav>
                </div>
            </div>
        </section>
    )
};

export default Testimonials;

