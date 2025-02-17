import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// components
import Header from './components/header'
import Footer from './components/footer'
import Navbar from './components/sidebar'
import BrandManagerSidebar from './components/brandManagerSidebar'
import BuyerSidebar from './components/buyerSidebar'
// Brand owner panel

import BrandOwnerOverview from './pages/ownerPanel/overview/overview'
import MyBrand from './pages/ownerPanel/my-brand/my-brand'
import Products from './pages/ownerPanel/products/products'
import Analystics from './pages/ownerPanel/analytics/analytics'
import Settings from './pages/ownerPanel/settings/settings'
// pages
import Home from './pages/home/home'

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


const router = createBrowserRouter([
  {
    path: "/",
    element: <><Header /><Home /><Footer /></>,
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
]);

function App() {
  return <>
    <RouterProvider router={router} />
  </>
}

export default App;
