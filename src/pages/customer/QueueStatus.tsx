import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Users, MapPin, MessageCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BottomNav } from "@/components/layout/BottomNav";
import { useNavigate } from "react-router-dom";

export default function QueueStatus() {
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState(45); // minutes
  const [position, setPosition] = useState(3);

  useEffect(() => {
    // Simulate queue updates
    const interval = setInterval(() => {
      setTimeRemaining((prev) => Math.max(0, prev - 1));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="px-4 pt-12 pb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-display font-bold text-foreground">
            Queue Status
          </h1>
          <p className="text-muted-foreground mt-1">Track your position</p>
        </motion.div>
      </div>

      {/* Token Card */}
      <div className="px-4 mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="p-6 bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Your Token</p>
              <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-primary text-primary-foreground text-4xl font-bold mb-4">
                #{position}
              </div>
              <h2 className="text-xl font-semibold text-foreground">
                Stylish Barber Shop
              </h2>
              <div className="flex items-center justify-center gap-2 mt-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                127 Nature Lodge
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Wait Info */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Card className="p-4 text-center">
              <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">
                ~{timeRemaining} min
              </p>
              <p className="text-sm text-muted-foreground">Estimated Wait</p>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Card className="p-4 text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">
                {position - 1}
              </p>
              <p className="text-sm text-muted-foreground">People Ahead</p>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Services */}
      <div className="px-4 mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-3">
          Your Services
        </h3>
        <Card className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-foreground">Haircut</span>
              <span className="text-muted-foreground">30 min • $25</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-foreground">Beard Trim</span>
              <span className="text-muted-foreground">15 min • $15</span>
            </div>
            <div className="border-t border-border pt-3 flex items-center justify-between font-semibold">
              <span className="text-foreground">Total</span>
              <span className="text-primary">45 min • $40</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Live Queue */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-foreground">
            Live Queue
          </h3>
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          {[1, 2, 3].map((num) => (
            <Card
              key={num}
              className={`p-3 flex items-center justify-between ${
                num === position ? "border-primary bg-primary/5" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                    num === position
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {num}
                </div>
                <span className="text-foreground">
                  {num === position ? "You" : `Customer ${num}`}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                {num === 1 ? "In Progress" : "Waiting"}
              </span>
            </Card>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 space-y-3">
        <Button
          variant="gold-outline"
          size="lg"
          className="w-full"
          onClick={() => navigate("/customer/chat")}
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          Chat with Shop
        </Button>
        <Button variant="destructive" size="lg" className="w-full">
          Leave Queue
        </Button>
      </div>

      <BottomNav />
    </div>
  );
}
