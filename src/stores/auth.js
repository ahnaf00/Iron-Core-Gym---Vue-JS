import { defineStore } from "pinia";
import api from '../axios'
import axios from "axios";

export const useAuthStore = defineStore('auth',{
    state: () => ({
        user: null,
        isAuth:true,
    }),
    actions:{
        async login(email,password){
            await axios.get('http://localhost:8000/sanctum/csrf-cookie',{
                withCredentials:true
            });

            await api.post('/auth/login',{email,password});
            await this.fetchUser();
        },
        async fetchUser() {
            try{
                const response  = await api.get('/auth/me');
                this.user = response.data;
                this.isAuth = true
            }catch{
                this.user = null;
                this.isAuth = false
            }
        },
        async logout(){
            await api.post('/auth/logout');
            this.user = null;
            this.isAuth = false
        }
    }
});