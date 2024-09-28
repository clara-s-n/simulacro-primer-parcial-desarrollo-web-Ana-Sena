// auth.js
const API_URL = 'http://localhost/back';

export const auth = {
    id: localStorage.getItem('id'),
    token: localStorage.getItem('token'),
    user: (() => {
        const storedUser = localStorage.getItem('user');
        try {
            return storedUser ? JSON.parse(storedUser) : null; // Retorna null si no hay datos
        } catch {
            console.error("Error parsing user from localStorage");
            return null;
        }
    })(),

    async login(username, email, password) {
        try {
            const contraseña = password;
            const response = await fetch(`${API_URL}/auth`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, contraseña })
            });

            if (!response.ok) {
                console.log('Contraseña recibida:', password, 'Contraseña esperada', );
                throw new Error('Login failed');
            }

            const data = await response.json();
            this.token = data.token;
            this.user = data.usuario;

            localStorage.setItem('token', this.token);
            localStorage.setItem('user', JSON.stringify(this.user));

            return this.user;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    logout() {
        this.token = null;
        this.user = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    isAuthenticated() {
        // Comparamos la fecha de expiración del token con la fecha actual
        const payload = this.getPayload();
        if (!payload) return false;
        const expirationTime = payload.exp * 1000;
        const isExpired = Date.now() >= expirationTime;
        if (!!this.token && !isExpired) {
            return true;
        }
        this.logout();
    },

    getId(){
        const payload = this.getPayload();
        // En el payload recibimos un usuario y dentro del usuario recibimos el campo id_usuario
        return payload.id_usuario
        },

    getRole(){
        const payload = this.getPayload();
        return payload.is_admin
    },

    async verifyToken() {
        if (!this.token) return false;

        try {
            const response = await fetch(`${API_URL}/auth/verify`, {
                headers: { 'Authorization': `Bearer ${this.token}` }
            });

            if (!response.ok) {
                this.logout();
                return false;
            }

            return true;
        } catch (error) {
            console.error('Token verification error:', error);
            this.logout();
            return false;
        }
    },

    getPayload() {
        if (!this.token) return null;
        const arrayToken = this.token.split('.') // Divide el token en 3 partes
        const payload = JSON.parse(atob(arrayToken[1])) // Decodifica la parte del payload
        return payload;
    }
};