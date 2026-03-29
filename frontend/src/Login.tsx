import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage, type AuthProvider, type AuthResponse } from '@toolpad/core/SignInPage';
import { createTheme } from '@mui/material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { API_URL } from './constants';

const providers = [
    { id: 'credentials', name: 'Email and Password' },
    {id: 'google', name: 'Google'}
]; 

interface LoginProps {
    setUser: (user: any) => void;
}

const THEME = createTheme({
      palette: {
      mode: 'dark',
      primary: {main: '#90caf9' },
      background: { default: '#121212', paper: '#1e1e1e' }   
    },
});

export default function Login({ setUser }: LoginProps) {
  const navigate = useNavigate();  
  
  const signIn = async (provider: AuthProvider, formData: any): Promise<AuthResponse> => {
    if (provider.id === 'google') {
        console.log("redirecting to google");
        return { error: 'Google login not implemented'};

    }
    try{
        const response = await axios.post(`${API_URL}/auth/login`, {
          email: formData.get('email'),
          password: formData.get('password'),  
        });
       setUser(response.data);
       navigate('/');
       return{};
    }catch(err: any) {
        return{
                error: err.response?.data?.message || 'login failed'       
        };
    }
  };
    
return (
 <AppProvider theme={THEME}>
  <SignInPage
    signIn={signIn}
    providers={providers}
    sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }}
  />
 </AppProvider>
);
}
