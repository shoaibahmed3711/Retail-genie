import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// components
import Header from './components/header'
import Footer from './components/footer'
import Navbar from './components/sidebar'
// Brand owner panel

import BrandOwnerOverview from './pages/ownerPanel/overview/overview'
import MyBrand from './pages/ownerPanel/my-brand/my-brand'
import Products from './pages/ownerPanel/products/products'
import Analystics from './pages/ownerPanel/analytics/analytics'
import Settings from './pages/ownerPanel/settings/settings'
// pages
import Home from './pages/home/home'


const router = createBrowserRouter([
  {
    path: "/",
    element: <><Header /><Home /><Footer /></>,
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
]);

function App() {
  return <>
    <RouterProvider router={router} />
  </>
}

export default App;
