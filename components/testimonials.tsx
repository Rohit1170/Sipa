"use client";

import { useInView } from "react-intersection-observer";
import { CircularTestimonials } from "./circular-testimonials";
const testimonials = [
  {
    quote:
      "I really liked the overall quality and convenience of these sachets. The packaging feels premium, the flavour is pleasant, and it’s super easy to include in my daily routine without any hassle.",
    name: "Gautam",
    designation: "Business Owner",
    src: "/person1.jpeg",
  },
  {
    quote:
      "I’ve been using SIPA D3 + K2 consistently for the past few weeks and the experience has been great so far. The sachets are easy to carry, simple to consume, and fit perfectly into my everyday schedule.",
    name: "Sunidhi Kumari",
    designation: "Verified Buyer",
    src: "/person2.jpeg",
  },
  {
    quote:
      "The orange flavour was honestly a pleasant surprise. It tastes much better compared to regular capsules or tablets, which makes it something I actually look forward to taking every day.",
    name: "Kasish",
    designation: "Fitness model and Zumba instructor",
    src: "/person3.jpeg",
  },
  {
    quote:
      "The product feels thoughtfully designed from the packaging to the formulation itself. Everything about it gives a clean and premium impression, and the sachet format is really convenient.",
    name: "Abhishek Soni",
    designation: "Fitness freak",
    src: "/person4.jpeg",
  },
  {
    quote:
      "I appreciate how convenient and well-packaged the product is. The flavour is nice, the sachets are easy to use on the go, and the overall experience feels premium and reliable.",
    name: "Shruti",
    designation: "Influencer",
    src: "/person5.jpeg",
  },
];

export default function Testimonials() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <section
      id="testimonials"
      ref={ref}
      className="bg-[#f7f4ef] py-16 lg:py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full">

        {/* Top rule */}
        <div
          className={`h-px bg-neutral-300 mb-10 transition-all duration-1000 ${
            inView ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          }`}
          style={{ transformOrigin: "left" }}
        />

        {/* Header */}
        <div
          className={`mb-12 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p
            className="text-xs uppercase tracking-[0.3em] text-orange-700 font-semibold mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Customer Reviews
          </p>
          <h2
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-neutral-900 leading-[1.05]"
            style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.025em" }}
          >
            Real People,
            <br />
            <em className="italic text-orange-700">Real Results.</em>
          </h2>
        </div>

        {/* Circular Testimonials */}
        <div
          className={`transition-all duration-700 flex justify-center ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          <CircularTestimonials
            testimonials={testimonials}
            autoplay={true}
            colors={{
              name: "#1a1a1a",
              designation: "#a16207",   // orange-700 to match brand
              testimony: "#404040",
              arrowBackground: "#1a1a1a",
              arrowForeground: "#f7f4ef",
              arrowHoverBackground: "#c2410c", // orange-700 hover
            }}
            fontSizes={{
              name: "28px",
              designation: "14px",
              quote: "18px",
            }}
          />
        </div>

        {/* Bottom rule */}
        <div
          className={`h-px bg-neutral-300 mt-12 transition-all duration-1000 delay-700 ${
            inView ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          }`}
          style={{ transformOrigin: "right" }}
        />

      </div>
    </section>
  );
}