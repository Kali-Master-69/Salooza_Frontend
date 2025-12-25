import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordScreen() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "sent">("email");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("sent");
  };

  if (step === "sent") {
    return (
      <div className="min-h-screen w-full bg-background p-6 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-sm"
        >
          {/* Icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
            <Lock className="h-10 w-10 text-primary" />
          </div>

          {/* Content */}
          <h1 className="font-display text-2xl font-bold text-foreground">
            Code has been sent to reset a new password
          </h1>
          <p className="mt-4 text-muted-foreground">
            You'll shortly receive an email with a code to setup a new password.
          </p>

          {/* Button */}
          <Button
            variant="gold"
            size="xl"
            className="mt-8 w-full"
            onClick={() => navigate("/otp-verify")}
          >
            Done
          </Button>
        </motion.div>
      </div>
    );
  }

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
            Forgot Password
          </h1>
          <p className="mt-2 text-muted-foreground">
            Please enter your email address. You will receive a code to reset a
            new password via email.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm text-muted-foreground">
              Via email address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-12"
                required
              />
            </div>
          </div>

          <Button type="submit" variant="gold" size="xl" className="w-full">
            Reset Password
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
