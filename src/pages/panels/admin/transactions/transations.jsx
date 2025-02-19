import React, { useState } from 'react';
import {
    DollarSign, Package, Filter, SortAsc, Search,
    CheckCircle, XCircle, Clock, AlertCircle,
    Download, CreditCard, Archive, BarChart2,
    Calendar, File, ArrowRight, RefreshCw
} from 'lucide-react';

// Initial sample request data
const initialSampleRequests = [
    {
        id: 1,
        brandName: "Fashion Forward Co.",
        productName: "Premium Cotton T-Shirt",
        dateRequested: "2024-02-15",
        status: "Pending",
        quantity: 3,
        notes: "Need samples in sizes S, M, L for upcoming photoshoot",
        contactEmail: "brand@fashionforward.com"
    },
    {
        id: 2,
        brandName: "Eco Essentials",
        productName: "Sustainable Denim Jeans",
        dateRequested: "2024-02-10",
        status: "Approved",
        quantity: 2,
        notes: "Requesting dark wash and light wash samples",
        contactEmail: "orders@ecoessentials.com"
    },
    {
        id: 3,
        brandName: "Luxury Living",
        productName: "Cashmere Sweater",
        dateRequested: "2024-02-08",
        status: "Completed",
        quantity: 1,
        notes: "Sample for quality assessment",
        contactEmail: "purchasing@luxuryliving.com"
    },
    {
        id: 4,
        brandName: "Sportify Wear",
        productName: "Performance Leggings",
        dateRequested: "2024-02-14",
        status: "Rejected",
        quantity: 5,
        notes: "Samples for retail buyer meeting",
        rejectionReason: "Quantity exceeds sample limit policy",
        contactEmail: "samples@sportifywear.com"
    }
];

// Initial transaction data
const initialTransactions = [
    {
        id: "TRX-2024-001",
        brandName: "Fashion Forward Co.",
        amount: 299.99,
        date: "2024-02-17",
        type: "Subscription",
        plan: "Premium Annual",
        status: "Completed",
        paymentMethod: "Credit Card (Visa ****4821)"
    },
    {
        id: "TRX-2024-002",
        brandName: "Eco Essentials",
        amount: 149.50,
        date: "2024-02-16",
        type: "Sample Order",
        status: "Processing",
        paymentMethod: "PayPal"
    },
    {
        id: "TRX-2024-003",
        brandName: "Luxury Living",
        amount: 1299.99,
        date: "2024-02-15",
        type: "Platform Fee",
        status: "Completed",
        paymentMethod: "Bank Transfer"
    },
    {
        id: "TRX-2024-004",
        brandName: "Sportify Wear",
        amount: 49.99,
        date: "2024-02-14",
        type: "Subscription",
        plan: "Basic Monthly",
        status: "Failed",
        paymentMethod: "Credit Card (Mastercard ****7632)",
        failureReason: "Insufficient funds"
    },
    {
        id: "TRX-2024-005",
        brandName: "Vintage Vibes",
        amount: 399.99,
        date: "2024-02-13",
        type: "Listing Fee",
        status: "Refunded",
        paymentMethod: "Credit Card (Amex ****3456)",
        refundReason: "Service not provided as described"
    }
];

const StatusBadge = ({ status }) => {
    const statusConfig = {
        Pending: { color: "bg-yellow-100 text-yellow-800", icon: <Clock size={14} className="mr-1" /> },
        Approved: { color: "bg-green-100 text-green-800", icon: <CheckCircle size={14} className="mr-1" /> },
        Rejected: { color: "bg-red-100 text-red-800", icon: <XCircle size={14} className="mr-1" /> },
        Completed: { color: "bg-blue-100 text-blue-800", icon: <CheckCircle size={14} className="mr-1" /> },
        Processing: { color: "bg-purple-100 text-purple-800", icon: <RefreshCw size={14} className="mr-1" /> },
        Failed: { color: "bg-red-100 text-red-800", icon: <AlertCircle size={14} className="mr-1" /> },
        Refunded: { color: "bg-gray-100 text-gray-800", icon: <RefreshCw size={14} className="mr-1" /> }
    };

    const config = statusConfig[status] || statusConfig.Pending;

    return (
        <span className={`flex items-center px-2 py-1 rounded-full text-xs ${config.color}`}>
            {config.icon}
            {status}
        </span>
    );
};

