import React, { useState } from 'react';
import {
    Globe, Moon, ChevronRight, Shield,
    Languages, Mail, Phone, Lock, Eye,
    Monitor, Volume2, Map, Upload, Download,
    Clock, Activity,
} from 'lucide-react';


const AdminSettings = () => {
    const [activeTab, setActiveTab] = useState("account");
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        updates: true,
        marketing: false,
        security: true
    });

    const [formData, setFormData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        language: 'english',
        timezone: 'UTC-5',
        currency: 'USD',
        theme: 'light',
        autoBackup: true,
        dataSaver: false,
        twoFactor: false,
        soundEffects: true,
        location: true,
        bandwidth: 'unlimited'
    });

    const [backupSchedule, setBackupSchedule] = useState('daily');
    const [dataUsage, setDataUsage] = useState({
        storage: '2.4GB',
        bandwidth: '45GB/month',
        lastBackup: '2024-02-12'
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const toggleSetting = (setting) => {
        setFormData(prev => ({
            ...prev,
            [setting]: !prev[setting]
        }));
    };

    const SettingItem = ({ icon: Icon, title, description, action, className = "" }) => (
        <div className={`flex sm:flex-row flex-col items-start sm:items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors ${className}`}>
            <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                    <Icon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                    <h3 className="font-medium text-gray-900">{title}</h3>
                    <p className="text-sm text-gray-500">{description}</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                {action}
                <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
        </div>
    );

    const Toggle = ({ enabled, onChange }) => (
        <button
            onClick={onChange}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${enabled ? 'bg-blue-600' : 'bg-gray-200'
                }`}
        >
            <span
                className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
            />
        </button>
    );

    const TabButton = ({ active, children, onClick }) => (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
        >
            {children}
        </button>
    );

    const UsageCard = ({ title, value, icon: Icon }) => (
        <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
                <Icon className="h-5 w-5 text-blue-600" />
                <h4 className="font-medium text-gray-900">{title}</h4>
            </div>
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
    );

    return (
        <div className="absolute overflow-y-auto bg-[#fbfbfb] h-screen p-8 top-0 w-full left-0 xl:left-[250px] xl:w-[calc(100%-250px)]">
            <div className=' container-fluid'>
                <div >
                    <div className="flex justify-between items-center mb-6">
                        <h1  className="text-xl font-bold text-gray-900">Settings</h1>
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                        >
                            <Moon className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="flex overflow-auto gap-4 mb-6">
                        {['account', 'security', 'preferences', 'data', 'integrations'].map(tab => (
                            <TabButton
                                key={tab}
                                active={activeTab === tab}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </TabButton>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {activeTab === "account" && (
                            <>
                                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                    <div className="p-6">
                                        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    First Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleInputChange}
                                                    className="w-full p-2 border rounded-lg"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Last Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    value={formData.lastName}
                                                    onChange={handleInputChange}
                                                    className="w-full p-2 border rounded-lg"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <SettingItem
                                        icon={Mail}
                                        title="Email Address"
                                        description={formData.email}
                                        action={<button className="text-blue-600">Change</button>}
                                    />

                                    <SettingItem
                                        icon={Phone}
                                        title="Phone Number"
                                        description={formData.phone}
                                        action={<button className="text-blue-600">Update</button>}
                                    />
                                </div>

                                <div className="bg-white rounded-lg border border-gray-200">
                                    <div className="p-4">
                                        <h2 className="text-xl font-semibold mb-4">Connected Accounts</h2>
                                        <div className="space-y-4">
                                            {['Google', 'GitHub', 'LinkedIn'].map(account => (
                                                <div key={account} className="flex items-center justify-between">
                                                    <span>{account}</span>
                                                    <button className="px-4 py-2 text-sm text-blue-600">
                                                        Connect
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === "security" && (
                            <div className="bg-white rounded-lg border border-gray-200">
                                <SettingItem
                                    icon={Lock}
                                    title="Password"
                                    description="Last changed 3 months ago"
                                    action={<button className="text-blue-600">Change</button>}
                                />

                                <SettingItem
                                    icon={Shield}
                                    title="Two-Factor Authentication"
                                    description="Secure your account with 2FA"
                                    action={
                                        <Toggle
                                            enabled={formData.twoFactor}
                                            onChange={() => toggleSetting('twoFactor')}
                                        />
                                    }
                                />

                                <SettingItem
                                    icon={Eye}
                                    title="Security Log"
                                    description="View recent security activity"
                                    action={<button className="text-blue-600">View</button>}
                                />

                                <SettingItem
                                    icon={Globe}
                                    title="Active Sessions"
                                    description="Manage your active sessions"
                                    action={<span className="text-blue-600">3 active</span>}
                                />
                            </div>
                        )}

                        {activeTab === "preferences" && (
                            <div className="space-y-6">
                                <div className="bg-white rounded-lg border border-gray-200">
                                    <SettingItem
                                        icon={Languages}
                                        title="Language"
                                        description="Choose your preferred language"
                                        action={
                                            <select
                                                value={formData.language}
                                                onChange={handleInputChange}
                                                name="language"
                                                className="form-select border rounded-md"
                                            >
                                                <option value="english">English</option>
                                                <option value="spanish">Spanish</option>
                                                <option value="french">French</option>
                                            </select>
                                        }
                                    />

                                    <SettingItem
                                        icon={Clock}
                                        title="Timezone"
                                        description="Set your local timezone"
                                        action={
                                            <select
                                                value={formData.timezone}
                                                onChange={handleInputChange}
                                                name="timezone"
                                                className="form-select border rounded-md"
                                            >
                                                <option value="UTC-5">Eastern Time (UTC-5)</option>
                                                <option value="UTC">UTC</option>
                                                <option value="UTC+1">Central European Time</option>
                                            </select>
                                        }
                                    />

                                    <SettingItem
                                        icon={Volume2}
                                        title="Sound Effects"
                                        description="Enable sound effects and alerts"
                                        action={
                                            <Toggle
                                                enabled={formData.soundEffects}
                                                onChange={() => toggleSetting('soundEffects')}
                                            />
                                        }
                                    />

                                    <SettingItem
                                        icon={Map}
                                        title="Location Services"
                                        description="Enable location-based features"
                                        action={
                                            <Toggle
                                                enabled={formData.location}
                                                onChange={() => toggleSetting('location')}
                                            />
                                        }
                                    />
                                </div>

                                <div className="bg-white rounded-lg border border-gray-200">
                                    <div className="p-4">
                                        <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
                                        {Object.entries(notifications).map(([key, value]) => (
                                            <div key={key} className="flex items-center justify-between py-2">
                                                <span className="capitalize">{key} Notifications</span>
                                                <Toggle
                                                    enabled={value}
                                                    onChange={() =>
                                                        setNotifications(prev => ({
                                                            ...prev,
                                                            [key]: !prev[key]
                                                        }))
                                                    }
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "data" && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3  gap-4">
                                    <UsageCard
                                        title="Storage Used"
                                        value={dataUsage.storage}
                                        icon={Upload}
                                    />
                                    <UsageCard
                                        title="Bandwidth Usage"
                                        value={dataUsage.bandwidth}
                                        icon={Download}
                                    />
                                    <UsageCard
                                        title="Last Backup"
                                        value={dataUsage.lastBackup}
                                        icon={Clock}
                                    />
                                </div>

                                <div className="bg-white rounded-lg border border-gray-200">
                                    <SettingItem
                                        icon={Monitor}
                                        title="Auto Backup"
                                        description="Automatically backup your data"
                                        action={
                                            <Toggle
                                                enabled={formData.autoBackup}
                                                onChange={() => toggleSetting('autoBackup')}
                                            />
                                        }
                                    />

                                    <SettingItem
                                        icon={Activity}
                                        title="Data Saver"
                                        description="Reduce data usage when on mobile networks"
                                        action={
                                            <Toggle
                                                enabled={formData.dataSaver}
                                                onChange={() => toggleSetting('dataSaver')}
                                            />
                                        }
                                    />

                                    <div className="p-4">
                                        <h3 className="font-medium text-gray-900 mb-2">Backup Schedule</h3>
                                        <select
                                            value={backupSchedule}
                                            onChange={(e) => setBackupSchedule(e.target.value)}
                                            className="w-full p-2 border rounded-lg"
                                        >
                                            <option value="daily">Daily</option>
                                            <option value="weekly">Weekly</option>
                                            <option value="monthly">Monthly</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "integrations" && (
                            <div className="bg-white rounded-lg border border-gray-200">
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold mb-4">Connected Services</h2>
                                    {[
                                        { name: 'Slack', status: 'connected' },
                                        { name: 'Dropbox', status: 'disconnected' },
                                        { name: 'Google Drive', status: 'connected' },
                                        { name: 'Microsoft Teams', status: 'disconnected' }
                                    ].map(service => (
                                        <div key={service.name} className="flex items-center justify-between py-2">
                                            <div>
                                                <h3 className="font-medium">{service.name}</h3>
                                                <p className="text-sm text-gray-500 capitalize">{service.status}</p>
                                            </div>
                                            <button className={`px-4 py-2 rounded-lg text-sm ${service.status === 'connected'
                                                ? 'bg-red-50 text-red-600'
                                                : 'bg-blue-50 text-blue-600'
                                                }`}>
                                                {service.status === 'connected' ? 'Disconnect' : 'Connect'}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
