import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Echo from "laravel-echo";
import { useState, useEffect } from "react";

export default function Dashboard({ device, auth }) {
    const [currentDateTime, setCurrentDateTime] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [mapUrl, setMapUrl] = useState("");

    useEffect(() => {
        if (device?.lat && device?.lng) {
            // Dynamically construct the Google Maps URL with the device's lat and lng
            const url = `https://www.google.com/maps/embed/v1/place?q=${device.lat},${device.lng}&key=AIzaSyCGSdz2RsYpR2isrO9CpAUSQUgAf6pZKvg`;
            setMapUrl(url);
        }
    }, [device]);

    // Function to format the date and time
    const formatDateTime = (date) => {
        return new Date(date).toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDateTime(formatDateTime(new Date()));
        }, 1000);

        // Clean up the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        window.Echo.private(`dashboard.${auth?.user.id}`)
            .listen("UpdateDashboardRequest", (e) => {
                console.log(e);
            })
    }, []);

    // Function to open the map modal
    const openModal = () => setIsModalOpen(true);

    // Function to close the map modal
    const closeModal = () => setIsModalOpen(false);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Smart Water Quality Monitoring Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg relative">
                        {/* Action Button for Show in Maps */}
                        <button
                            onClick={openModal}
                            className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
                        >
                            Show in Maps
                        </button>

                        {/* Date Time */}
                        <div className="text-center p-4">
                            <h3 className="text-xl font-semibold text-gray-700">
                                Current Date & Time
                            </h3>
                            <p className="text-lg text-gray-500">
                                {currentDateTime}
                            </p>
                        </div>

                        {/* Monitoring Metrics */}
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Temperature */}
                            <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
                                <h4 className="text-xl font-semibold text-gray-700">
                                    Temperature (°C)
                                </h4>
                                <p className="text-2xl font-bold text-blue-500">
                                    {device?.latest_log.temperature} °C
                                </p>
                            </div>

                            {/* Voltage */}
                            <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
                                <h4 className="text-xl font-semibold text-gray-700">
                                    Voltage (V)
                                </h4>
                                <p className="text-2xl font-bold text-green-500">
                                    {device?.latest_log.voltage} V
                                </p>
                            </div>

                            {/* PH Level */}
                            <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
                                <h4 className="text-xl font-semibold text-gray-700">
                                    pH Level
                                </h4>
                                <p className="text-2xl font-bold text-purple-500">
                                    {device?.latest_log.ph_level}
                                </p>
                            </div>

                            {/* Turbidity */}
                            <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
                                <h4 className="text-xl font-semibold text-gray-700">
                                    Turbidity
                                </h4>
                                <p className="text-2xl font-bold text-yellow-500">
                                    {device?.latest_log.turbidity} NTU
                                </p>
                            </div>

                            {/* Conductivity */}
                            <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
                                <h4 className="text-xl font-semibold text-gray-700">
                                    Conductivity
                                </h4>
                                <p className="text-2xl font-bold text-red-500">
                                    {device?.latest_log.conductivity} µS/cm
                                </p>
                            </div>
                        </div>

                        {/* Analytics Section */}
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-800">
                                Analytics Overview
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                                {/* Example Analytics */}
                                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                                    <h4 className="text-lg font-semibold text-gray-700">
                                        Temperature Analytics
                                    </h4>
                                    <p className="text-lg text-gray-500">
                                        Average Temp: {device?.temperature}°C
                                    </p>
                                </div>

                                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                                    <h4 className="text-lg font-semibold text-gray-700">
                                        Voltage Analytics
                                    </h4>
                                    <p className="text-lg text-gray-500">
                                        Average Voltage: {device?.voltage}V
                                    </p>
                                </div>

                                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                                    <h4 className="text-lg font-semibold text-gray-700">
                                        pH Level Analytics
                                    </h4>
                                    <p className="text-lg text-gray-500">
                                        Average pH: {device?.ph_level}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal with Google Map */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-semibold">
                                Google Map
                            </h3>
                            <button
                                onClick={closeModal}
                                className="text-red-500 font-bold text-xl"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="h-96">
                            {/* Embed Google Map with dynamic coordinates */}
                            <iframe
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                style={{ border: 0 }}
                                src={mapUrl} // Use the dynamically generated URL
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
