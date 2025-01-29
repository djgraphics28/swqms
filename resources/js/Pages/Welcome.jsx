import React from "react";
import { Head, Link } from "@inertiajs/react";

const Welcome = ({ auth }) => {
    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200">
                {/* Hero Section */}
                <header className="relative bg-blue-600 text-white">
                    <div className="max-w-7xl mx-auto px-6 py-12 text-center">
                        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                            Smart Water Quality Monitoring System
                        </h1>
                        <p className="mt-4 text-lg md:text-xl">
                            Real-time water quality monitoring made simple,
                            efficient, and sustainable.
                        </p>
                        <div className="mt-6">
                            {auth.user ? (
                                // If user is authenticated, show Go to Dashboard button
                                <Link
                                    href="/dashboard"
                                    className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold shadow-lg hover:bg-blue-100"
                                >
                                    Go to Dashboard
                                </Link>
                            ) : (
                                // If not authenticated, show Sign In / Sign Up button
                                <>
                                    <Link
                                        href="/login"
                                        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-lg hover:bg-blue-700 mr-2"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold shadow-lg hover:bg-green-700"
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Features Section */}
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-center">
                            Features That Set Us Apart
                        </h2>
                        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-blue-50 p-6 rounded-lg shadow-lg text-center">
                                <h3 className="text-xl font-semibold text-blue-600">
                                    Real-Time Monitoring
                                </h3>
                                <p className="mt-2 text-gray-600">
                                    Stay updated with real-time insights on
                                    water quality metrics, including pH,
                                    temperature, and turbidity.
                                </p>
                            </div>
                            <div className="bg-blue-50 p-6 rounded-lg shadow-lg text-center">
                                <h3 className="text-xl font-semibold text-blue-600">
                                    Advanced Analytics
                                </h3>
                                <p className="mt-2 text-gray-600">
                                    Make informed decisions with data-driven
                                    insights and detailed analytics.
                                </p>
                            </div>
                            <div className="bg-blue-50 p-6 rounded-lg shadow-lg text-center">
                                <h3 className="text-xl font-semibold text-blue-600">
                                    Sustainable Solutions
                                </h3>
                                <p className="mt-2 text-gray-600">
                                    Promote water sustainability with innovative
                                    monitoring technologies.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-16 bg-gradient-to-r from-blue-200 to-blue-300 text-gray-900">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold">
                            Why Choose Us?
                        </h2>
                        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div>
                                <h3 className="text-xl font-semibold text-blue-800">
                                    Reliable Data
                                </h3>
                                <p className="mt-2">
                                    Dependable and accurate data ensures water
                                    safety at all times.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-blue-800">
                                    Easy Integration
                                </h3>
                                <p className="mt-2">
                                    Easily integrate with existing systems for
                                    seamless operation.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-blue-800">
                                    Cost-Effective
                                </h3>
                                <p className="mt-2">
                                    Save time and resources while ensuring
                                    top-notch water quality.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call-to-Action Section */}
                <footer className="py-12 bg-blue-700 text-white text-center">
                    <h2 className="text-2xl md:text-3xl font-bold">
                        Start Monitoring Smarter Today
                    </h2>
                    <p className="mt-4">
                        Contact us to learn more or request a demo of our smart
                        water quality monitoring system.
                    </p>
                    <div className="mt-6">
                        <Link
                            href="/contact"
                            className="px-8 py-3 bg-white text-blue-700 rounded-lg font-bold shadow-lg hover:bg-blue-100"
                        >
                            Contact Us
                        </Link>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default Welcome;
