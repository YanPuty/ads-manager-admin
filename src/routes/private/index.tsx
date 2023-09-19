import { Route, Routes } from 'react-router-dom';

interface ProtectedRoutesProps {
  component: any;
  authenticationComponent: any;
}

function ProtectedRoutes(props: ProtectedRoutesProps) {
  const {
    component: Component,
    authenticationComponent: AuthenticationComponent,
  } = props;
  const isLogged = true;

  return (
    <Routes>
      {isLogged && <Route path="/*" element={<Component />} />}
      {!isLogged && <Route path="/*" element={<AuthenticationComponent />} />}
    </Routes>
  );
}

export default ProtectedRoutes;
