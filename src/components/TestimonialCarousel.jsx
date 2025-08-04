import React, { useEffect, useRef, useState } from "react";
import "./TestimonialCarousel.css";

const testimonials = [
  {
    text: "OrganLink made the transplant process seamless and stress-free. The team was supportive every step of the way!",
    author: "Dr. Priya Menon",
    title: "Chief Medical Officer, Global Health Alliance",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    text: "Thanks to OrganLink, we matched a donor in record time. The platform is intuitive and reliable.",
    author: "Mr. Rajesh Kumar",
    title: "Transplant Coordinator, City Hospital",
    rating: 4,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    text: "The real-time updates and secure data sharing gave us peace of mind. Highly recommended!",
    author: "Ms. Anjali Patel",
    title: "Patient Family Member",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    text: "OrganLink's workflow automation saved us hours of paperwork. A game-changer for our hospital.",
    author: "Dr. Suresh Iyer",
    title: "Head of Surgery, Metro Medical Center",
    rating: 4,
    avatar: "https://randomuser.me/api/portraits/men/45.jpg"
  },
  {
    text: "The platform's transparency and compliance features are unmatched. We trust OrganLink for every case.",
    author: "Dr. Meera Singh",
    title: "Director, Organ Donation NGO",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    text: "From registration to transplant, OrganLink kept us informed and connected. Exceptional service!",
    author: "Mr. Vinod Sharma",
    title: "Donor Family Representative",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/77.jpg"
  }
];

const VISIBLE_CARDS = 3;
const AUTO_SLIDE_INTERVAL = 3000;

function StarRating({ rating }) {
  return (
    <div className="star-rating">
      {[1,2,3,4,5].map((n) => (
        <span key={n} className={n <= rating ? "star filled" : "star"}>★</span>
      ))}
    </div>
  );
}

export default function TestimonialCarousel() {
  const [start, setStart] = useState(0);
  const timeoutRef = useRef();
  const numDots = testimonials.length;

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setStart((prev) => (prev + 1) % testimonials.length);
    }, AUTO_SLIDE_INTERVAL);
    return () => clearTimeout(timeoutRef.current);
  }, [start]);

  const getVisibleTestimonials = () => {
    let arr = [];
    for (let i = 0; i < VISIBLE_CARDS; i++) {
      arr.push(testimonials[(start + i) % testimonials.length]);
    }
    return arr;
  };

  const handleDotClick = (idx) => {
    setStart(idx);
  };

  const visible = getVisibleTestimonials();

  return (
    <div className="testimonial-carousel-outer">
      <div className="testimonial-carousel testimonial-carousel-animated">
        {visible.map((t, idx) => (
          <div className={"testimonial-card enhanced" + (idx === 1 ? " center" : "")} key={idx}>
            <div className="testimonial-avatar">
              <img src={t.avatar} alt={t.author} />
            </div>
            <div className="testimonial-content">
              <p className="testimonial-text">{t.text}</p>
            </div>
            <StarRating rating={t.rating} />
            <div className="testimonial-author">
              <p className="author-name">{t.author}</p>
              <p className="author-title">{t.title}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="testimonial-carousel-dots">
        {Array.from({ length: numDots }).map((_, idx) => (
          <span
            key={idx}
            className={"testimonial-dot" + (start % numDots === idx ? " active" : "")}
            onClick={() => handleDotClick(idx)}
          />
        ))}
      </div>
    </div>
  );
}
