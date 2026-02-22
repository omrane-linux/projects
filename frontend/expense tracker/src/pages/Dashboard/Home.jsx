import React from 'react'
import Banner from '../../components/home/banner'
import Hero from '../../components/home/hero'
import Features from '../../components/home/Features'
import Testimonials from '../../components/home/Testimonials'
import Footer from '../../components/home/Footer'

export const Home = () => {
  return (
    <div>
      <Banner />
      <Hero />
      <Features />
      <Testimonials />
      <Footer />
    </div>
  )
};

export default Home;
