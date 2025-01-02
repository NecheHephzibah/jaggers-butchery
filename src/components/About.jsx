import React from "react";

const About = () => {
    return (
        <main className="bg-white py-16">
            <article className="flex items-center justify-center px-6 lg:px-8">
                <section className="text-center max-w-3xl space-y-6">
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl animate-fade-in">
                        Butchery At Its Finest
                    </h1>
                    <p className="text-lg leading-relaxed text-gray-600 sm:text-xl animate-fade-in [animation-delay:200ms]">
                        At Jagger's Butchery, we're not just another meat shop – we're pioneering a new era in Nigeria's meat industry.
                    </p>
                    <p className="text-lg leading-relaxed text-gray-600 sm:text-xl animate-fade-in [animation-delay:400ms]">
                        In a market where traditional butchering practices often fall short of modern health standards, we're introducing a revolutionary approach. Our state-of-the-art facility ensures that every piece of meat you receive is handled with the utmost care and precision.
                    </p>
                    <p className="text-lg leading-relaxed text-gray-600 sm:text-xl animate-fade-in [animation-delay:600ms]">
                        Through our advanced lyophilization process, we preserve 100% of the nutrients present at the time of processing, delivering meat that's not just safe, but exceptionally nutritious.
                    </p>
                    <p className="text-lg leading-relaxed text-gray-600 sm:text-xl animate-fade-in [animation-delay:800ms]">
                        We believe every Nigerian deserves access to high-quality, safe meat products. Our efficient processes allow us to offer premium standards at prices accessible to the everyday consumer.
                    </p>
                </section>
            </article>
        </main>
    );
};

export default About;