import React from 'react'
import { HeroSectionPricing } from './Hero'
import PricingCards from './pricingCards'
import { Notion } from './Notion'
import { Stick } from './Stick'
import { Used } from './Used'
import FAQAccordion from './FAQAccordion'
import { Easy } from './Easy'
const Pricing = () => {
  return (
    <div className="landing  max-w-[1200px] mx-auto">
      <HeroSectionPricing />
      <PricingCards />
      <Notion />
      <Stick />
      <Used />
      <FAQAccordion />
      <Easy />
    </div>
  )
}

export default Pricing