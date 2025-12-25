import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBarber from "@/assets/hero-barber.jpg";
import salonInterior from "@/assets/salon-interior.jpg";
import barberPortrait from "@/assets/barber-portrait.jpg";

const slides = [
  {
    image: heroBarber,
    title: "The Professional Specialists In Nearby",
    description: "Get an overview of how you are performing & motivate yourself to achieve even more.",
  },
  {
    image: salonInterior,
    title: "Find Near By Salons & Book Services",
    description: "Get an overview of how you are performing & motivate yourself to achieve even more.",
  },
  {
    image: barberPortrait,
    title: "Style That Fit Your Daily Lifestyle",
    description: "Get an overview of how you are performing & motivate yourself to achieve even more.",
  },
];

export default function SplashScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      navigate("/welcome");
    }
  };

  const handleSkip = () => {
    navigate("/welcome");
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <img
            src={slides[currentSlide].image}
            alt="Barber shop"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col justify-end p-6 pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h1 className="font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
              {slides[currentSlide].title}
            </h1>
            <p className="text-base text-muted-foreground">
              {slides[currentSlide].description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          {/* Dots */}
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "w-8 bg-primary"
                    : "w-2 bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <Button
            variant="gold"
            size="icon"
            onClick={handleNext}
            className="h-14 w-14 rounded-full"
          >
            <ArrowRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Skip */}
        <button
          onClick={handleSkip}
          className="mt-6 text-center text-sm text-muted-foreground"
        >
          Skip to Get Started
        </button>
      </div>
    </div>
  );
}
