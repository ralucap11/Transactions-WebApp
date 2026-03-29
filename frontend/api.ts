import axios from 'axios';

axios.interceptors.request.use((config) => {
    const savedUser = localStorage.getItem('user');
    if(savedUser) {
        const { token } = JSON.parse(savedUser);
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
