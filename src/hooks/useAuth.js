import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export const useAuthNavigation = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  
  return {
    ...auth,
    navigate
  };
};