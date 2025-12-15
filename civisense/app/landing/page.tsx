"use client";
import Hero from "./hero";
import HowItWorks from "./how-it-works";
import Navbar from "./Navbar";
import GovernmentServices from "./services";
import AboutUs from "./about";
import BannerAndFooter from "./footer";
import LandingLayout from './Layout';

export default function LandingPage() {
    return (
        <LandingLayout>
          <main className="min-h-screen">
            <Navbar />
            <Hero />
            <GovernmentServices/>
            <HowItWorks />
            <AboutUs/>
            <BannerAndFooter/>
          </main>
        </LandingLayout>
    );
}