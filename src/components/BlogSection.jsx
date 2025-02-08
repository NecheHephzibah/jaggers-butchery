import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Clock, User } from 'lucide-react';

const BlogCard = ({ post, index, inView }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <article 
            className={`group relative bg-white rounded-2xl overflow-hidden transform transition-all duration-700 
                ${inView 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-16'
                }
                hover:shadow-2xl`}
            style={{ transitionDelay: `${index * 200}ms` }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden">
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-6 relative">
                {/* Category Tag */}
                <span className="inline-block px-4 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium mb-4 transform transition-transform duration-300 group-hover:scale-105">
                    {post.category}
                </span>

                <h3 className="text-xl font-semibold mb-3 text-gray-900 transition-colors duration-300 group-hover:text-yellow-700">
                    {post.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.excerpt}
                </p>

                {/* Meta Information */}
                <div className="flex items-center text-sm text-gray-500 space-x-4 mb-4">
                    <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{post.readTime}</span>
                    </div>
                    <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        <span>{post.author}</span>
                    </div>
                </div>

                {/* Read More Link */}
                <div className={`flex items-center text-yellow-700 font-medium transition-all duration-300 
                    ${isHovered ? 'translate-x-2' : 'translate-x-0'}`}>
                    Read More
                    <ArrowRight className={`ml-2 w-4 h-4 transition-all duration-300
                        ${isHovered ? 'translate-x-2' : 'translate-x-0'}`}
                    />
                </div>
            </div>
        </article>
    );
};

const BlogSection = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    const blogPosts = [
        {
            title: "The Art of Dry Aging: Transform Your Meat's Flavor Profile",
            category: "Techniques",
            excerpt: "Discover how the dry aging process enhances meat flavor and tenderness. Learn about the science behind this premium technique and why it's worth the wait.",
            image: "/api/placeholder/800/600", // Replace with actual dry aged meat image
            readTime: "5 min read",
            author: "Chef James Morgan",
            date: "2024-02-08"
        },
        {
            title: "Understanding Premium Cuts: A Guide to Luxury Meats",
            category: "Education",
            excerpt: "From Wagyu to Angus, explore the world's most prestigious meat cuts. Learn what makes each special and how to select the perfect cut for your needs.",
            image: "/api/placeholder/800/600", // Replace with actual premium cuts image
            readTime: "7 min read",
            author: "Hephzibah Onovo",
            date: "2024-02-08"
        },
        {
            title: "Sustainable Butchery: The Future of Meat Processing",
            category: "Industry",
            excerpt: "Explore how modern butcheries are adopting sustainable practices while maintaining quality. Learn about zero-waste approaches and ethical sourcing.",
            image: "/api/placeholder/800/600", // Replace with actual sustainable butchery image
            readTime: "6 min read",
            author: "Hephzibah Onovo",
            date: "2024-02-08"
        }
    ];

    return (
        <section className="py-16 px-8 bg-gray-50 " id="blog">
            <div className="max-w-7xl mx-auto mt-[80px]">
                {/* Section Header */}
                <div className={`text-center mb-12 transform transition-all duration-700
                    ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
                    <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
                        Latest From Our Blog
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Explore our latest articles for expert insights into meat processing, 
                        cooking tips, and industry trends.
                    </p>
                </div>

                {/* Blog Grid */}
                <div 
                    ref={ref}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {blogPosts.map((post, index) => (
                        <BlogCard 
                            key={index} 
                            post={post} 
                            index={index}
                            inView={inView}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogSection;