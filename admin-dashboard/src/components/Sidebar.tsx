import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import {
    Bell,
    Home,
    LogOut,
    Settings,
    Truck,
    User,
    Menu,
    X,
    ChevronDown
} from "lucide-react";

// Sidebar Component
export const Sidebar: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const NavItem = ({ to, icon: Icon, children }: { to: string; icon: any; children: React.ReactNode }) => (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center px-6 py-3 text-gray-300 hover:bg-purple-800/50 transition-all duration-150 ease-in-out rounded-lg mx-2 ${isActive ? 'bg-purple-800/70 text-white' : ''
                }`
            }
        >
            <Icon className={`${isCollapsed ? 'mr-0' : 'mr-4'} h-5 w-5`} />
            {!isCollapsed && <span>{children}</span>}
        </NavLink>
    );

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-purple-900 text-white md:hidden"
            >
                {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-40 h-screen bg-[#1a1042] transform transition-all duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isCollapsed ? 'w-20' : 'w-64'}
          md:translate-x-0 md:relative
        `}
            >
                {/* Logo Section */}
                <div className="flex items-center justify-between h-16 px-6 border-b border-purple-800/30">
                    {!isCollapsed && (
                        <div className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-purple-600 text-transparent bg-clip-text">
                            LADX
                        </div>
                    )}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="hidden md:block p-1.5 rounded-lg hover:bg-purple-800/50"
                    >
                        <ChevronDown
                            className={`h-5 w-5 text-gray-300 transform transition-transform duration-300 ${isCollapsed ? 'rotate-90' : '-rotate-90'
                                }`}
                        />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col mt-6 space-y-2">
                    <NavItem to="/admin/dashboard" icon={Home}>
                        Home
                    </NavItem>
                    <NavItem to="/admin/dashboard/orders" icon={Truck}>
                        Orders
                    </NavItem>
                    <NavItem to="/admin/dashboard/users" icon={User}>
                        Users
                    </NavItem>
                    <NavItem to="/admin/dashboard/messages" icon={Bell}>
                        Messages
                    </NavItem>
                    <NavItem to="/admin/dashboard/settings" icon={Settings}>
                        Settings
                    </NavItem>
                </nav>

                {/* Logout Button */}
                <div className="absolute bottom-8 w-full px-2">
                    <NavLink
                        to="/admin/login"
                        className="flex items-center px-6 py-3 text-gray-300 hover:bg-purple-800/50 transition-all duration-150 ease-in-out rounded-lg mx-2"
                    >
                        <LogOut className={`${isCollapsed ? 'mr-0' : 'mr-4'} h-5 w-5`} />
                        {!isCollapsed && <span>Logout</span>}
                    </NavLink>
                </div>
            </aside>
        </>
    );
};