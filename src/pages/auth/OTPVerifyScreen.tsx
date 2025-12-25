import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OTPVerifyScreen() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timer, setTimer] = useState(59);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join("");
    if (code.length === 6) {
      navigate("/reset-password");
    }
  };

  return (
    <div className="min-h-screen w-full bg-background p-6 pt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-muted-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">
            Phone Verification
          </h1>
          <p className="mt-2 text-muted-foreground">
            Enter your OTP code here
          </p>
        </div>

        {/* OTP Input */}
        <div className="flex justify-center gap-3 mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`h-14 w-12 rounded-xl border-2 bg-input text-center text-xl font-semibold text-foreground transition-all
                ${digit ? "border-primary" : "border-border"}
                focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary`}
            />
          ))}
        </div>

        {/* Timer */}
        <div className="text-center mb-8">
          <p className="text-muted-foreground">
            <span className="text-primary font-medium">00:{timer.toString().padStart(2, "0")}</span>
          </p>
        </div>

        {/* Resend */}
        <p className="text-center text-sm text-muted-foreground mb-8">
          Didn't receive any code?{" "}
          <button className="text-primary font-medium">Resend a new code</button>
        </p>

        {/* Verify Button */}
        <Button
          variant="gold"
          size="xl"
          className="w-full"
          onClick={handleVerify}
          disabled={otp.some((d) => !d)}
        >
          Verify
        </Button>
      </motion.div>
    </div>
  );
}
