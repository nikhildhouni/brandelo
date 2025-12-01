import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import FounderSection from "@/components/FounderSection";
import Founder from "@/components/Founder";
import Hero from "@/components/Hero";
import Hero2 from "@/components/hero2";
import OurWork from "@/components/OurWork";
import Services from "@/components/Services";
import Services2 from "@/components/Services2";
import Testimonial from "@/components/Testimonial";
import WorkSection from "@/components/WorkSection";
import TestimonialSection from "@/components/Testimonial2";

export default function HomePage() {
  return (
    <main>
      <Hero2/>
      <Services2/>
      {/* <Hero
        mainImage="/images/hero/main.jpg"
        smallTop="/images/hero/top.jpg"
        smallMid="/images/hero/mid.jpg"
        smallBottom="/images/hero/bottom.jpg"
        services={[
          "Social Media Marketing",
          "Website Development",
          "UI/UX Design",
          "Content Marketing",
          "Email Marketing",
          "App Development",
          "SEO Services",
        ]}
      /> */}
      {/* <Services/> */}
      {/* <OurWork/> */}
      <WorkSection/>
      {/* <Testimonial/> */}
      <TestimonialSection/>
      <FounderSection/>
      {/* <Founder/> */}
      <Faq/>
    </main>
  );
}