const SampleRequestCard = ({ request, onUpdateStatus }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="bg-white hover:bg-gray-100 transition-colors duration-200 rounded-2xl p-6 shadow-lg hover:shadow-xl">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                        <Package className="text-purple-600" size={24} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">{request.productName}</h3>
                        <p className="text-gray-500 text-sm">{request.brandName}</p>
                    </div>
                </div>
                <StatusBadge status={request.status} />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <p className="text-gray-500 text-xs">Requested On</p>
                    <p className="font-medium flex items-center">
                        <Calendar size={14} className="mr-1 text-gray-400" />
                        {request.dateRequested}
                    </p>
                </div>
                <div>
                    <p className="text-gray-500 text-xs">Quantity</p>
                    <p className="font-medium flex items-center">
                        <Package size={14} className="mr-1 text-gray-400" />
                        {request.quantity} units
                    </p>
                </div>
            </div>

            {expanded && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="mb-3">
                        <p className="text-gray-500 text-xs">Notes</p>
                        <p className="text-gray-700">{request.notes}</p>
                    </div>
                    <div className="mb-3">
                        <p className="text-gray-500 text-xs">Contact</p>
                        <p className="text-gray-700">{request.contactEmail}</p>
                    </div>
                    {request.rejectionReason && (
                        <div className="mb-3">
                            <p className="text-gray-500 text-xs">Rejection Reason</p>
                            <p className="text-red-600">{request.rejectionReason}</p>
                        </div>
                    )}
                </div>
            )}

            <div className="flex justify-between items-center pt-4">
                <button 
                    onClick={() => setExpanded(!expanded)}
                    className="text-blue-600 text-sm hover:text-blue-800 flex items-center"
                >
                    {expanded ? "Show Less" : "Show Details"}
                    <ArrowRight size={14} className={`ml-1 transition-transform ${expanded ? 'rotate-90' : ''}`} />
                </button>

                {request.status === "Pending" && (
                    <div className="flex space-x-2">
                        <button 
                            onClick={() => onUpdateStatus(request.id, "Approved")}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm flex items-center"
                        >
                            <CheckCircle size={14} className="mr-1" />
                            Approve
                        </button>
                        <button 
                            onClick={() => onUpdateStatus(request.id, "Rejected")}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm flex items-center"
                        >
                            <XCircle size={14} className="mr-1" />
                            Reject
                        </button>
                    </div>
                )}

                {request.status === "Approved" && (
                    <button 
                        onClick={() => onUpdateStatus(request.id, "Completed")}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm flex items-center"
                    >
                        <CheckCircle size={14} className="mr-1" />
                        Mark Completed
                    </button>
                )}
            </div>
        </div>
    );
};

