"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { FaNotesMedical } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";
import { IconContext } from "react-icons/lib";
import { usePathname } from 'next/navigation'


const StartConsultationNavbar = () => {
    const pathname = usePathname()

    return (
        <div className="border-b-2 sm:border-b-0 h-16 bg-white px-10 flex items-center">
            <Image src={"/logoText.png"} width={48} height={48} alt="Logo" />
            <div className="border-b-2 sm:border-b-0 h-16 bg-white px-10 flex items-center ml-auto flex gap-4">
                <Link
                    href={"/patient"}
                    className="ml-4 hover:scale-105 transition-all flex gap-2 hover:bg-gray-100 rounded-full p-2"
                >
                    {/* Consultation */}
                    <IconContext.Provider value={{ color: pathname === '/patient' ? "black" : "gray", className: "w-5 h-5" }}>
                        <div>
                            <FaUserDoctor />
                        </div>
                    </IconContext.Provider>
                </Link>
                <Link
                    href={"/patient/registers"}
                    className="ml-4 hover:scale-105 transition-all flex gap-2"
                >
                    {/* History */}
                    <IconContext.Provider value={{ color: pathname === '/patient/registers' ? "black" : "gray", className: "w-5 h-5" }}>
                        <div>
                            <FaNotesMedical />
                        </div>
                    </IconContext.Provider>
                </Link>
                <Link
                    href={"/"}
                    className="ml-4 hover:scale-105 transition-all flex gap-2"
                >
                    {/* Logout */}
                    <IconContext.Provider value={{ color: "gray", className: "w-5 h-5" }}>
                        <div>
                            <LuLogOut />
                        </div>
                    </IconContext.Provider>
                </Link>
            </div>
        </div >
    );
};

export default StartConsultationNavbar;
