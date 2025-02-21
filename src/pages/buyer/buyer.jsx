import React from 'react'
import HeroSection from './hero/hero'
import JoinSection from './joining/joining'

import { BlogSection } from './blogs/blogs'
import FeaturesSection from './features/features'
import PricingCards from '../home/pricingCards/pricingCards'

const BuyerPage = () => {
  return (
    <div>
      <HeroSection />
      <JoinSection />
      <PricingCards />
      <BlogSection />
      <FeaturesSection />
      </div>
  )
}

export default BuyerPage
