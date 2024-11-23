import React, { useEffect, useState } from "react";
import SenderOrders from "../components/SenderOrders";
import TravelPlans from "../components/TravelPlans";
import { fetchOrderById, fetchOrders, fetchTravelPlanDetails, fetchTravelPlans, matchOrderWithTravelPlan } from "../services/matchService";

// components/Orders.tsx

const Orders: React.FC = () => {
    const [orders, setOrders] = useState([]);
    const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
    const [travelPlans, setTravelPlans] = useState([]);
    const [expandedTravelPlanId, setExpandedTravelPlanId] = useState<string | null>(null);
    const [selectedTravelPlans, setSelectedTravelPlans] = useState<{ [orderId: string]: string | null }>({});
    const [activeTab, setActiveTab] = useState<"Senders" | "Travelers">("Senders");

    useEffect(() => {
        const loadData = async () => {
            if (activeTab === "Senders") {
                const ordersData = await fetchOrders();
                setOrders(ordersData);
            } else {
                const travelPlansData = await fetchTravelPlans();
                setTravelPlans(travelPlansData);
            }
        };
        loadData();
    }, [activeTab]);

    const handleMatch = async (orderId: string) => {
        const travelPlanId = selectedTravelPlans[orderId];
        if (travelPlanId) {
            try {
                await matchOrderWithTravelPlan(orderId, travelPlanId);
                alert("Order matched and status updated to 'Shipped'");
                const updatedOrders = await fetchOrders();
                setOrders(updatedOrders);
            } catch (error) {
                console.error("Failed to match order:", error);
                alert("Error: Unable to match order.");
            }
        } else {
            alert("Please select a travel plan to match with the order.");
        }
    };

    const handleSelectTravelPlan = (orderId: string, travelPlanId: string) => {
        setSelectedTravelPlans((prev) => ({
            ...prev,
            [orderId]: travelPlanId,
        }));
    };

    const handleViewDetails = async (id: string) => {
        try {
            if (activeTab === "Senders") {
                if (expandedOrderId === id) {
                    setExpandedOrderId(null);
                } else {
                    await fetchOrderById(id);
                    setExpandedOrderId(id);
                }
            } else {
                if (expandedTravelPlanId === id) {
                    setExpandedTravelPlanId(null);
                } else {
                    await fetchTravelPlanDetails(id);
                    setExpandedTravelPlanId(id);
                }
            }
        } catch (error) {
            console.error("Failed to fetch details:", error);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Delivery Orders</h2>

            <div className="flex items-center space-x-4 mb-8">
                <button
                    className={`px-4 py-2 rounded-lg ${activeTab === "Senders" ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700"}`}
                    onClick={() => setActiveTab("Senders")}
                >
                    Senders
                </button>
                <button
                    className={`px-4 py-2 rounded-lg ${activeTab === "Travelers" ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700"}`}
                    onClick={() => setActiveTab("Travelers")}
                >
                    Travelers
                </button>
            </div>

            {activeTab === "Senders" ? (
                <SenderOrders
                    orders={orders}
                    travelPlans={travelPlans}
                    expandedOrderId={expandedOrderId}
                    selectedTravelPlans={selectedTravelPlans}
                    onSelectTravelPlan={handleSelectTravelPlan}
                    onMatch={handleMatch}
                    onViewDetails={handleViewDetails}
                />
            ) : (
                <TravelPlans
                    travelPlans={travelPlans}
                    expandedTravelPlanId={expandedTravelPlanId}
                    onViewDetails={handleViewDetails}
                />
            )}
        </div>
    );
};

export default Orders;