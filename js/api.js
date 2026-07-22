/* api.js */
// ============================================
// PShop - API Service
// ============================================

const ApiService = {
    // Generic fetch with timeout
    async fetchWithTimeout(url, options = {}, timeout = 10000) {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);

        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal
            });
            clearTimeout(id);
            return await response.json();
        } catch (error) {
            clearTimeout(id);
            throw error;
        }
    },

    // POST request
    async post(url, data) {
        return this.fetchWithTimeout(url, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    },

    // GET request
    async get(url) {
        return this.fetchWithTimeout(url, {
            method: 'GET',
            mode: 'no-cors'
        });
    },

    // Login
    async login(email, password) {
        return this.post(API.LOGIN, {
            action: 'login',
            email,
            password
        });
    },

    // Signup
    async signup(data) {
        return this.post(API.LOGIN, {
            action: 'signup',
            ...data
        });
    },

    // Get products
    async getProducts(filters = {}) {
        return this.post(API.PRODUCTS, {
            action: 'getProducts',
            ...filters
        });
    },

    // Get single product
    async getProduct(productId) {
        return this.post(API.PRODUCTS, {
            action: 'getProduct',
            productId
        });
    },

    // Place order
    async placeOrder(orderData) {
        return this.post(API.ORDERS, {
            action: 'placeOrder',
            ...orderData
        });
    },

    // Get orders
    async getOrders(userId) {
        return this.post(API.ORDERS, {
            action: 'getOrders',
            userId
        });
    },

    // Send message
    async sendMessage(data) {
        return this.post(API.MESSAGE, {
            action: 'sendMessage',
            ...data
        });
    },

    // Get messages
    async getMessages(userId) {
        return this.post(API.MESSAGE, {
            action: 'getMessages',
            userId
        });
    },

    // Update profile
    async updateProfile(data) {
        return this.post(API.LOGIN, {
            action: 'updateProfile',
            ...data
        });
    }
};
