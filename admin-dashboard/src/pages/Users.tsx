import React, { useEffect, useState } from "react";
import { Check, Eye, MessageSquare, MoreVertical, Search, X } from "lucide-react";
import { fetchSenders, fetchTravelers } from "../services/userService";

interface User {
    _id: string;
    fullName: string;
    email: string;
    country: string;
    state: string;
    itemsSent?: number;
    phoneNumber: string;
    gender: "Male" | "Female" | "Other";
    role: "sender" | "traveler";
    isVerified: boolean;
    kycDocument?: string;
}

const Users: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'senders' | 'travelers'>('senders');
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    useEffect(() => {
        const loadUsers = async () => {
            setLoading(true);
            try {
                const userData = activeTab === 'senders' ? await fetchSenders() : await fetchTravelers();
                setUsers(userData);
            } catch (error) {
                console.error('Error loading users:', error);
            } finally {
                setLoading(false);
            }
        };
        loadUsers();
    }, [activeTab]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (openMenuId && !(event.target as Element).closest('.dropdown-menu')) {
                setOpenMenuId(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [openMenuId]);

    const filteredUsers = users.filter(user =>
        user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        `${user.country}, ${user.state}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleViewUser = (userId: string) => {
        setOpenMenuId(null);
        console.log('Viewing user:', userId);
    };

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
                        {activeTab === 'senders' ? 'Senders' : 'Travelers'} Management
                    </h2>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>Total {activeTab}:</span>
                        <span className="font-semibold text-purple-600">{filteredUsers.length}</span>
                    </div>
                </div>

                {/* Controls Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {/* Tabs */}
                    <div className="bg-white p-1 rounded-lg shadow-sm">
                        <div className="flex space-x-1">
                            <button
                                onClick={() => setActiveTab('senders')}
                                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 
                                    ${activeTab === 'senders'
                                        ? 'bg-purple-100 text-purple-600'
                                        : 'text-gray-500 hover:bg-gray-50'
                                    }`}
                            >
                                Senders
                            </button>
                            <button
                                onClick={() => setActiveTab('travelers')}
                                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 
                                    ${activeTab === 'travelers'
                                        ? 'bg-purple-100 text-purple-600'
                                        : 'text-gray-500 hover:bg-gray-50'
                                    }`}
                            >
                                Travelers
                            </button>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by name, email, or location..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* User List */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
                    </div>
                ) : (
                    <div className="grid gap-4 md:gap-6">
                        {filteredUsers.map((user) => (
                            <div key={user._id} className="bg-white rounded-xl p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between shadow-sm hover:shadow-md transition-shadow duration-200">
                                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                                    <div className="relative">
                                        <div className="w-12 h-12 md:w-14 md:h-14 bg-gray-200 rounded-full overflow-hidden">
                                            <img
                                                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.fullName}`}
                                                alt={user.fullName}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center ${user.isVerified ? 'bg-green-500' : 'bg-gray-300'}`}>
                                            {user.isVerified ? <Check size={12} className="text-white" /> : <X size={12} className="text-white" />}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{user.fullName}</h3>
                                        <p className="text-sm text-gray-600">
                                            {user.country}, {user.state}
                                        </p>
                                        {activeTab === 'senders' && (
                                            <div className="flex items-center mt-1">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                                    {user.itemsSent || 0} Items Sent
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center justify-end space-x-4">
                                    <button className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors">
                                        <MessageSquare size={16} className="mr-1.5" />
                                        Message
                                    </button>
                                    <div className="relative">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setOpenMenuId(openMenuId === user._id ? null : user._id);
                                            }}
                                            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
                                        >
                                            <MoreVertical size={18} />
                                        </button>

                                        {openMenuId === user._id && (
                                            <div className="dropdown-menu absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 border border-gray-100 py-1">
                                                <button
                                                    onClick={() => handleViewUser(user._id)}
                                                    className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 flex items-center space-x-2"
                                                >
                                                    <Eye size={16} />
                                                    <span>View Details</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && filteredUsers.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No users found matching your search criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Users;