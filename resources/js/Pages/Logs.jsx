import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Logs() {
    const allDevices = [
        'D001', 'D002', 'D003', 'D004', 'D005', 'D006', 'D007', 'D008', 'D009', 'D010'
    ];

    const initialData = [
        { deviceCode: 'D001', temperature: '35°C', voltage: '220V', phLevel: '7.2', turbidity: '1.1 NTU', conductivity: '5.4 mS/cm', date: '2025-01-29 10:00' },
        { deviceCode: 'D002', temperature: '34°C', voltage: '220V', phLevel: '7.1', turbidity: '1.3 NTU', conductivity: '5.2 mS/cm', date: '2025-01-29 10:05' },
        { deviceCode: 'D003', temperature: '33°C', voltage: '220V', phLevel: '6.9', turbidity: '1.0 NTU', conductivity: '5.3 mS/cm', date: '2025-01-29 10:10' },
        { deviceCode: 'D004', temperature: '36°C', voltage: '220V', phLevel: '7.3', turbidity: '1.2 NTU', conductivity: '5.5 mS/cm', date: '2025-01-29 10:15' },
        { deviceCode: 'D005', temperature: '32°C', voltage: '220V', phLevel: '6.8', turbidity: '1.4 NTU', conductivity: '5.1 mS/cm', date: '2025-01-29 10:20' },
        { deviceCode: 'D006', temperature: '34°C', voltage: '220V', phLevel: '7.0', turbidity: '1.1 NTU', conductivity: '5.6 mS/cm', date: '2025-01-29 10:25' },
        { deviceCode: 'D007', temperature: '35°C', voltage: '220V', phLevel: '7.1', turbidity: '1.0 NTU', conductivity: '5.2 mS/cm', date: '2025-01-29 10:30' },
        { deviceCode: 'D008', temperature: '33°C', voltage: '220V', phLevel: '7.2', turbidity: '1.3 NTU', conductivity: '5.3 mS/cm', date: '2025-01-29 10:35' },
        { deviceCode: 'D009', temperature: '36°C', voltage: '220V', phLevel: '6.9', turbidity: '1.0 NTU', conductivity: '5.4 mS/cm', date: '2025-01-29 10:40' },
        { deviceCode: 'D010', temperature: '34°C', voltage: '220V', phLevel: '7.0', turbidity: '1.2 NTU', conductivity: '5.5 mS/cm', date: '2025-01-29 10:45' },
    ];

    const [deviceFilter, setDeviceFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [filteredData, setFilteredData] = useState(initialData);
    const [showFilters, setShowFilters] = useState(false);

    const handleDeviceChange = (e) => {
        const selectedDevice = e.target.value;
        setDeviceFilter(selectedDevice);
        filterData(selectedDevice, dateFilter);
    };

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setDateFilter(selectedDate);
        filterData(deviceFilter, selectedDate);
    };

    const filterData = (device, date) => {
        let filtered = initialData;

        if (device) {
            filtered = filtered.filter((log) => log.deviceCode === device);
        }

        if (date) {
            filtered = filtered.filter((log) => log.date.startsWith(date));
        }

        setFilteredData(filtered);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Logs
                </h2>
            }
        >
            <Head title="Logs" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Hamburger Icon to Toggle Filters */}
                            <div className="flex justify-end mb-4">
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="text-gray-500 focus:outline-none"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="h-6 w-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                </button>
                            </div>

                            {/* Filters Panel */}
                            <div
                                className={`transition-all duration-300 ${showFilters ? 'block' : 'hidden'} absolute top-0 right-0 bg-white shadow-lg p-6 w-64`}
                            >
                                <div className="mb-4">
                                    <label htmlFor="device" className="mr-2">Device:</label>
                                    <select
                                        id="device"
                                        className="px-4 py-2 border rounded"
                                        value={deviceFilter}
                                        onChange={handleDeviceChange}
                                    >
                                        <option value="">All Devices</option>
                                        {allDevices.map((device) => (
                                            <option key={device} value={device}>
                                                {device}
                                            </option>
                                        ))}
                                    </select>

                                    <label htmlFor="date" className="ml-4 mr-2">Date:</label>
                                    <input
                                        type="date"
                                        id="date"
                                        className="px-4 py-2 border rounded"
                                        value={dateFilter}
                                        onChange={handleDateChange}
                                    />
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full table-auto">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-4 py-2 text-left">Device Code</th>
                                            <th className="px-4 py-2 text-left">Temperature</th>
                                            <th className="px-4 py-2 text-left">Voltage</th>
                                            <th className="px-4 py-2 text-left">PH Level</th>
                                            <th className="px-4 py-2 text-left">Turbidity</th>
                                            <th className="px-4 py-2 text-left">Conductivity</th>
                                            <th className="px-4 py-2 text-left">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData.map((log, index) => (
                                            <tr key={index} className="border-t">
                                                <td className="px-4 py-2">{log.deviceCode}</td>
                                                <td className="px-4 py-2">{log.temperature}</td>
                                                <td className="px-4 py-2">{log.voltage}</td>
                                                <td className="px-4 py-2">{log.phLevel}</td>
                                                <td className="px-4 py-2">{log.turbidity}</td>
                                                <td className="px-4 py-2">{log.conductivity}</td>
                                                <td className="px-4 py-2">{log.date}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
