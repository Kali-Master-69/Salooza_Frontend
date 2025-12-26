import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface Service {
  id: string;
  name: string;
  duration: number; // in minutes
  price: number;
}

export interface QueueItem {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  services: Service[];
  totalDuration: number;
  totalPrice: number;
  status: "waiting" | "in-progress" | "completed" | "skipped";
  tokenNumber: number;
  joinedAt: Date;
  estimatedWaitTime: number;
  isWalkIn: boolean;
}

export interface Shop {
  id: string;
  name: string;
  address: string;
  rating: number;
  reviewCount: number;
  distance: string;
  image: string;
  services: Service[];
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  activeBarbers: number;
}

interface QueueContextType {
  // Customer state
  currentQueue: QueueItem | null;
  selectedShop: Shop | null;
  selectedServices: Service[];
  
  // Barber state
  shopQueue: QueueItem[];
  isQueueActive: boolean;
  
  // Actions
  setSelectedShop: (shop: Shop | null) => void;
  toggleService: (service: Service) => void;
  clearSelectedServices: () => void;
  joinQueue: (customerName: string, customerPhone: string) => QueueItem;
  leaveQueue: () => void;
  
  // Barber actions
  startQueue: () => void;
  pauseQueue: () => void;
  completeCustomer: (queueItemId: string) => void;
  skipCustomer: (queueItemId: string) => void;
  addWalkIn: (name: string, phone: string, services: Service[]) => void;
  
  // Computed
  getEstimatedWaitTime: () => number;
  getTotalDuration: () => number;
  getTotalPrice: () => number;
}

const QueueContext = createContext<QueueContextType | undefined>(undefined);

// Mock services data
export const mockServices: Service[] = [
  { id: "s1", name: "Haircut", duration: 30, price: 25 },
  { id: "s2", name: "Beard Trim", duration: 15, price: 15 },
  { id: "s3", name: "Hair + Beard Combo", duration: 45, price: 35 },
  { id: "s4", name: "Kids Haircut", duration: 20, price: 18 },
  { id: "s5", name: "Head Shave", duration: 25, price: 20 },
  { id: "s6", name: "Hair Styling", duration: 20, price: 15 },
];

// Mock shops data
export const mockShops: Shop[] = [
  {
    id: "shop1",
    name: "Elite Cuts Barbershop",
    address: "123 Main Street, Downtown",
    rating: 4.8,
    reviewCount: 256,
    distance: "0.5 km",
    image: "/placeholder.svg",
    services: mockServices,
    isOpen: true,
    openTime: "09:00",
    closeTime: "21:00",
    activeBarbers: 3,
  },
  {
    id: "shop2",
    name: "The Gentleman's Den",
    address: "456 Oak Avenue, Midtown",
    rating: 4.6,
    reviewCount: 189,
    distance: "1.2 km",
    image: "/placeholder.svg",
    services: mockServices,
    isOpen: true,
    openTime: "10:00",
    closeTime: "20:00",
    activeBarbers: 2,
  },
  {
    id: "shop3",
    name: "Sharp Style Studio",
    address: "789 Pine Road, Uptown",
    rating: 4.9,
    reviewCount: 342,
    distance: "2.0 km",
    image: "/placeholder.svg",
    services: mockServices,
    isOpen: false,
    openTime: "08:00",
    closeTime: "18:00",
    activeBarbers: 0,
  },
];

// Mock queue for barber dashboard
const initialBarberQueue: QueueItem[] = [
  {
    id: "q1",
    customerId: "c1",
    customerName: "Alex Johnson",
    customerPhone: "+1234567890",
    services: [mockServices[0]],
    totalDuration: 30,
    totalPrice: 25,
    status: "in-progress",
    tokenNumber: 1,
    joinedAt: new Date(Date.now() - 1800000),
    estimatedWaitTime: 0,
    isWalkIn: false,
  },
  {
    id: "q2",
    customerId: "c2",
    customerName: "Michael Brown",
    customerPhone: "+1234567891",
    services: [mockServices[2]],
    totalDuration: 45,
    totalPrice: 35,
    status: "waiting",
    tokenNumber: 2,
    joinedAt: new Date(Date.now() - 1200000),
    estimatedWaitTime: 15,
    isWalkIn: false,
  },
  {
    id: "q3",
    customerId: "c3",
    customerName: "David Wilson",
    customerPhone: "+1234567892",
    services: [mockServices[0], mockServices[1]],
    totalDuration: 45,
    totalPrice: 40,
    status: "waiting",
    tokenNumber: 3,
    joinedAt: new Date(Date.now() - 600000),
    estimatedWaitTime: 60,
    isWalkIn: true,
  },
];

