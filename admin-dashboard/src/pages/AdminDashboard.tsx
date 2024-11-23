import Header from "../components/Header";
import Home from "./Home";
import Orders from "./Orders";
import React from "react";
import Users from "./Users";
import { Route, Routes } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

const AdminDashboard: React.FC = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 p-6 overflow-y-auto">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/users" element={<Users />} />
                        {/* Add more routes as needed */}
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;