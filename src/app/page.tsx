import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Founder from "@/components/Founder";
import Hero from "@/components/Hero";
import OurWork from "@/components/OurWork";
import Services from "@/components/Services";
import Testimonial from "@/components/Testimonial";

export default function HomePage() {
  return (
    <main>
      <Hero
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
      />
      <Services/>
      <OurWork/>
      <Testimonial/>
      <Founder/>
      <Faq/>
    </main>
  );
}
