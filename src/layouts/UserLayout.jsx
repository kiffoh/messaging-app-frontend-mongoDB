import { Outlet } from 'react-router-dom';
import useAuth from '../authentication/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function UserLayout() {
  const {user, checkTokenValidity} = useAuth();
  const [userLoading, setUserLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const validToken = checkTokenValidity()
    if (!validToken) navigate('/users/login')
  }, [])

  return (
    <div style={{width:'100%', height:'100vh', backgroundColor: 'var(--default-colour-light)'}}>
      <Outlet /> {/* This is where the nested routes will be rendered */}
    </div>
  );
}

export default UserLayout;
