import React from "react";

const About = ({ showAsSection = "true" }) => {
    return (
        <main 
            className={`bg-white ${showAsSection ? 'py-16' : 'pt-24 pb-16'} overflow-hidden`} 
            id="about"
        >
            <article className="flex items-center justify-center px-6 lg:px-8">
                <section className="text-center max-w-3xl space-y-8">
                    <h1 
                        className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-wide text-gray-900"
                        style={{
                            opacity: 0,
                            animation: 'fadeIn 1s ease-in forwards'
                        }}
                    >
                        Finest Butchery
                    </h1>
                    
                    {[
                        "At Jagger's Butchery, we're not just another meat shop – we're pioneering a new era in Nigeria's meat industry.",
                        "In a market where traditional butchering practices often fall short of modern health standards, we're introducing a revolutionary approach. Our state-of-the-art facility ensures that every piece of meat you receive is handled with the utmost care and precision.",
                        "Through our advanced lyophilization process, we preserve 100% of the nutrients present at the time of processing, delivering meat that's not just safe, but exceptionally nutritious.",
                        "We believe every Nigerian deserves access to high-quality, safe meat products. Our efficient processes allow us to offer premium standards at prices accessible to the everyday consumer."
                    ].map((text, index) => (
                        <p 
                            key={index}
                            className="text-sm md:text-base leading-relaxed text-gray-600"
                            style={{
                                opacity: 0,
                                animation: 'fadeInUp 0.8s ease-out forwards',
                                animationDelay: `${0.2 * (index + 1)}s`
                            }}
                        >
                            {text}
                        </p>
                    ))}
                </section>
            </article>

            <style jsx="true" global="true">{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </main>
    );
};

export default About;