import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, MapPin, Star, ChevronRight, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BottomNav } from "@/components/layout/BottomNav";
import barberPortrait from "@/assets/barber-portrait.jpg";
import salonInterior from "@/assets/salon-interior.jpg";

const featuredShops = [
  {
    id: 1,
    name: "Stylish Barber Shop",
    address: "127 Nature Lodge",
    rating: 4.5,
    distance: "4.5 Km",
    image: salonInterior,
  },
  {
    id: 2,
    name: "Brett Denny's Shop",
    address: "127 Nature Lodge",
    rating: 4.3,
    distance: "3.2 Km",
    image: barberPortrait,
  },
];

const popularBarbers = [
  { id: 1, name: "James", specialty: "Haircut", image: barberPortrait },
  { id: 2, name: "Mike", specialty: "Beard", image: barberPortrait },
  { id: 3, name: "John", specialty: "Styling", image: barberPortrait },
];

const categories = [
  { id: 1, name: "Haircut", count: 20 },
  { id: 2, name: "Hair Care", count: 15 },
  { id: 3, name: "Shampoo", count: 12 },
];

export default function CustomerHome() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="px-4 pt-12 pb-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-muted-foreground text-sm">Hi Jackson,</p>
          <div className="flex items-center gap-1 text-muted-foreground mt-1">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-sm">324 Chicago</span>
          </div>
        </motion.div>

        {/* Search */}
        <div className="mt-4 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Find a salon, specialists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12"
            />
          </div>
          <Button variant="dark" size="icon" className="shrink-0">
            <Filter className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Promo Banner */}
      <div className="px-4 mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-r from-primary/20 to-primary/5 p-4 overflow-hidden relative">
            <div className="relative z-10">
              <p className="text-xl font-semibold text-foreground">
                30% Off On
              </p>
              <p className="text-lg text-foreground">Facial Treatments</p>
              <Button variant="gold" size="sm" className="mt-3">
                Explore
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Nearest To You */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Nearest To You</h2>
          <button className="text-sm text-primary flex items-center gap-1">
            See all <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {featuredShops.map((shop, index) => (
            <motion.div
              key={shop.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card
                variant="interactive"
                className="w-40 shrink-0 overflow-hidden"
                onClick={() => navigate(`/customer/shop/${shop.id}`)}
              >
                <div className="h-24 overflow-hidden">
                  <img
                    src={shop.image}
                    alt={shop.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-foreground truncate">
                    {shop.name}
                  </h3>
                  <p className="text-xs text-muted-foreground truncate mt-1">
                    {shop.address}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-primary fill-primary" />
                      <span className="text-xs text-foreground">{shop.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{shop.distance}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Popular Experts */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Popular Experts</h2>
          <button className="text-sm text-primary flex items-center gap-1">
            See all <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {popularBarbers.map((barber, index) => (
            <motion.div
              key={barber.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30">
                <img
                  src={barber.image}
                  alt={barber.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="text-sm font-medium text-foreground mt-2">{barber.name}</p>
              <p className="text-xs text-muted-foreground">{barber.specialty}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Categories</h2>
          <button className="text-sm text-primary flex items-center gap-1">
            See all <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {categories.map((cat) => (
            <Card key={cat.id} variant="interactive" className="px-4 py-3 shrink-0">
              <p className="text-sm font-medium text-foreground">{cat.name}</p>
              <p className="text-xs text-muted-foreground">{cat.count} Places</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Salons Near By */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Salon Near by</h2>
          <button className="text-sm text-primary flex items-center gap-1">
            Map View <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-3">
          {featuredShops.map((shop, index) => (
            <motion.div
              key={shop.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card
                variant="interactive"
                className="flex gap-4 p-3"
                onClick={() => navigate(`/customer/shop/${shop.id}`)}
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                  <img
                    src={shop.image}
                    alt={shop.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground">{shop.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{shop.address}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-primary fill-primary" />
                      <span className="text-sm text-foreground">{shop.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{shop.distance}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
