import React, { useState } from "react";
import { HomeIcon, UserGroupIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { Menu, X } from "lucide-react";
import { UserCircle } from "lucide-react";
import { GiMeat } from "react-icons/gi";

const navigation = [
    { name: "Home", href: "#", icon: HomeIcon, current: true },
    { name: "Our Meat", href: "#", icon: GiMeat, current: false },
    { name: "About", href: "#", icon: UserGroupIcon, current: false },
    { name: "Contact", href: "#", icon: PhoneIcon, current: false },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100 ">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <a href="#" className="flex items-center space-x-2">
                            <h1 className="text-3xl font-lobster bg-gradient-to-r from-yellow-400 to-yellow-700 bg-clip-text text-transparent">
                                Jagger's
                            </h1>
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navigation.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className={classNames(
                                    item.current
                                        ? "text-yellow-700"
                                        : "text-black hover:text-yellow-700",
                                    "flex flex-col items-center px-3 py-2 text-sm font-light group transition-colors duration-200"
                                )}
                            >
                                <item.icon
                                    className={classNames(
                                        "h-4 w-4 mb-1 transition-transform duration-200 group-hover:scale-110",
                                        item.current ? "text-yellow-700" : "text-black group-hover:text-yellow-700"
                                    )}
                                />
                                <span className="text-sm font-light">{item.name}</span>
                            </a>
                        ))}
                    </div>

                    {/* Login Button - Desktop */}
                    <div className="hidden md:flex items-center">
                        <a
                            href="#"
                            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-yellow-50 text-black hover:bg-yellow-150 transition-colors duration-200"
                        >
                            <span className="text-sm font-light">Sign in</span>
                            <UserCircle className="w-4 h-4" />
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg text-black hover:bg-yellow-50 transition-colors duration-200"
                        aria-label="Toggle navigation menu"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                    

                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={classNames(
                    "md:hidden fixed inset-x-0 top-20 bg-white/95 backdrop-blur-md transition-transform duration-300 ease-in-out",
                    isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
                )}
                style={{ zIndex: 50 }}
            >

                <div className="p-4 border-t border-gray-100">
                    <div className="flex flex-col space-y-4">
                        {navigation.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className={classNames(
                                    item.current
                                        ? "text-yellow-700 bg-yellow-50"
                                        : "text-gray-700 hover:bg-gray-50",
                                    "flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200"
                                )}
                            >
                                <item.icon className="h-5 w-5" />
                                <span className="text-sm font-light">{item.name}</span>
                            </a>
                        ))}

                        {/* Login Button - Mobile */}
                        <a
                            href="#"
                            className="flex items-center space-x-3 p-3 text-yellow-500 bg-yellow-50 rounded-lg"
                        >
                            <UserCircle className="h-5 w-5" />
                            <span className="text-sm font-light">Sign in</span>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;