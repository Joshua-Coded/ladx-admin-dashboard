import React, { useEffect, useState } from "react";
import { fetchPackagesDeliveredCount, fetchSendersCount, fetchTravelersCount } from "../services/dashboardService";

// src/pages/Home.tsx

const Home: React.FC = () => {
    const [travelersCount, setTravelersCount] = useState<number>(0);
    const [sendersCount, setSendersCount] = useState<number>(0);
    const [packagesDeliveredCount, setPackagesDeliveredCount] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [travelers, senders, packagesDelivered] = await Promise.all([
                    fetchTravelersCount(),
                    fetchSendersCount(),
                    fetchPackagesDeliveredCount(),
                ]);
                setTravelersCount(travelers);
                setSendersCount(senders);
                setPackagesDeliveredCount(packagesDelivered);
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 shadow-lg rounded-lg text-center">
                <p className="text-gray-500">Amount of Travelers</p>
                <h3 className="text-3xl font-bold">{travelersCount}</h3>
            </div>
            <div className="bg-white p-4 shadow-lg rounded-lg text-center">
                <p className="text-gray-500">Amount of Senders</p>
                <h3 className="text-3xl font-bold">{sendersCount}</h3>
            </div>
            <div className="bg-white p-4 shadow-lg rounded-lg text-center">
                <p className="text-gray-500">Total Packages Delivered</p>
                <h3 className="text-3xl font-bold">{packagesDeliveredCount}</h3>
            </div>
        </div>
    );
};

export default Home;