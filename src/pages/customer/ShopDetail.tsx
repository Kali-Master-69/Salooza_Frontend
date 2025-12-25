import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star, MapPin, Clock, Phone, Heart, Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import salonInterior from "@/assets/salon-interior.jpg";
import barberPortrait from "@/assets/barber-portrait.jpg";

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
}

const services: Service[] = [
  { id: "1", name: "Haircut", duration: 30, price: 25 },
  { id: "2", name: "Beard Trim", duration: 15, price: 15 },
  { id: "3", name: "Hair Wash", duration: 10, price: 10 },
  { id: "4", name: "Shave", duration: 20, price: 20 },
  { id: "5", name: "Hair Color", duration: 60, price: 50 },
  { id: "6", name: "Facial", duration: 45, price: 35 },
];

const barbers = [
  { id: "1", name: "James", available: true, image: barberPortrait },
  { id: "2", name: "Mike", available: true, image: barberPortrait },
  { id: "3", name: "John", available: false, image: barberPortrait },
];

export default function ShopDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const totalDuration = services
    .filter((s) => selectedServices.includes(s.id))
    .reduce((acc, s) => acc + s.duration, 0);

  const totalPrice = services
    .filter((s) => selectedServices.includes(s.id))
    .reduce((acc, s) => acc + s.price, 0);

  const handleJoinQueue = () => {
    navigate("/customer/queue", { state: { selectedServices, shopId: id } });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image */}
      <div className="relative h-64">
        <img
          src={salonInterior}
          alt="Shop"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />

        {/* Top Actions */}
        <div className="absolute top-4 left-4 right-4 flex justify-between safe-top">
          <Button
            variant="icon-circle"
            size="icon"
            onClick={() => navigate(-1)}
            className="bg-background/50 backdrop-blur-sm"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex gap-2">
            <Button
              variant="icon-circle"
              size="icon"
              className="bg-background/50 backdrop-blur-sm"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart
                className={cn("h-5 w-5", isFavorite && "fill-primary text-primary")}
              />
            </Button>
            <Button
              variant="icon-circle"
              size="icon"
              className="bg-background/50 backdrop-blur-sm"
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 -mt-8 relative z-10 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Shop Info */}
          <Card className="p-4 mb-6">
            <h1 className="text-2xl font-display font-bold text-foreground">
              Stylish Barber Shop
            </h1>
            <div className="flex items-center gap-4 mt-3 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-primary fill-primary" />
                <span className="text-foreground font-medium">4.5</span>
                <span className="text-muted-foreground">(120 reviews)</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              127 Nature Lodge, Chicago
            </div>
            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              Open: 9:00 AM - 9:00 PM
            </div>
            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              +1 234 567 890
            </div>
          </Card>

          {/* Barbers */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Our Barbers
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {barbers.map((barber) => (
                <div key={barber.id} className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-16 h-16 rounded-full overflow-hidden border-2",
                      barber.available
                        ? "border-green-500"
                        : "border-muted opacity-50"
                    )}
                  >
                    <img
                      src={barber.image}
                      alt={barber.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="text-sm font-medium text-foreground mt-2">
                    {barber.name}
                  </p>
                  <p
                    className={cn(
                      "text-xs",
                      barber.available
                        ? "text-green-400"
                        : "text-muted-foreground"
                    )}
                  >
                    {barber.available ? "Available" : "Busy"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Select Services
            </h2>
            <div className="space-y-3">
              {services.map((service) => {
                const isSelected = selectedServices.includes(service.id);
                return (
                  <Card
                    key={service.id}
                    variant="interactive"
                    className={cn(
                      "p-4 transition-all",
                      isSelected && "border-primary bg-primary/5"
                    )}
                    onClick={() => toggleService(service.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-foreground">
                          {service.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {service.duration} min
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-semibold text-primary">
                          ${service.price}
                        </span>
                        <div
                          className={cn(
                            "h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors",
                            isSelected
                              ? "border-primary bg-primary"
                              : "border-muted"
                          )}
                        >
                          {isSelected && (
                            <Check className="h-4 w-4 text-primary-foreground" />
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      {selectedServices.length > 0 && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 p-4 glass border-t border-border safe-bottom"
        >
          <div className="max-w-lg mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  {selectedServices.length} service(s) • {totalDuration} min
                </p>
                <p className="text-xl font-bold text-foreground">
                  ${totalPrice}
                </p>
              </div>
            </div>
            <Button variant="gold" size="xl" className="w-full" onClick={handleJoinQueue}>
              Join Queue
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
