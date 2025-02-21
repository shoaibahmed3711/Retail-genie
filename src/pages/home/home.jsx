import React from 'react'
import HeroSection from './hero/hero'
import TrustedBySection from './trusted/trusted'
import JoinSection from './joining/joining'
import PricingCards from './pricingCards/pricingCards'
import { BlogSection } from './blogs/blogs'
import FeaturesSection from './features/features'

const Home = () => {
  return (
    <div>
        <HeroSection />
        <TrustedBySection />
        <JoinSection />
        <PricingCards />
        <BlogSection />
        <FeaturesSection />
    </div>
  )
}

export default Home