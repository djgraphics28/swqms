import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function Edit({ device }) {
    const { data, setData, put, processing, errors } = useForm({
        code: device.code || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("devices.update", device.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Device
                </h2>
            }
        >
            <Head title="Edit Device" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label
                                        htmlFor="code"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Device Code
                                    </label>
                                    <input
                                        type="text"
                                        id="code"
                                        name="code"
                                        value={data.code}
                                        onChange={(e) =>
                                            setData("code", e.target.value)
                                        }
                                        className={`mt-1 block w-full px-3 py-2 border ${
                                            errors.code
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                    />
                                    {errors.code && (
                                        <div className="text-sm text-red-500 mt-1">
                                            {errors.code}
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    >
                                        {processing
                                            ? "Saving..."
                                            : "Save Changes"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
