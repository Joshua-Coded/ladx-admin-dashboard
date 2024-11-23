import { Bell } from "lucide-react";

export const Header: React.FC = () => {
    return (
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
            <div className="flex justify-between items-center px-6 py-4">
                <div className="flex items-center space-x-4">
                    {/* <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2> */}
                    <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                        <span>Admin Panel</span>
                        <span>•</span>
                        <span>v1.0</span>
                    </div>
                </div>

                <div className="flex items-center space-x-6">
                    {/* Notifications */}
                    <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                        <Bell size={20} />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full" />
                    </button>

                    {/* Admin Profile */}
                    <div className="flex items-center space-x-3">
                        <div className="hidden md:block text-right">
                            <div className="text-sm font-medium text-gray-900">Admin User</div>
                            <div className="text-xs text-green-500">Online</div>
                        </div>
                        <div className="relative">
                            <img
                                src="https://api.dicebear.com/7.x/initials/svg?seed=Admin"
                                alt="Admin"
                                className="w-10 h-10 rounded-full border-2 border-purple-500"
                            />
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};


export default Header;
