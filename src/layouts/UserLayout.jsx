import { Outlet } from 'react-router-dom';

function UserLayout() {
  return (
    <div style={{width:'100%', height:'100vh', backgroundColor: 'var(--default-colour-light)', display:'grid', gridTemplateRows:'auto 1fr'}}>
      <Outlet /> {/* This is where the nested routes will be rendered */}
    </div>
  );
}

export default UserLayout;
