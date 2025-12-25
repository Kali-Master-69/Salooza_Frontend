import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, User, Scissors, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const roles: { id: UserRole; label: string; icon: typeof User; description: string }[] = [
  {
    id: "customer",
    label: "Customer",
    icon: User,
    description: "Book appointments",
  },
  {
    id: "barber",
    label: "Barber",
    icon: Scissors,
    description: "Manage your shop",
  },
  {
    id: "admin",
    label: "Admin",
    icon: Shield,
    description: "Full system access",
  },
];

export default function RegisterScreen() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [step, setStep] = useState<"role" | "details">("role");
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole) {
      setStep("details");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;

    setIsLoading(true);
    try {
      await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: selectedRole,
      });

      // Navigate to respective dashboard based on role
      switch (selectedRole) {
        case "barber":
          navigate("/barber");
          break;
        case "admin":
          navigate("/admin");
          break;
        default:
          navigate("/customer");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (step === "role") {
    return (
      <div className="min-h-screen w-full bg-background p-6 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-foreground">
              Join Stylize
            </h1>
            <p className="mt-2 text-muted-foreground">
              Select your role to get started
            </p>
          </div>

          {/* Role Selection */}
          <div className="space-y-4">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => handleRoleSelect(role.id)}
                className={cn(
                  "w-full rounded-2xl border-2 p-5 text-left transition-all duration-300",
                  selectedRole === role.id
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card hover:border-primary/50"
                )}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "flex h-14 w-14 items-center justify-center rounded-xl transition-colors",
                      selectedRole === role.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    <role.icon className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {role.label}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {role.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Continue Button */}
          <Button
            variant="gold"
            size="xl"
            className="mt-8 w-full"
            onClick={handleContinue}
            disabled={!selectedRole}
          >
            Continue
          </Button>

          {/* Login Link */}
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

  return (
    <div className="min-h-screen w-full bg-background p-6 pt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Back Button */}
        <button
          onClick={() => setStep("role")}
          className="mb-6 text-muted-foreground"
        >
          ← Back
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">
            Create an Account
          </h1>
          <p className="mt-2 text-muted-foreground">
            Registering as{" "}
            <span className="text-primary font-medium capitalize">
              {selectedRole}
            </span>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-muted-foreground">
              Full Name
            </label>
            <Input
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-muted-foreground">
              Email Address
            </label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-muted-foreground">
              Phone Number
            </label>
            <Input
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-muted-foreground">
              Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-muted-foreground">
              Confirm Password
            </label>
            <Input
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              required
            />
          </div>

          <Button
            type="submit"
            variant="gold"
            size="xl"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            By registering, you agree to the following{" "}
            <span className="text-primary">Terms & Conditions</span> without
            reservation.
          </p>
        </form>

        {/* Login Link */}
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
