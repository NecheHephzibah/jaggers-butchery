import React from "react";

const About = () => {
    return (
        <main className="bg-white py-16 overflow-hidden" id="about">
            <article className="flex items-center justify-center px-6 lg:px-8">
                <section className="text-center max-w-3xl space-y-8">
                    <h1 
                        className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-wide text-gray-900"
                        // font-['Playfair_Display'] italic animate-[fadeIn_1s_ease-in]"
                        // style={{
                        //     opacity: 0,
                        //     animation: 'fadeIn 1s ease-in forwards',
                        //     fontFamily: "'Playfair Display', serif"
                        // }}
                    >
                        Finest Butchery
                    </h1>
                    
                    <p 
                        className="text-sm md:text-base leading-relaxed text-gray-600"
                        style={{
                            opacity: 0,
                            animation: 'fadeInUp 0.8s ease-out forwards',
                            animationDelay: '0.2s'
                        }}
                    >
                        At Jagger's Butchery, we're not just another meat shop – we're pioneering a new era in Nigeria's meat industry.
                    </p>
                    
                    <p 
                        className="text-sm md:text-base leading-relaxed text-gray-600"
                        style={{
                            opacity: 0,
                            animation: 'fadeInUp 0.8s ease-out forwards',
                            animationDelay: '0.4s'
                        }}
                    >
                        In a market where traditional butchering practices often fall short of modern health standards, 
                        we're introducing a revolutionary approach. Our state-of-the-art facility ensures that every 
                        piece of meat you receive is handled with the utmost care and precision.
                    </p>
                    
                    <p 
                        className="text-sm md:text-base leading-relaxed text-gray-600"
                        style={{
                            opacity: 0,
                            animation: 'fadeInUp 0.8s ease-out forwards',
                            animationDelay: '0.6s'
                        }}
                    >
                        Through our advanced lyophilization process, we preserve 100% of the nutrients present at the 
                        time of processing, delivering meat that's not just safe, but exceptionally nutritious.
                    </p>
                    
                    <p 
                        className="text-sm md:text-base leading-relaxed text-gray-600"
                        style={{
                            opacity: 0,
                            animation: 'fadeInUp 0.8s ease-out forwards',
                            animationDelay: '0.8s'
                        }}
                    >
                        We believe every Nigerian deserves access to high-quality, safe meat products. Our efficient 
                        processes allow us to offer premium standards at prices accessible to the everyday consumer.
                    </p>
                </section>
            </article>

            <style jsx global>{`
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