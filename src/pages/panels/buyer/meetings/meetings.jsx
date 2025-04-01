import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Video, Phone, Users, Plus, X, ChevronLeft, ChevronRight, Building, FileText, MessageSquare } from 'lucide-react';
import { useMeetings } from '../../../../contexts/MeetingContext';

const BuyerMeetings = () => {
    const {
        meetings,
        upcomingMeetings,
        pastMeetings,
        loading,
        error,
        selectedDate,
        setSelectedDate,
        createMeeting,
        updateMeeting,
        deleteMeeting
    } = useMeetings();

    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState('upcoming');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [showSummaryModal, setShowSummaryModal] = useState(false);
    const [selectedMeeting, setSelectedMeeting] = useState(null);
    const [displayedMeetings, setDisplayedMeetings] = useState([]);

    const [formData, setFormData] = useState({
        title: '',
        brand: '',
        date: '',
        time: '',
        duration: '1 hour',
        type: 'video',
        participants: '',
        agenda: '',
        location: '',
        notes: ''
    });

    // Set displayed meetings based on active tab
    useEffect(() => {
        if (activeTab === 'upcoming') {
            setDisplayedMeetings(upcomingMeetings);
        } else {
            setDisplayedMeetings(pastMeetings);
        }
    }, [activeTab, upcomingMeetings, pastMeetings]);

    const generateCalendar = (date) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const startDay = firstDay.getDay();
        const daysInMonth = lastDay.getDate();

        const calendar = [];
        let week = [];

        for (let i = 0; i < startDay; i++) {
            week.push(null);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            if (week.length === 7) {
                calendar.push(week);
                week = [];
            }
            week.push(day);
        }

        while (week.length < 7) {
            week.push(null);
        }
        calendar.push(week);

        return calendar;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const meetingData = {
                title: formData.title,
                brand: formData.brand,
                date: new Date(`${formData.date}T${formData.time}`),
                duration: formData.duration,
                type: formData.type,
                participants: formData.participants.split(',').map(p => p.trim()),
                agenda: formData.agenda,
                location: formData.location,
                notes: formData.notes,
                status: 'confirmed'
            };

            await createMeeting(meetingData);
            setShowModal(false);
            resetForm();
        } catch (err) {
            console.error('Failed to create meeting:', err);
            // You could add error handling UI here
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            brand: '',
            date: '',
            time: '',
            duration: '1 hour',
            type: 'video',
            participants: '',
            agenda: '',
            location: '',
            notes: ''
        });
    };

    const handleMeetingClick = (meeting) => {
        setSelectedMeeting(meeting);
        setShowSummaryModal(true);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const getTodaysMeetings = () => {
        const today = new Date();
        return meetings.filter(meeting => {
            const meetingDate = new Date(meeting.date);
            return meetingDate.toDateString() === today.toDateString();
        });
    };


    const MeetingSummaryModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full mx-4">
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">Meeting Details</h2>
                    <button
                        onClick={() => setShowSummaryModal(false)}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-6">
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">{selectedMeeting?.title}</h3>
                            <p className="text-sm text-gray-500">{selectedMeeting?.brand}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600">
                                    {new Date(selectedMeeting?.date).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600">{selectedMeeting?.duration}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Building className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600">{selectedMeeting?.location}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Users className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600">
                                    {selectedMeeting?.participants.join(', ')}
                                </span>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-900 mb-2">Agenda</h4>
                            <p className="text-sm text-gray-600">{selectedMeeting?.agenda}</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                            <p className="text-sm text-gray-600">{selectedMeeting?.notes}</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end space-x-4 p-6 border-t">
                    <button className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
                        <MessageSquare className="w-4 h-4" />
                        <span>Add Notes</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
                        <FileText className="w-4 h-4" />
                        <span>Export Summary</span>
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="absolute overflow-y-auto bg-gray-50 min-h-screen p-8 top-0 w-full left-0 xl:left-[250px] xl:w-[calc(100%-250px)]">
            <div className="container-fluid mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">Meetings</h1>
                        <p className="text-sm text-gray-500 mt-1">Schedule and manage your brand meetings</p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Schedule Meeting</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-medium text-gray-800">Calendar</h2>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
                                    className="p-1 hover:bg-gray-100 rounded"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
                                    className="p-1 hover:bg-gray-100 rounded"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="text-center font-medium">
                                {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                            </div>
                        </div>

                        <div className="grid grid-cols-7 gap-1">
                            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                                <div key={day} className="text-center text-sm text-gray-500 py-2">
                                    {day}
                                </div>
                            ))}

                            {generateCalendar(currentDate).flat().map((day, index) => {
                                const hasEvents = meetings.some(meeting => {
                                    const meetingDate = new Date(meeting.date);
                                    return meetingDate.getDate() === day &&
                                        meetingDate.getMonth() === currentDate.getMonth() &&
                                        meetingDate.getFullYear() === currentDate.getFullYear();
                                });

                                return (
                                    <button
                                        key={index}
                                        onClick={() => day && setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                                        className={`
                      p-2 text-sm rounded-lg relative
                      ${!day ? 'invisible' : 'hover:bg-blue-50'}
                      ${selectedDate.getDate() === day &&
                                                selectedDate.getMonth() === currentDate.getMonth() ?
                                                'bg-blue-100 text-blue-600' : ''}
                    `}
                                        disabled={!day}
                                    >
                                        {day}
                                        {hasEvents && (
                                            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="mt-4 pt-4 border-t">
                            <h3 className="text-sm font-medium text-gray-800 mb-2">Today's Meetings</h3>
                            {meetings.filter(meeting =>
                                new Date(meeting.date).toDateString() === new Date().toDateString()
                            ).map(meeting => (
                                <div
                                    key={meeting.id}
                                    className="py-2 text-sm text-gray-600 cursor-pointer hover:text-blue-600"
                                    onClick={() => handleMeetingClick(meeting)}
                                >
                                    {new Date(meeting.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {meeting.title}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <div className="border-b border-gray-200">
                                <div className="flex p-4">
                                    <button
                                        className={`px-4 py-2 text-sm font-medium ${activeTab === 'upcoming' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                        onClick={() => setActiveTab('upcoming')}
                                    >
                                        Upcoming
                                    </button>
                                    <button
                                        className={`px-4 py-2 text-sm font-medium ${activeTab === 'past' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                        onClick={() => setActiveTab('past')}
                                    >
                                        Past Meetings
                                    </button>
                                </div>
                            </div>

                            <div className="divide-y divide-gray-200">
                                {meetings.map((meeting) => (
                                    <div
                                        key={meeting.id}
                                        className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                                        onClick={() => handleMeetingClick(meeting)}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-medium text-gray-900">{meeting.title}</h3>
                                                <p className="text-sm text-gray-500">{meeting.brand}</p>
                                            </div>
                                            <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                                                {meeting.status}
                                            </span>
                                        </div>

                                        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="flex items-center space-x-2">
                                                <Calendar className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm text-gray-600">
                                                    {new Date(meeting.date).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Clock className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm text-gray-600">{meeting.duration}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                {meeting.type === 'video' && <Video className="w-4 h-4 text-gray-400" />}
                                                {meeting.type === 'phone' && <Phone className="w-4 h-4 text-gray-400" />}
                                                <span className="text-sm text-gray-600">{meeting.type}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Users className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm text-gray-600">
                                                    {meeting.participants.length} participants
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full mx-4">
                            <div className="flex justify-between items-center p-6 border-b">
                                <h2 className="text-xl font-semibold text-gray-800">Schedule New Meeting</h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Meeting Title
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter meeting title"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Brand Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.brand}
                                            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter brand name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Date
                                        </label>
                                        <input
                                            type="date"
                                            required
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Time
                                        </label>
                                        <input
                                            type="time"
                                            required
                                            value={formData.time}
                                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Duration
                                        </label>
                                        <select
                                            value={formData.duration}
                                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option>30 minutes</option>
                                            <option>1 hour</option>
                                            <option>1.5 hours</option>
                                            <option>2 hours</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Meeting Type
                                        </label>
                                        <select
                                            value={formData.type}
                                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="video">Video Call</option>
                                            <option value="phone">Phone Call</option>
                                            <option value="in-person">In Person</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Location
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter meeting location or link"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Participants (comma-separated)
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.participants}
                                            onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="John Doe, Jane Smith"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Agenda
                                        </label>
                                        <textarea
                                            value={formData.agenda}
                                            onChange={(e) => setFormData({ ...formData, agenda: e.target.value })}
                                            rows={3}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter meeting agenda"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Notes
                                        </label>
                                        <textarea
                                            value={formData.notes}
                                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                            rows={3}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter any additional notes"
                                        />
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Schedule Meeting
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {showSummaryModal && <MeetingSummaryModal />}
            </div>
        </div>
    );
};

export default BuyerMeetings;