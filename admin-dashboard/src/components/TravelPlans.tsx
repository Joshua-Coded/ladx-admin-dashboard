import { Calendar, ChevronDown, ChevronUp, MapPin, Plane, User } from "lucide-react";

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

interface TravelPlansProps {
    travelPlans: TravelPlan[];
    expandedTravelPlanId: string | null;
    onViewDetails: (id: string) => void;
}

const TravelPlans = ({
    travelPlans,
    expandedTravelPlanId,
    onViewDetails
}: TravelPlansProps) => {
    return (
        <div className="space-y-4">
            {travelPlans.map((plan) => (
                <div key={plan._id} className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md">
                    <div className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex-1">
                                <div className="flex items-center mb-2">
                                    <User className="w-5 h-5 text-gray-400 mr-2" />
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {plan.userId.fullName}
                                    </h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                                    <div className="flex items-center text-gray-600">
                                        <Plane className="w-4 h-4 mr-2" />
                                        <span>{plan.airlineName}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        <span>{new Date(plan.travelDate).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => onViewDetails(plan._id)}
                                className="mt-4 lg:mt-0 px-6 py-2 text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200 flex items-center justify-center"
                            >
                                {expandedTravelPlanId === plan._id ? (
                                    <>
                                        <ChevronUp className="w-4 h-4 mr-2" />
                                        Hide Details
                                    </>
                                ) : (
                                    <>
                                        <ChevronDown className="w-4 h-4 mr-2" />
                                        View Details
                                    </>
                                )}
                            </button>
                        </div>

                        {expandedTravelPlanId === plan._id && (
                            <div className="mt-6 pt-6 border-t border-gray-100">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <h4 className="font-medium text-gray-900">Route Details</h4>
                                        <div className="space-y-2">
                                            <div className="flex items-center text-gray-600">
                                                <MapPin className="w-4 h-4 mr-2" />
                                                <span>From: {plan.origin}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <MapPin className="w-4 h-4 mr-2" />
                                                <span>To: {plan.destination}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <h4 className="font-medium text-gray-900">Flight Details</h4>
                                        <div className="space-y-2">
                                            <div className="flex items-center text-gray-600">
                                                <Plane className="w-4 h-4 mr-2" />
                                                <span>Airline: {plan.airlineName}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <Calendar className="w-4 h-4 mr-2" />
                                                <span>Date: {new Date(plan.travelDate).toLocaleDateString()}</span>
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

export default TravelPlans;