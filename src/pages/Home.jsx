// car-rental-platform/src/pages/Home.jsx

import Hero from "../components/home/Hero/Hero";
import SearchPanel from "../components/home/SearchPanel/SearchPanel";
import Stats from "../components/home/Stats/Stats";
import FeaturedCars from "../components/home/FeaturedCars/FeaturedCars";
import Categories from "../components/home/Categories/Categories";
import WhyChooseUs from "../components/home/WhyChooseUs/WhyChooseUs";
import HowItWorks from "../components/home/HowItWorks/HowItWorks";
import JourneySelector from "../components/home/JourneySelector/JourneySelector";
import Testimonials from "../components/home/Testimonials/Testimonials";
import FAQ from "../components/home/FAQ/FAQ";
import FinalCTA from "../components/home/FinalCTA/FinalCTA";


function Home() {
  return (
    <>
      <Hero />
      <SearchPanel />
      <Stats />
      <FeaturedCars />
      <Categories />
      <WhyChooseUs />
      <HowItWorks />
      <JourneySelector />
      <Testimonials />
      <FAQ />
      <FinalCTA />


    </>
  );
}

export default Home;