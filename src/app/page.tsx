import React from 'react'
import Navbar from './components/navigation'
import Hero from './components/hero'
import ProductsSection from './components/products'
import PartnersAndWhyUs from './components/partnersandwhyus'
import TestimonialSection from './components/testimonial'
import AboutSection from './components/moreaboutus'
import GetStartedSection from './components/getstarted'
import Footer from './components/footer'

function Landing() {
  return (
    <>
      <Navbar />
      <Hero/>
      <ProductsSection />
      <PartnersAndWhyUs />
      <TestimonialSection />
      <AboutSection />
      <GetStartedSection />
      <Footer />
    </>
  )
}

export default Landing