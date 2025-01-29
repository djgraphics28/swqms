import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link, useForm } from "@inertiajs/react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// Modal Component for Google Map
const MapModal = ({ isOpen, onClose, device, onSave }) => {
    const [lat, setLat] = useState(Number(device.lat) || 0);
    const [lng, setLng] = useState(Number(device.lng) || 0);

    const handleSave = () => {
        onSave(lat, lng); // Save updated location
        onClose(); // Close the modal
    };

    return (
        isOpen && (
            <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded shadow-lg w-1/2">
                    <h3 className="text-lg font-semibold mb-4">
                        Update Location
                    </h3>
                    <LoadScript googleMapsApiKey="AIzaSyCGSdz2RsYpR2isrO9CpAUSQUgAf6pZKvg">
                        <GoogleMap
                            mapContainerStyle={{
                                height: "400px",
                                width: "100%",
                            }}
                            center={{ lat, lng }}
                            zoom={10}
                            onClick={(e) => {
                                setLat(e.latLng.lat());
                                setLng(e.latLng.lng());
                            }}
                        >
                            <Marker position={{ lat, lng }} />
                        </GoogleMap>
                    </LoadScript>
                    <div className="mt-4">
                        <button
                            onClick={handleSave}
                            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                        >
                            Save
                        </button>
                        <button
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default function Index() {
    const { devices } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState(null);

    // Initialize the form with default values
    const { data, setData, patch, processing, errors } = useForm({
        lat: selectedDevice ? selectedDevice.lat : 0,
        lng: selectedDevice ? selectedDevice.lng : 0,
    });

    // Update the form data when selectedDevice changes
    useEffect(() => {
        if (selectedDevice) {
            setData("lat", selectedDevice.lat);
            setData("lng", selectedDevice.lng);
        }
    }, [selectedDevice]);

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this device?")) {
            Inertia.delete(route("devices.destroy", id));
        }
    };

    const handleShowMap = (device) => {
        setSelectedDevice(device);
        setIsModalOpen(true);
    };

    const handleSaveLocation = (lat, lng) => {
        console.log("Save clicked with lat:", lat, "lng:", lng); // Debug: Check lat and lng before saving

        // Update the form with the new lat/lng values
        setData("lat", lat);
        setData("lng", lng);

        // Now send updated location to the server (use PATCH or PUT depending on your route)
        patch(
            route("devices.updateLocation", {
                id: selectedDevice.id,
                lat: lat,
                lng: lng,
            })
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Devices
                </h2>
            }
        >
            <Head title="Devices" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <Link
                                href={route("devices.create")}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Add Device
                            </Link>
                            <table className="w-full mt-4 border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-gray-300 px-4 py-2">
                                            ID
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2">
                                            Code
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {devices.map((device) => (
                                        <tr
                                            key={device.id}
                                            className="border border-gray-300"
                                        >
                                            <td className="border border-gray-300 px-4 py-2">
                                                {device.id}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {device.code}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                <Link
                                                    href={route(
                                                        "devices.edit",
                                                        device.id
                                                    )}
                                                    className="text-blue-500 mr-2"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(device.id)
                                                    }
                                                    className="text-red-500"
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleShowMap(device)
                                                    }
                                                    className="ml-2 text-green-500"
                                                >
                                                    Show In Map
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Map Modal */}
            {selectedDevice && (
                <MapModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    device={selectedDevice}
                    onSave={handleSaveLocation}
                />
            )}
        </AuthenticatedLayout>
    );
}
