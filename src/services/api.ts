const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1';

export interface RegisterData {
    name: string;
    email: string;
    phone: string;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface AuthResponse {
    status: string;
    token: string;
    data: {
        user: {
            id: string;
            email: string;
            role: string;
            createdAt: string;
            updatedAt: string;
        };
    };
}

class ApiService {
    private getAuthHeaders(token?: string): HeadersInit {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        return headers;
    }

    async register(role: 'customer' | 'barber' | 'admin', data: RegisterData): Promise<AuthResponse> {
        const response = await fetch(`${API_BASE_URL}/auth/${role}/register`, {
            method: 'POST',
            headers: this.getAuthHeaders(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Registration failed');
        }

        return response.json();
    }

    async login(role: 'customer' | 'barber' | 'admin', data: LoginData): Promise<AuthResponse> {
        const response = await fetch(`${API_BASE_URL}/auth/${role}/login`, {
            method: 'POST',
            headers: this.getAuthHeaders(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Login failed');
        }

        return response.json();
    }

    // Add more API methods as needed
    async getProfile(token: string) {
        const response = await fetch(`${API_BASE_URL}/auth/profile`, {
            headers: this.getAuthHeaders(token),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch profile');
        }

        return response.json();
    }

    // Shop APIs
    async getShops() {
        const response = await fetch(`${API_BASE_URL}/shops`);
        if (!response.ok) throw new Error('Failed to fetch shops');
        return response.json();
    }

    async getShopDetails(shopId: string, token?: string) {
        const response = await fetch(`${API_BASE_URL}/shops/${shopId}`, {
            headers: token ? this.getAuthHeaders(token) : this.getAuthHeaders(),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch shop details');
        }
        const data = await response.json();
        return {
            status: 'success',
            data: data.data,
            shopStatus: data.data.status // From backend centralized logic
        };
    }



    async getMyShop(token: string) {
        const response = await fetch(`${API_BASE_URL}/shops/my-shop`, {
            headers: this.getAuthHeaders(token),
        });
        if (!response.ok) throw new Error('Failed to fetch your shop');
        return response.json();
    }

    async updateMyShop(token: string, data: any) {
        const response = await fetch(`${API_BASE_URL}/shops/my-shop`, {
            method: 'PATCH',
            headers: this.getAuthHeaders(token),
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to update shop');
        return response.json();
    }

    // Service APIs
    async getServices(shopId: string, token?: string) {
        const response = await fetch(`${API_BASE_URL}/services/${shopId}`, {
            headers: token ? this.getAuthHeaders(token) : this.getAuthHeaders(),
        });
        if (!response.ok) throw new Error('Failed to fetch services');
        return response.json();
    }

    async createService(token: string, data: any) {
        const response = await fetch(`${API_BASE_URL}/services`, {
            method: 'POST',
            headers: this.getAuthHeaders(token),
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to create service');
        return response.json();
    }

    // Queue APIs
    async joinQueue(token: string, shopId: string, serviceIds: string[]) {
        const response = await fetch(`${API_BASE_URL}/queue/join`, {
            method: 'POST',
            headers: this.getAuthHeaders(token),
            body: JSON.stringify({ shopId, serviceIds }),
        });
        if (!response.ok) throw new Error('Failed to join queue');
        return response.json();
    }

    async addWalkIn(token: string, walkInName: string, serviceIds: string[]) {
        const response = await fetch(`${API_BASE_URL}/queue/walk-in`, {
            method: 'POST',
            headers: this.getAuthHeaders(token),
            body: JSON.stringify({ walkInName, serviceIds }),
        });
        if (!response.ok) throw new Error('Failed to add walk-in');
        return response.json();
    }

    async getMyQueue(token: string) {
        const response = await fetch(`${API_BASE_URL}/queue/my-queue`, {
            headers: this.getAuthHeaders(token),
        });
        if (!response.ok) throw new Error('Failed to fetch queue');
        return response.json();
    }

    async getCustomerQueueStatus(token: string) {
        const response = await fetch(`${API_BASE_URL}/queue/customer-status`, {
            headers: this.getAuthHeaders(token),
        });
        if (!response.ok) throw new Error('Failed to fetch queue status');
        return response.json();
    }

    async updateQueueStatus(token: string, itemId: string, status: string) {
        const response = await fetch(`${API_BASE_URL}/queue/${itemId}/status`, {
            method: 'PATCH',
            headers: this.getAuthHeaders(token),
            body: JSON.stringify({ status }),
        });
        if (!response.ok) throw new Error('Failed to update status');
        return response.json();
    }

    async toggleQueuePause(token: string, isPaused: boolean) {
        const response = await fetch(`${API_BASE_URL}/queue/pause`, {
            method: 'PATCH',
            headers: this.getAuthHeaders(token),
            body: JSON.stringify({ isPaused }),
        });
        if (!response.ok) throw new Error('Failed to toggle queue status');
        return response.json();
    }

    async updateAvailability(token: string, isAvailable: boolean) {
        const response = await fetch(`${API_BASE_URL}/availability/status`, {
            method: 'PATCH',
            headers: this.getAuthHeaders(token),
            body: JSON.stringify({ isAvailable }),
        });
        if (!response.ok) throw new Error('Failed to update availability');
        return response.json();
    }
}


export const apiService = new ApiService();
