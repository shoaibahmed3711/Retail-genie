import { createHashRouter, RouterProvider } from 'react-router-dom'
// contexts

import { AuthProvider } from './contexts/AuthContext'
import { ProductProvider } from './contexts/ProductContext'
import { BrandProvider } from './contexts/BrandContext'
import { TeamProvider } from './contexts/TeamContext'
import { BuyerProvider } from './contexts/BuyerContext'
import { MeetingsProvider } from './contexts/MeetingContext'
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
import ResetPassword from './auth/ResetPassword/ResetPassword'
import ForgotPassword from './auth/ForgotPassword/ForgotPassword'

// Brand owner panel
import BrandOwnerOverview from './pages/panels/ownerPanel/overview/overview'
import MyBrand from './pages/panels/ownerPanel/my-brand/my-brand'
import Products from './pages/panels/ownerPanel/products/products'
import Settings from './pages/panels/ownerPanel/settings/settings'

//Brand Manager dashboard
import BrandManagerSettings from './pages/panels/brand-manager/settings/settings'
import BrandManagerTeam from './pages/panels/brand-manager/team/team'
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

const router = createHashRouter([
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
        path: "/ResetPassword",
        element: <><ResetPassword /></>,
      },
      {
        path: "/ForgotPassword",
        element: <><ForgotPassword /></>,
      },
    ]
  }
]);

function App() {
  return (
    <MeetingsProvider>
      <BuyerProvider>
        <TeamProvider>
          <AuthProvider>
            <ProductProvider>
              <BrandProvider>
                <RouterProvider router={router} />
              </BrandProvider>
            </ProductProvider>
          </AuthProvider>
        </TeamProvider>
      </BuyerProvider>
    </MeetingsProvider>
  )
}

export default App;
