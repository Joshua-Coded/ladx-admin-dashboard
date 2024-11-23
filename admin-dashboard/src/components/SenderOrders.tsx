import { Check, DollarSign, Eye, MapPin, Package, Phone, User, Weight } from "lucide-react";

interface Order {
    _id: string;
    packageName: string;
    packageDetails: string;
    itemDescription: string;
    addressSendingFrom: string;
    addressDeliveringTo: string;
    status: string;
    userId: {
        fullName: string;
    };
    packageValue: number;
    quantityInKg: number;
    receiverName: string;
    receiverPhone: string;
}

interface TravelPlan {
    _id: string;
    origin: string;
    destination: string;
    airlineName: string;
    travelDate: string;
    userId: {
        fullName: string;
    };
}

interface SenderOrdersProps {
    orders: Order[];
    travelPlans: TravelPlan[];
    expandedOrderId: string | null;
    selectedTravelPlans: { [orderId: string]: string | null };
    onSelectTravelPlan: (orderId: string, travelPlanId: string) => void;
    onMatch: (orderId: string) => void;
    onViewDetails: (id: string) => void;
}

const SenderOrders = ({
    orders,
    travelPlans,
    expandedOrderId,
    selectedTravelPlans,
    onSelectTravelPlan,
    onMatch,
    onViewDetails
}: SenderOrdersProps) => {
    const getStatusColor = (status: string) => {
        const statusColors: { [key: string]: string } = {
            'Pending': 'bg-yellow-100 text-yellow-800',
            'Shipped': 'bg-green-100 text-green-800',
            'Delivered': 'bg-blue-100 text-blue-800',
            'Cancelled': 'bg-red-100 text-red-800'
        };
        return statusColors[status] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="space-y-4">
            {orders.map((order) => (
                <div key={order._id} className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md">
                    <div className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex-1">
                                <div className="flex items-center mb-2">
                                    <User className="w-5 h-5 text-gray-400 mr-2" />
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {order.userId.fullName}
                                    </h3>
                                    <span className={`ml-3 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                                    <div className="flex items-center text-gray-600">
                                        <Package className="w-4 h-4 mr-2" />
                                        <span>{order.packageName}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <MapPin className="w-4 h-4 mr-2" />
                                        <span>{order.addressSendingFrom} → {order.addressDeliveringTo}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-3 mt-4 lg:mt-0">
                                <select
                                    className="w-full sm:w-auto px-4 py-2 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    onChange={(e) => onSelectTravelPlan(order._id, e.target.value)}
                                    value={selectedTravelPlans[order._id] || ""}
                                >
                                    <option value="">Select Travel Plan</option>
                                    {travelPlans.map((plan) => (
                                        <option key={plan._id} value={plan._id}>
                                            {plan.origin} to {plan.destination} - {plan.airlineName}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    onClick={() => selectedTravelPlans[order._id] && onMatch(order._id)}
                                    className="w-full sm:w-auto px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center"
                                    disabled={!selectedTravelPlans[order._id]}
                                >
                                    <Check className="w-4 h-4 mr-2" />
                                    Match
                                </button>
                                <button
                                    onClick={() => onViewDetails(order._id)}
                                    className="w-full sm:w-auto px-6 py-2 text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200 flex items-center justify-center"
                                >
                                    <Eye className="w-4 h-4 mr-2" />
                                    {expandedOrderId === order._id ? "Hide" : "View"} Details
                                </button>
                            </div>
                        </div>

                        {expandedOrderId === order._id && (
                            <div className="mt-6 pt-6 border-t border-gray-100">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <div className="space-y-3">
                                        <h4 className="font-medium text-gray-900">Package Information</h4>
                                        <div className="space-y-2">
                                            <div className="flex items-center text-gray-600">
                                                <Package className="w-4 h-4 mr-2" />
                                                <span>{order.packageDetails}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <DollarSign className="w-4 h-4 mr-2" />
                                                <span>${order.packageValue.toLocaleString()}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <Weight className="w-4 h-4 mr-2" />
                                                <span>{order.quantityInKg}kg</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <h4 className="font-medium text-gray-900">Shipping Details</h4>
                                        <div className="space-y-2">
                                            <div className="flex items-center text-gray-600">
                                                <MapPin className="w-4 h-4 mr-2" />
                                                <span>From: {order.addressSendingFrom}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <MapPin className="w-4 h-4 mr-2" />
                                                <span>To: {order.addressDeliveringTo}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <h4 className="font-medium text-gray-900">Receiver Information</h4>
                                        <div className="space-y-2">
                                            <div className="flex items-center text-gray-600">
                                                <User className="w-4 h-4 mr-2" />
                                                <span>{order.receiverName}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <Phone className="w-4 h-4 mr-2" />
                                                <span>{order.receiverPhone}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SenderOrders;