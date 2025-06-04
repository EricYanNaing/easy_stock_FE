import { defineStore } from "pinia";

export const useAuthStore =defineStore("auth", {
    state : () => ({
        user: null,
        token: null,
        isLoggedIn: false,
    }),

    actions:{
        async login(userData) {
            this.user = userData;
            this.token = userData.token;
            this.isLoggedIn = true;

            console.log("User logged in:", this.user);

            // Store the token in local storage
            localStorage.setItem("token", this.token);
            localStorage.setItem("user", JSON.stringify(this.user));
        },

        async logout() {
            this.user = null;
            this.token = null;
            this.isLoggedIn = false;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },

        checkIsAuth() {
            const token = localStorage.getItem("token");
            if (token) {
                this.token = token;
                this.isLoggedIn = true;
            } else {
                this.isLoggedIn = false;
            }
        }
    },
    persist:true
})