export function QueueProvider({ children }: { children: ReactNode }) {
  // Customer state
  const [currentQueue, setCurrentQueue] = useState<QueueItem | null>(null);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  
  // Barber state
  const [shopQueue, setShopQueue] = useState<QueueItem[]>(initialBarberQueue);
  const [isQueueActive, setIsQueueActive] = useState(true);
  const [tokenCounter, setTokenCounter] = useState(4);

  const toggleService = useCallback((service: Service) => {
    setSelectedServices((prev) => {
      const exists = prev.find((s) => s.id === service.id);
      if (exists) {
        return prev.filter((s) => s.id !== service.id);
      }
      return [...prev, service];
    });
  }, []);

  const clearSelectedServices = useCallback(() => {
    setSelectedServices([]);
  }, []);

  const getTotalDuration = useCallback(() => {
    return selectedServices.reduce((sum, s) => sum + s.duration, 0);
  }, [selectedServices]);

  const getTotalPrice = useCallback(() => {
    return selectedServices.reduce((sum, s) => sum + s.price, 0);
  }, [selectedServices]);

  const getEstimatedWaitTime = useCallback(() => {
    // Calculate based on current queue
    const waitingItems = shopQueue.filter((q) => q.status === "waiting");
    const totalWaitDuration = waitingItems.reduce((sum, q) => sum + q.totalDuration, 0);
    const activeBarbers = selectedShop?.activeBarbers || 1;
    return Math.ceil(totalWaitDuration / activeBarbers);
  }, [shopQueue, selectedShop]);

  const joinQueue = useCallback((customerName: string, customerPhone: string): QueueItem => {
    const newQueueItem: QueueItem = {
      id: `q-${Date.now()}`,
      customerId: `c-${Date.now()}`,
      customerName,
      customerPhone,
      services: selectedServices,
      totalDuration: getTotalDuration(),
      totalPrice: getTotalPrice(),
      status: "waiting",
      tokenNumber: tokenCounter,
      joinedAt: new Date(),
      estimatedWaitTime: getEstimatedWaitTime(),
      isWalkIn: false,
    };

    setTokenCounter((prev) => prev + 1);
    setShopQueue((prev) => [...prev, newQueueItem]);
    setCurrentQueue(newQueueItem);
    setSelectedServices([]);
    
    return newQueueItem;
  }, [selectedServices, getTotalDuration, getTotalPrice, getEstimatedWaitTime, tokenCounter]);

  const leaveQueue = useCallback(() => {
    if (currentQueue) {
      setShopQueue((prev) => prev.filter((q) => q.id !== currentQueue.id));
      setCurrentQueue(null);
    }
  }, [currentQueue]);

  // Barber actions
  const startQueue = useCallback(() => {
    setIsQueueActive(true);
  }, []);

  const pauseQueue = useCallback(() => {
    setIsQueueActive(false);
  }, []);

  const completeCustomer = useCallback((queueItemId: string) => {
    setShopQueue((prev) => {
      const updated = prev.map((q) => {
        if (q.id === queueItemId) {
          return { ...q, status: "completed" as const };
        }
        return q;
      });
      
      // Start next customer if available
      const waitingItems = updated.filter((q) => q.status === "waiting");
      if (waitingItems.length > 0) {
        const nextCustomer = waitingItems[0];
        return updated.map((q) => {
          if (q.id === nextCustomer.id) {
            return { ...q, status: "in-progress" as const };
          }
          return q;
        });
      }
      
      return updated;
    });
  }, []);

  const skipCustomer = useCallback((queueItemId: string) => {
    setShopQueue((prev) => {
      const updated = prev.map((q) => {
        if (q.id === queueItemId) {
          return { ...q, status: "skipped" as const };
        }
        return q;
      });
      
      // Start next customer if the skipped one was in-progress
      const skippedItem = prev.find((q) => q.id === queueItemId);
      if (skippedItem?.status === "in-progress") {
        const waitingItems = updated.filter((q) => q.status === "waiting");
        if (waitingItems.length > 0) {
          const nextCustomer = waitingItems[0];
          return updated.map((q) => {
            if (q.id === nextCustomer.id) {
              return { ...q, status: "in-progress" as const };
            }
            return q;
          });
        }
      }
      
      return updated;
    });
  }, []);

  const addWalkIn = useCallback((name: string, phone: string, services: Service[]) => {
    const totalDuration = services.reduce((sum, s) => sum + s.duration, 0);
    const totalPrice = services.reduce((sum, s) => sum + s.price, 0);
    
    const newQueueItem: QueueItem = {
      id: `q-${Date.now()}`,
      customerId: `walkin-${Date.now()}`,
      customerName: name,
      customerPhone: phone,
      services,
      totalDuration,
      totalPrice,
      status: "waiting",
      tokenNumber: tokenCounter,
      joinedAt: new Date(),
      estimatedWaitTime: 0,
      isWalkIn: true,
    };

    setTokenCounter((prev) => prev + 1);
    setShopQueue((prev) => [...prev, newQueueItem]);
  }, [tokenCounter]);

  return (
    <QueueContext.Provider
      value={{
        currentQueue,
        selectedShop,
        selectedServices,
        shopQueue,
        isQueueActive,
        setSelectedShop,
        toggleService,
        clearSelectedServices,
        joinQueue,
        leaveQueue,
        startQueue,
        pauseQueue,
        completeCustomer,
        skipCustomer,
        addWalkIn,
        getEstimatedWaitTime,
        getTotalDuration,
        getTotalPrice,
      }}
    >
      {children}
    </QueueContext.Provider>
  );
}

export function useQueue() {
  const context = useContext(QueueContext);
  if (context === undefined) {
    throw new Error("useQueue must be used within a QueueProvider");
  }
  return context;
}
