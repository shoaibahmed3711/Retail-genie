import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// contexts

import { AuthProvider } from './contexts/AuthContext'

// components
import Header from './components/header'
import Footer from './components/footer'
import Navbar from './components/sidebar'
import BrandManagerSidebar from './components/brandManagerSidebar'
import BuyerSidebar from './components/buyerSidebar'
import AdminSidebar from './components/adminSidebar'

// authentication
import LoginPage from './auth/login/login'
import SignUpPage from './auth/sign-up/sign-up'
import Onboarding from './auth/onboarding/onboarding'
import VerificationCode from './auth/validation/validation'
import VerifyEmail from './auth/VerifyEmail/VerifyEmail'
import ResetPassword from './auth/ResetPassword/ResetPassword'

// Brand owner panel
import BrandOwnerOverview from './pages/ownerPanel/overview/overview'
import MyBrand from './pages/ownerPanel/my-brand/my-brand'
import Products from './pages/ownerPanel/products/products'
import Analystics from './pages/ownerPanel/analytics/analytics'
import Settings from './pages/ownerPanel/settings/settings'

//Brand Manager dashboard
import BrandManagerSettings from './pages/panels/brand-manager/settings/settings'
import BrandManagerTeam from './pages/panels/brand-manager/team/team'
import BrandManagerAnalytics from './pages/panels/brand-manager/analytics/analytics'
import BrandManagerDashboard from './pages/panels/brand-manager/dashboard/dashboard'
import BrandManagerBrands from './pages/panels/brand-manager/brands/brands'
import BrandManagerProducts from './pages/panels/brand-manager/products/products'
import BrandManagerSubscription from './pages/panels/brand-manager/subscription/subscription'

//Buyer dashboard
import BuyerOverview from './pages/panels/buyer/overview/overview'
import BuyerBrands from './pages/panels/buyer/brands/brands'
import BuyerProducts from './pages/panels/buyer/products/products'
import BuyerFavourites from './pages/panels/buyer/favorites/favourites'
import BuyerRequests from './pages/panels/buyer/requests/requests'
import BuyerMeetings from './pages/panels/buyer/meetings/meetings'
import BuyerHistory from './pages/panels/buyer/history/history'
import BuyerSettings from './pages/panels/buyer/settings/settings'

// Admin dashboard
import AdminOverview from './pages/panels/admin/overview/overview'
import AdminProduct from './pages/panels/admin/product/product'
import AdminRole from './pages/panels/admin/roles/role'
import AdminTransations from './pages/panels/admin/transactions/transations'
import AdminSettings from './pages/panels/admin/settings/settings'

// pages
import Home from './pages/home/home'
import Pricing from './pages/pricing/Pricing'
import Contact from './pages/contact/contact'
import BrandOwnerpage from './pages/brand-owner/brand-owner'
import BrandManagerPage from './pages/brand-manager/brand-manager'
import BuyerPage from './pages/buyer/buyer'

const router = createBrowserRouter([
  {
    children: [
      {
        path: "/",
        element: <><Header /><Home /><Footer /></>,
      },
      {
        path: "/BrandOwner",
        element: <><Header /><BrandOwnerpage /><Footer /></>,
      },
      {
        path: "/BrandManager",
        element: <><Header /><BrandManagerPage /><Footer /></>,
      },
      {
        path: "/Buyer",
        element: <><Header /><BuyerPage /><Footer /></>,
      },
      {
        path: "/pricing",
        element: <><Header /><Pricing /><Footer /></>,
      },
      {
        path: "/contact",
        element: <><Header /><Contact /><Footer /></>,
      },

      // Buyer Dashboard
      {
        path: "/BuyerOverview",
        element: <><BuyerSidebar /><BuyerOverview /></>,
      },
      {
        path: "/BuyerBrands",
        element: <><BuyerSidebar /><BuyerBrands /></>,
      },
      {
        path: "/BuyerProducts",
        element: <><BuyerSidebar /><BuyerProducts /></>,
      },
      {
        path: "/BuyerFavourites",
        element: <><BuyerSidebar /><BuyerFavourites /></>,
      },
      {
        path: "/BuyerRequests",
        element: <><BuyerSidebar /><BuyerRequests /></>,
      },
      {
        path: "/BuyerMeetings",
        element: <><BuyerSidebar /><BuyerMeetings /></>,
      },
      {
        path: "/BuyerHistory",
        element: <><BuyerSidebar /><BuyerHistory /></>,
      },
      {
        path: "/BuyerSettings",
        element: <><BuyerSidebar /><BuyerSettings /></>,
      },

      //Brand owner dashboard
      {
        path: "/Overview",
        element: <><Navbar /><BrandOwnerOverview /></>,
      },
      {
        path: "/MyBrand",
        element: <><Navbar /><MyBrand /></>,
      },
      {
        path: "/Products",
        element: <><Navbar /><Products /></>,
      },
      {
        path: "/Analytics",
        element: <><Navbar /><Analystics /></>,
      },
      {
        path: "/Settings",
        element: <><Navbar /><Settings /></>,
      },

      //Brand Manager dashboard
      {
        path: "/brandManagerDashboard",
        element: <><BrandManagerSidebar /><BrandManagerDashboard /></>,
      },
      {
        path: "/brandManagerBrand",
        element: <><BrandManagerSidebar /><BrandManagerBrands /></>,
      },
      {
        path: "/brandManagerProducts",
        element: <><BrandManagerSidebar /><BrandManagerProducts /></>,
      },
      {
        path: "/brandManagerTeam",
        element: <><BrandManagerSidebar /><BrandManagerTeam /></>,
      },
      {
        path: "/brandManagerSubscription",
        element: <><BrandManagerSidebar /><BrandManagerSubscription /></>,
      },
      {
        path: "/brandManagerAnalytics",
        element: <><BrandManagerSidebar /><BrandManagerAnalytics /></>,
      },
      {
        path: "/brandManagerSettings",
        element: <><BrandManagerSidebar /><BrandManagerSettings /></>,
      },

      //Admin dashboard
      {
        path: "/AdminOverview",
        element: <><AdminSidebar /><AdminOverview /></>,
      },
      {
        path: "/AdminProduct",
        element: <><AdminSidebar /><AdminProduct /></>,
      },
      {
        path: "/AdminRole",
        element: <><AdminSidebar /><AdminRole /></>,
      },
      {
        path: "/AdminTransations",
        element: <><AdminSidebar /><AdminTransations /></>,
      },
      {
        path: "/AdminSettings",
        element: <><AdminSidebar /><AdminSettings /></>,
      },

      //authentication  
      {
        path: "/login",
        element: <><LoginPage /></>,
      },
      {
        path: "/Signup",
        element: <><SignUpPage /></>,
      },
      {
        path: "/VerificationCode",
        element: <><VerificationCode /></>,
      },
      {
        path: "/Onboarding",
        element: <><Onboarding /></>,
      },
      {
        path: "/VerifyEmail",
        element: <><VerifyEmail /></>,
      },
      {
        path: "/ResetPassword",
        element: <><ResetPassword /></>,
      },
    ]
  }
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App;
