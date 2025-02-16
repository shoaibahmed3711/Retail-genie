import React, { useState } from 'react';
import {
  CreditCard, Package, ChevronUp, ChevronDown, CheckCircle,
  Download, Calendar, DollarSign, ArrowRight, ShieldCheck,
  Clock, AlertTriangle, Edit, Printer, HelpCircle
} from 'lucide-react';

const BrandManagerSubscription = () => {
  // Current subscription data
  const [currentSubscription, setCurrentSubscription] = useState({
    planName: 'Business Pro',
    price: 49.99,
    billingCycle: 'monthly',
    nextBillingDate: '2023-07-15',
    status: 'active',
    brandsAllowed: 5,
    brandsUsed: 3,
    features: [
      'Up to 5 brand profiles',
      'Full analytics access',
      'Team collaboration (up to 10 users)',
      'Custom reporting',
      'API access'
    ]
  });

  // Available plans for upgrade
  const [availablePlans, setAvailablePlans] = useState([
    {
      id: 1,
      name: 'Starter',
      price: 19.99,
      brandsAllowed: 2,
      features: [
        'Up to 2 brand profiles',
        'Basic analytics',
        'Team collaboration (up to 3 users)',
        'Standard reporting',
        'Email support'
      ],
      recommended: false
    },
    {
      id: 2,
      name: 'Business Pro',
      price: 49.99,
      brandsAllowed: 5,
      features: [
        'Up to 5 brand profiles',
        'Full analytics access',
        'Team collaboration (up to 10 users)',
        'Custom reporting',
        'API access',
        'Priority support'
      ],
      recommended: false,
      current: true
    },
    {
      id: 3,
      name: 'Enterprise',
      price: 99.99,
      brandsAllowed: 15,
      features: [
        'Up to 15 brand profiles',
        'Advanced analytics with custom metrics',
        'Unlimited team collaboration',
        'White-label reporting',
        'Full API access',
        'Dedicated account manager',
        'SLA guarantees'
      ],
      recommended: true
    }
  ]);

  // Billing history
  const [billingHistory, setBillingHistory] = useState([
    {
      id: 'INV-2023-06',
      date: '2023-06-15',
      amount: 49.99,
      status: 'paid',
      downloadUrl: '#'
    },
    {
      id: 'INV-2023-05',
      date: '2023-05-15',
      amount: 49.99,
      status: 'paid',
      downloadUrl: '#'
    },
    {
      id: 'INV-2023-04',
      date: '2023-04-15',
      amount: 49.99,
      status: 'paid',
      downloadUrl: '#'
    },
    {
      id: 'INV-2023-03',
      date: '2023-03-15',
      amount: 19.99,
      status: 'paid',
      downloadUrl: '#'
    }
  ]);

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState({
    type: 'credit_card',
    brand: 'Visa',
    last4: '4242',
    expMonth: 12,
    expYear: 2024
  });

  // State for expanding/collapsing sections
  const [expandedSections, setExpandedSections] = useState({
    overview: true,
    plans: true,
    billing: true
  });

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  // Calculate brand usage percentage
  const brandUsagePercentage = (currentSubscription.brandsUsed / currentSubscription.brandsAllowed) * 100;

  return (
    <div className="absolute overflow-y-auto bg-[#fbfbfb] h-screen p-8 top-0 w-full left-0 xl:left-[250px] xl:w-[calc(100%-250px)]">
      <div className="container-fluid mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Subscription Management</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your subscription, billing, and plan details</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center mr-2">
              <HelpCircle className="w-4 h-4 mr-2" />
              Contact Support
            </button>
          </div>
        </div>

        {/* Subscription Overview Section */}
        <div className="bg-white rounded-xl shadow mb-6 overflow-hidden">
          <div 
            className="flex items-center justify-between px-6 py-4 border-b border-gray-200 cursor-pointer"
            onClick={() => toggleSection('overview')}
          >
            <div className="flex items-center">
              <Package className="w-5 h-5 text-blue-600 mr-2" />
              <h2 className="text-lg font-medium text-gray-800">Subscription Overview</h2>
            </div>
            {expandedSections.overview ? 
              <ChevronUp className="w-5 h-5 text-gray-500" /> : 
              <ChevronDown className="w-5 h-5 text-gray-500" />
            }
          </div>
          
          {expandedSections.overview && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Current Plan</h3>
                    <div className="flex items-center">
                      <div className="bg-blue-100 rounded-lg p-3">
                        <Package className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-xl font-semibold text-gray-800">{currentSubscription.planName}</h4>
                        <p className="text-gray-600 mt-1">
                          ${currentSubscription.price}/month • Renews on {new Date(currentSubscription.nextBillingDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Plan Features</h3>
                    <ul className="space-y-2">
                      {currentSubscription.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div>
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Brand Usage</h3>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700">
                          Using {currentSubscription.brandsUsed} of {currentSubscription.brandsAllowed} brands
                        </span>
                        <span className="text-sm font-medium text-blue-600">
                          {Math.round(brandUsagePercentage)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${brandUsagePercentage}%` }}
                        ></div>
                      </div>
                      
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {currentSubscription.brandsAllowed - currentSubscription.brandsUsed} brands remaining
                        </span>
                        {brandUsagePercentage > 80 && (
                          <span className="text-sm text-orange-600 flex items-center">
                            <AlertTriangle className="w-4 h-4 mr-1" />
                            Approaching limit
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Subscription Status</h3>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`h-3 w-3 rounded-full ${
                            currentSubscription.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                          } mr-2`}></div>
                          <span className="text-gray-700 capitalize">{currentSubscription.status}</span>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Change Plan
                        </button>
                      </div>
                      <div className="mt-4 flex items-center">
                        <Clock className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">
                          Next billing on {new Date(currentSubscription.nextBillingDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Upgrade Options Section */}
        <div className="bg-white rounded-xl shadow mb-6 overflow-hidden">
          <div 
            className="flex items-center justify-between px-6 py-4 border-b border-gray-200 cursor-pointer"
            onClick={() => toggleSection('plans')}
          >
            <div className="flex items-center">
              <ArrowRight className="w-5 h-5 text-blue-600 mr-2" />
              <h2 className="text-lg font-medium text-gray-800">Upgrade Options</h2>
            </div>
            {expandedSections.plans ? 
              <ChevronUp className="w-5 h-5 text-gray-500" /> : 
              <ChevronDown className="w-5 h-5 text-gray-500" />
            }
          </div>
          
          {expandedSections.plans && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {availablePlans.map((plan) => (
                  <div 
                    key={plan.id} 
                    className={`border rounded-lg overflow-hidden relative ${
                      plan.current ? 'border-blue-400 bg-blue-50' : 
                      plan.recommended ? 'border-green-400' : 'border-gray-200'
                    }`}
                  >
                    {plan.recommended && (
                      <div className="bg-green-500 text-white text-xs font-bold py-1 px-3 absolute top-0 right-0 rounded-bl-lg">
                        Recommended
                      </div>
                    )}
                    {plan.current && (
                      <div className="bg-blue-500 text-white text-xs font-bold py-1 px-3 absolute top-0 right-0 rounded-bl-lg">
                        Current Plan
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{plan.name}</h3>
                      <div className="flex items-baseline mb-4">
                        <span className="text-2xl font-bold text-gray-900">${plan.price}</span>
                        <span className="text-gray-600 ml-1">/month</span>
                      </div>
                      <div className="mb-4">
                        <span className="text-sm font-medium text-gray-700">
                          Up to {plan.brandsAllowed} brands
                        </span>
                      </div>
                      <ul className="space-y-2 mb-6">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <button 
                        className={`w-full py-2 px-4 rounded-lg text-sm font-medium ${
                          plan.current ? 
                            'bg-gray-200 text-gray-600 cursor-not-allowed' : 
                            plan.recommended ? 
                              'bg-green-600 text-white hover:bg-green-700' :
                              'bg-blue-600 text-white hover:bg-blue-700'
                        } transition-colors`}
                        disabled={plan.current}
                      >
                        {plan.current ? 'Current Plan' : 'Upgrade Plan'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <p className="text-gray-600 text-sm">
                  Need a custom plan for your business?
                  <a href="#" className="text-blue-600 font-medium ml-1 hover:underline">
                    Contact our sales team
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Billing Information Section */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div 
            className="flex items-center justify-between px-6 py-4 border-b border-gray-200 cursor-pointer"
            onClick={() => toggleSection('billing')}
          >
            <div className="flex items-center">
              <CreditCard className="w-5 h-5 text-blue-600 mr-2" />
              <h2 className="text-lg font-medium text-gray-800">Billing Information</h2>
            </div>
            {expandedSections.billing ? 
              <ChevronUp className="w-5 h-5 text-gray-500" /> : 
              <ChevronDown className="w-5 h-5 text-gray-500" />
            }
          </div>
          
          {expandedSections.billing && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Payment Method</h3>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="bg-gray-100 rounded p-2 mr-3">
                          <CreditCard className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            {paymentMethod.brand} •••• {paymentMethod.last4}
                          </p>
                          <p className="text-sm text-gray-600">
                            Expires {paymentMethod.expMonth}/{paymentMethod.expYear}
                          </p>
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800">
                        <Edit className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Update payment method
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 text-sm">
                        View all payment methods
                      </button>
                    </div>
                  </div>
                  
                  <h3 className="text-sm font-medium text-gray-500 mt-6 mb-3">Billing Address</h3>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-800 mb-1">Acme Corporation</p>
                    <p className="text-gray-600 text-sm mb-1">123 Business Ave, Suite 100</p>
                    <p className="text-gray-600 text-sm mb-1">San Francisco, CA 94107</p>
                    <p className="text-gray-600 text-sm">United States</p>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-4">
                      Update billing address
                    </button>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-500">Billing History</h3>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                      <Printer className="w-4 h-4 mr-1" />
                      Print Statement
                    </button>
                  </div>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Invoice
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {billingHistory.map((invoice) => (
                          <tr key={invoice.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {invoice.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(invoice.date).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              ${invoice.amount.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                invoice.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {invoice.status === 'paid' ? 
                                  <CheckCircle className="w-3 h-3 mr-1" /> : 
                                  <AlertTriangle className="w-3 h-3 mr-1" />
                                }
                                {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <a 
                                href={invoice.downloadUrl} 
                                className="text-blue-600 hover:text-blue-900 flex items-center justify-end"
                              >
                                <Download className="w-4 h-4 mr-1" />
                                Download
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    
                    {billingHistory.length === 0 && (
                      <div className="py-8 text-center">
                        <p className="text-gray-500 text-sm">No billing history available</p>
                      </div>
                    )}
                    
                    <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 text-right">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View all invoices
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandManagerSubscription;