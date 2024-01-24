import { Inter } from "next/font/google";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

interface NavbarProps {
    className?: string;
    title: string;
}

const Navbar: React.FC<NavbarProps> = ({ title, className }) => {

    return (
        <nav style={inter.style} className={`flex bg-blue-500 items-center justify-between p-4 ${className}`}>
            <div className="flex items-center">
                <h1 className="text-white text-2xl font-bold">{title}</h1>
            </div>
        </nav>
    );
};

export default Navbar;
