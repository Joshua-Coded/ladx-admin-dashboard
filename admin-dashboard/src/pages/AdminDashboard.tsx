import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminDashboard: React.FC = () => {
    return (
        <div className="flex min-h-screen">
            <aside className="w-64 bg-gray-800 text-white p-4">
                <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
                <nav className="space-y-2">
                    <Link to="/admin/dashboard" className="block py-2 px-4 rounded hover:bg-gray-700">
                        Home
                    </Link>
                    <Link to="/admin/dashboard/orders" className="block py-2 px-4 rounded hover:bg-gray-700">
                        Orders
                    </Link>
                    <Link to="/admin/dashboard/users" className="block py-2 px-4 rounded hover:bg-gray-700">
                        Users
                    </Link>
                    <Link to="/admin/dashboard/settings" className="block py-2 px-4 rounded hover:bg-gray-700">
                        Settings
                    </Link>
                </nav>
            </aside>
            <main className="flex-1 p-4">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminDashboard;
