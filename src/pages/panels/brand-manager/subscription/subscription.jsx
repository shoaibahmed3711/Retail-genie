import React, { useState } from 'react';
import { CreditCard, Package, ChevronUp, ChevronDown, CheckCircle, Download } from 'lucide-react';

const SubscriptionDashboard = () => {
  // Current subscription data
  const [currentSubscription, setCurrentSubscription] = useState({
    planName: 'Business Pro',
    price: 49.99,
    billingCycle: 'monthly',
    nextBillingDate: '2023-07-15',
    status: 'active',
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
      features: [
        'Up to 2 brand profiles',
        'Basic analytics',
        'Team collaboration (up to 3 users)',
        'Standard reporting'
      ],
      recommended: false
    },
    {
      id: 2,
      name: 'Business Pro',
      price: 49.99,
      features: [
        'Up to 5 brand profiles',
        'Full analytics access',
        'Team collaboration (up to 10 users)',
        'Custom reporting',
        'API access'
      ],
      current: true
    },
    {
      id: 3,
      name: 'Enterprise',
      price: 99.99,
      features: [
        'Up to 15 brand profiles',
        'Advanced analytics with custom metrics',
        'Unlimited team collaboration',
        'White-label reporting',
        'Dedicated account manager'
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
    }
  ]);

  // State for expanding/collapsing sections
  const [expandedSections, setExpandedSections] = useState({
    currentPlan: true,
    availablePlans: true,
    billing: true
  });

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  return (
    <div className="absolute overflow-y-auto bg-[#fbfbfb] h-screen p-8 top-0 w-full left-0 xl:left-[250px] xl:w-[calc(100%-250px)]">
      <div className="container-fluid mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">My Subscription</h1>
          <p className="text-sm text-gray-500">Manage your subscription and billing information</p>
        </div>

        {/* Current Plan Section */}
        <div className="bg-white rounded-lg shadow mb-6 overflow-hidden">
          <div 
            className="flex items-center justify-between px-6 py-4 border-b border-gray-200 cursor-pointer"
            onClick={() => toggleSection('currentPlan')}
          >
            <div className="flex items-center">
              <Package className="w-5 h-5 text-blue-600 mr-2" />
              <h2 className="text-lg font-medium text-gray-800">Current Plan</h2>
            </div>
            {expandedSections.currentPlan ? 
              <ChevronUp className="w-5 h-5 text-gray-500" /> : 
              <ChevronDown className="w-5 h-5 text-gray-500" />
            }
          </div>
          
          {expandedSections.currentPlan && (
            <div className="p-6">
              <div className="flex items-center mb-6">
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
              
              <div className="mt-6 flex justify-end">
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm font-medium">
                  Change Plan
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Available Plans Section */}
        <div className="bg-white rounded-lg shadow mb-6 overflow-hidden">
          <div 
            className="flex items-center justify-between px-6 py-4 border-b border-gray-200 cursor-pointer"
            onClick={() => toggleSection('availablePlans')}
          >
            <div className="flex items-center">
              <Package className="w-5 h-5 text-blue-600 mr-2" />
              <h2 className="text-lg font-medium text-gray-800">Available Plans</h2>
            </div>
            {expandedSections.availablePlans ? 
              <ChevronUp className="w-5 h-5 text-gray-500" /> : 
              <ChevronDown className="w-5 h-5 text-gray-500" />
            }
          </div>
          
          {expandedSections.availablePlans && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{plan.name}</h3>
                      <div className="flex items-baseline mb-4">
                        <span className="text-2xl font-bold text-gray-900">${plan.price}</span>
                        <span className="text-gray-600 ml-1">/month</span>
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
                        className={`w-full py-2 px-4 rounded text-sm font-medium ${
                          plan.current ? 
                            'bg-gray-200 text-gray-600 cursor-not-allowed' : 
                            plan.recommended ? 
                              'bg-green-600 text-white hover:bg-green-700' :
                              'bg-blue-600 text-white hover:bg-blue-700'
                        } transition-colors`}
                        disabled={plan.current}
                      >
                        {plan.current ? 'Current Plan' : 'Select Plan'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Billing History Section */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div 
            className="flex items-center justify-between px-6 py-4 border-b border-gray-200 cursor-pointer"
            onClick={() => toggleSection('billing')}
          >
            <div className="flex items-center">
              <CreditCard className="w-5 h-5 text-blue-600 mr-2" />
              <h2 className="text-lg font-medium text-gray-800">Billing History</h2>
            </div>
            {expandedSections.billing ? 
              <ChevronUp className="w-5 h-5 text-gray-500" /> : 
              <ChevronDown className="w-5 h-5 text-gray-500" />
            }
          </div>
          
          {expandedSections.billing && (
            <div className="p-6">
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
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Paid
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
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDashboard;