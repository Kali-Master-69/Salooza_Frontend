import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Star, MapPin, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BottomNav } from "@/components/layout/BottomNav";
import { useNavigate } from "react-router-dom";
import salonInterior from "@/assets/salon-interior.jpg";
import barberPortrait from "@/assets/barber-portrait.jpg";

const shops = [
  {
    id: 1,
    name: "Brett Denny's Shop",
    address: "127 Nature Lodge",
    rating: 4.5,
    distance: "4.5 Km",
    image: salonInterior,
  },
  {
    id: 2,
    name: "Gyrobald Hair Style",
    address: "89 Sunset Lodge",
    rating: 4.3,
    distance: "3.2 Km",
    image: barberPortrait,
  },
  {
    id: 3,
    name: "Beauty Women Salon",
    address: "456 Main Street",
    rating: 4.8,
    distance: "2.1 Km",
    image: salonInterior,
  },
  {
    id: 4,
    name: "Kozuki Barber Shop",
    address: "789 Oak Avenue",
    rating: 4.2,
    distance: "5.5 Km",
    image: barberPortrait,
  },
  {
    id: 5,
    name: "Badewa Barber Shop",
    address: "321 Pine Road",
    rating: 4.6,
    distance: "1.8 Km",
    image: salonInterior,
  },
];

export default function ExploreShops() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredShops = shops.filter((shop) =>
    shop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="px-4 pt-12 pb-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-display font-bold text-foreground">
            Explore
          </h1>
          <p className="text-muted-foreground mt-1">Find nearby salons</p>
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

      {/* Shops List */}
      <div className="px-4 space-y-3">
        {filteredShops.map((shop, index) => (
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
              <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
                <img
                  src={shop.image}
                  alt={shop.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground">{shop.name}</h3>
                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate">{shop.address}</span>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-primary fill-primary" />
                    <span className="text-sm text-foreground">{shop.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{shop.distance}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