const TransactionRow = ({ transaction }) => {
    const [expanded, setExpanded] = useState(false);
    
    return (
        <div className="bg-white hover:bg-gray-100 transition-colors rounded-xl p-4 mb-4 shadow-md">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                        transaction.type === "Subscription" ? "bg-blue-100" : 
                        transaction.type === "Sample Order" ? "bg-purple-100" :
                        "bg-green-100"
                    }`}>
                        <CreditCard className={`${
                            transaction.type === "Subscription" ? "text-blue-600" : 
                            transaction.type === "Sample Order" ? "text-purple-600" :
                            "text-green-600"
                        }`} size={20} />
                    </div>
                    <div>
                        <p className="font-medium text-gray-900">{transaction.id}</p>
                        <p className="text-sm text-gray-500">{transaction.brandName}</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-2">
                    <p className={`font-bold ${
                        transaction.status === "Refunded" ? "text-red-600" : "text-gray-900"
                    }`}>
                        ${transaction.amount.toFixed(2)}
                    </p>
                    <StatusBadge status={transaction.status} />
                </div>
            </div>
            
            {expanded && (
                <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <p className="text-gray-500 text-xs">Transaction Date</p>
                        <p className="font-medium">{transaction.date}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs">Type</p>
                        <p className="font-medium">{transaction.type}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs">Payment Method</p>
                        <p className="font-medium">{transaction.paymentMethod}</p>
                    </div>
                    
                    {transaction.plan && (
                        <div>
                            <p className="text-gray-500 text-xs">Subscription Plan</p>
                            <p className="font-medium">{transaction.plan}</p>
                        </div>
                    )}
                    
                    {transaction.failureReason && (
                        <div className="col-span-full">
                            <p className="text-gray-500 text-xs">Failure Reason</p>
                            <p className="text-red-600">{transaction.failureReason}</p>
                        </div>
                    )}
                    
                    {transaction.refundReason && (
                        <div className="col-span-full">
                            <p className="text-gray-500 text-xs">Refund Reason</p>
                            <p className="text-red-600">{transaction.refundReason}</p>
                        </div>
                    )}
                </div>
            )}
            
            <div className="flex justify-end mt-2">
                <button 
                    onClick={() => setExpanded(!expanded)}
                    className="text-blue-600 text-sm hover:text-blue-800 flex items-center"
                >
                    {expanded ? "Show Less" : "Show Details"}
                    <ArrowRight size={14} className={`ml-1 transition-transform ${expanded ? 'rotate-90' : ''}`} />
                </button>
            </div>
        </div>
    );
};

const AdminTransations = () => {
    const [activeTab, setActiveTab] = useState('sampleRequests');
    const [sampleRequests, setSampleRequests] = useState(initialSampleRequests);
    const [transactions, setTransactions] = useState(initialTransactions);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [transactionTypeFilter, setTransactionTypeFilter] = useState('');

    const handleUpdateSampleStatus = (id, newStatus) => {
        setSampleRequests(sampleRequests.map(request => 
            request.id === id ? { ...request, status: newStatus } : request
        ));
    };

    // Filter sample requests based on search and status filter
    const filteredSampleRequests = sampleRequests
        .filter(request => 
            request.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.brandName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(request => 
            statusFilter ? request.status === statusFilter : true
        );

    // Filter transactions based on search and type filter
    const filteredTransactions = transactions
        .filter(transaction => 
            transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.brandName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(transaction => 
            transactionTypeFilter ? transaction.type === transactionTypeFilter : true
        );

    // Get unique statuses for sample requests
    const sampleStatuses = [...new Set(sampleRequests.map(req => req.status))];
    
    // Get unique transaction types
    const transactionTypes = [...new Set(transactions.map(trx => trx.type))];

    // Stats for dashboard
    const pendingSampleRequests = sampleRequests.filter(req => req.status === 'Pending').length;
    const totalRevenue = transactions
        .filter(trx => trx.status === 'Completed')
        .reduce((sum, trx) => sum + trx.amount, 0);
    const refundedAmount = transactions
        .filter(trx => trx.status === 'Refunded')
        .reduce((sum, trx) => sum + trx.amount, 0);
    const activeSubscriptions = transactions
        .filter(trx => trx.type === 'Subscription' && trx.status === 'Completed')
        .length;

    return (
        <div className="absolute overflow-y-auto bg-[#fbfbfb] h-screen p-8 top-0 w-full left-0 xl:left-[250px] xl:w-[calc(100%-250px)]">
            <div className="container-fluid">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Transactions & Sample Requests</h1>
                        <p className="text-gray-500">Manage financial transactions and sample request processing</p>
                    </div>
                    
                    <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors">
                        <Download size={20} />
                        <span>Export Reports</span>
                    </button>
                </div>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-gray-500">Pending Samples</p>
                            <div className="p-2 rounded-full bg-yellow-100">
                                <Package size={20} className="text-yellow-600" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold">{pendingSampleRequests}</h2>
                        <p className="text-sm text-gray-500 mt-2">Requests awaiting approval</p>
                    </div>
                    
                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-gray-500">Total Revenue</p>
                            <div className="p-2 rounded-full bg-green-100">
                                <DollarSign size={20} className="text-green-600" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold">${totalRevenue.toFixed(2)}</h2>
                        <p className="text-sm text-gray-500 mt-2">From completed transactions</p>
                    </div>
                    
                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-gray-500">Refunded Amount</p>
                            <div className="p-2 rounded-full bg-red-100">
                                <RefreshCw size={20} className="text-red-600" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold">${refundedAmount.toFixed(2)}</h2>
                        <p className="text-sm text-gray-500 mt-2">Total refunded to customers</p>
                    </div>
                    
                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-gray-500">Active Subscriptions</p>
                            <div className="p-2 rounded-full bg-blue-100">
                                <CreditCard size={20} className="text-blue-600" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold">{activeSubscriptions}</h2>
                        <p className="text-sm text-gray-500 mt-2">Current active membership plans</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-6">
                    <button
                        className={`pb-4 px-4 font-medium text-sm transition-colors ${
                            activeTab === 'sampleRequests' 
                                ? 'border-b-2 border-blue-600 text-blue-600' 
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                        onClick={() => setActiveTab('sampleRequests')}
                    >
                        Sample Requests
                    </button>
                    <button
                        className={`pb-4 px-4 font-medium text-sm transition-colors ${
                            activeTab === 'transactions' 
                                ? 'border-b-2 border-blue-600 text-blue-600' 
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                        onClick={() => setActiveTab('transactions')}
                    >
                        Financial Transactions
                    </button>
                </div>

                {/* Search and Filters */}
                <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder={activeTab === 'sampleRequests' ? "Search sample requests..." : "Search transactions..."}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <select
                            value={activeTab === 'sampleRequests' ? statusFilter : transactionTypeFilter}
                            onChange={(e) => activeTab === 'sampleRequests' 
                                ? setStatusFilter(e.target.value)
                                : setTransactionTypeFilter(e.target.value)
                            }
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none"
                        >
                            <option value="">{activeTab === 'sampleRequests' ? "All Statuses" : "All Transaction Types"}</option>
                            {
                                activeTab === 'sampleRequests'
                                    ? sampleStatuses.map(status => (
                                        <option key={status} value={status}>{status}</option>
                                    ))
                                    : transactionTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))
                            }
                        </select>
                    </div>

                    <div className="relative">
                        <SortAsc className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <select
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none"
                        >
                            <option value="newest">Sort by Newest</option>
                            <option value="oldest">Sort by Oldest</option>
                            {activeTab === 'transactions' && (
                                <>
                                    <option value="amount-high">Sort by Amount (High to Low)</option>
                                    <option value="amount-low">Sort by Amount (Low to High)</option>
                                </>
                            )}
                        </select>
                    </div>
                </div>

                {/* Content based on active tab */}
                {activeTab === 'sampleRequests' ? (
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredSampleRequests.map((request) => (
                                <SampleRequestCard
                                    key={request.id}
                                    request={request}
                                    onUpdateStatus={handleUpdateSampleStatus}
                                />
                            ))}
                            {filteredSampleRequests.length === 0 && (
                                <div className="col-span-full text-center py-12">
                                    <Package size={48} className="mx-auto text-gray-400 mb-4" />
                                    <h3 className="text-lg font-semibold text-gray-600">No sample requests found</h3>
                                    <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div>
                        {filteredTransactions.map((transaction) => (
                            <TransactionRow
                                key={transaction.id}
                                transaction={transaction}
                            />
                        ))}
                        {filteredTransactions.length === 0 && (
                            <div className="text-center py-12">
                                <CreditCard size={48} className="mx-auto text-gray-400 mb-4" />
                                <h3 className="text-lg font-semibold text-gray-600">No transactions found</h3>
                                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminTransations;