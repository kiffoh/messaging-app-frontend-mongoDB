import { Outlet } from 'react-router-dom';
import useAuth from '../Authentification/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function UserLayout() {
  const {user} = useAuth();
  const [userLoading, setUserLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUserLoading(false);
  } else if (!userLoading && !user) {
      navigate('/users/login');
  }  
  }, [user, userLoading, navigate])

  return (
    <div style={{width:'100%', height:'100vh', backgroundColor: 'var(--default-colour-light)'}}>
      <Outlet /> {/* This is where the nested routes will be rendered */}
    </div>
  );
}

export default UserLayout;
