import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Users, 
  Clock, 
  Plus, 
  Pause, 
  Play, 
  ChevronRight,
  Scissors,
  Timer
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BottomNav } from "@/components/layout/BottomNav";
import { cn } from "@/lib/utils";

interface QueueCustomer {
  id: string;
  name: string;
  services: string[];
  estimatedTime: number;
  position: number;
  status: "waiting" | "in-progress" | "completed";
}

const mockQueue: QueueCustomer[] = [
  {
    id: "1",
    name: "John Smith",
    services: ["Haircut", "Beard Trim"],
    estimatedTime: 45,
    position: 1,
    status: "in-progress",
  },
  {
    id: "2",
    name: "Mike Johnson",
    services: ["Haircut"],
    estimatedTime: 30,
    position: 2,
    status: "waiting",
  },
  {
    id: "3",
    name: "David Wilson",
    services: ["Shave", "Hair Wash"],
    estimatedTime: 35,
    position: 3,
    status: "waiting",
  },
];

export default function BarberDashboard() {
  const navigate = useNavigate();
  const [isQueueActive, setIsQueueActive] = useState(true);
  const [queue, setQueue] = useState<QueueCustomer[]>(mockQueue);

  const totalWaitTime = queue
    .filter((c) => c.status === "waiting")
    .reduce((acc, c) => acc + c.estimatedTime, 0);

  const handleCompleteCustomer = (customerId: string) => {
    setQueue((prev) =>
      prev.map((c) =>
        c.id === customerId ? { ...c, status: "completed" as const } : c
      )
    );
  };

  const handleStartCustomer = (customerId: string) => {
    setQueue((prev) =>
      prev.map((c) =>
        c.id === customerId ? { ...c, status: "in-progress" as const } : c
      )
    );
  };

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
            Barber Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">Manage your queue</p>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {queue.filter((c) => c.status !== "completed").length}
                  </p>
                  <p className="text-sm text-muted-foreground">In Queue</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {totalWaitTime} min
                  </p>
                  <p className="text-sm text-muted-foreground">Total Wait</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Queue Controls */}
      <div className="px-4 mb-6">
        <div className="flex gap-3">
          <Button
            variant={isQueueActive ? "destructive" : "gold"}
            size="lg"
            className="flex-1"
            onClick={() => setIsQueueActive(!isQueueActive)}
          >
            {isQueueActive ? (
              <>
                <Pause className="h-5 w-5 mr-2" /> Pause Queue
              </>
            ) : (
              <>
                <Play className="h-5 w-5 mr-2" /> Start Queue
              </>
            )}
          </Button>
          <Button
            variant="gold-outline"
            size="lg"
            onClick={() => navigate("/barber/add-walkin")}
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Queue Status */}
      <div className="px-4 mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Live Queue</h2>
          <span
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium",
              isQueueActive
                ? "bg-green-500/20 text-green-400"
                : "bg-destructive/20 text-destructive"
            )}
          >
            {isQueueActive ? "Active" : "Paused"}
          </span>
        </div>
      </div>

      {/* Queue List */}
      <div className="px-4 space-y-3">
        {queue
          .filter((c) => c.status !== "completed")
          .map((customer, index) => (
            <motion.div
              key={customer.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card
                className={cn(
                  "p-4",
                  customer.status === "in-progress" &&
                    "border-primary bg-primary/5"
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    {/* Position */}
                    <div
                      className={cn(
                        "h-10 w-10 rounded-full flex items-center justify-center font-bold",
                        customer.status === "in-progress"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {customer.position}
                    </div>

                    <div>
                      <h3 className="font-semibold text-foreground">
                        {customer.name}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {customer.services.map((service) => (
                          <span
                            key={service}
                            className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <Timer className="h-4 w-4" />
                        {customer.estimatedTime} min
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div>
                    {customer.status === "waiting" ? (
                      <Button
                        variant="gold"
                        size="sm"
                        onClick={() => handleStartCustomer(customer.id)}
                      >
                        Start
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCompleteCustomer(customer.id)}
                      >
                        Done
                      </Button>
                    )}
                  </div>
                </div>

                {customer.status === "in-progress" && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-primary">
                      <Scissors className="h-4 w-4 animate-pulse" />
                      <span className="text-sm font-medium">In Progress</span>
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
      </div>

      {queue.filter((c) => c.status !== "completed").length === 0 && (
        <div className="px-4 py-12 text-center">
          <p className="text-muted-foreground">No customers in queue</p>
          <Button
            variant="gold"
            className="mt-4"
            onClick={() => navigate("/barber/add-walkin")}
          >
            <Plus className="h-5 w-5 mr-2" /> Add Walk-in Customer
          </Button>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
