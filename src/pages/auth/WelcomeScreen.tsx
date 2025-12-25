import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import salonInterior from "@/assets/salon-interior.jpg";

export default function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={salonInterior}
          alt="Salon"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex min-h-screen flex-col justify-end p-6 pb-12"
      >
        {/* Logo / Brand */}
        <div className="mb-8 text-center">
          <h1 className="font-display text-4xl font-bold text-primary">stylize</h1>
          <p className="mt-2 text-sm uppercase tracking-widest text-muted-foreground">
            Top Rated Salons For You
          </p>
        </div>

        {/* Title */}
        <div className="mb-8 text-center">
          <h2 className="font-display text-2xl font-semibold text-foreground">
            Book an Appointment for Salon, Spa & Barber
          </h2>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <Button
            variant="dark"
            size="xl"
            className="w-full"
            onClick={() => navigate("/login")}
          >
            Continue with Facebook
          </Button>
          <Button
            variant="dark"
            size="xl"
            className="w-full"
            onClick={() => navigate("/login")}
          >
            Continue with Google
          </Button>
        </div>

        {/* Sign In Link */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-primary font-medium"
          >
            Sign In
          </button>
        </p>
      </motion.div>
    </div>
  );
}
