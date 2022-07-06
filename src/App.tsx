import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { login, userState } from 'redux/slices/user';
import { useGetHasUserProposedQuery, useLazyRefreshTokenQuery } from 'redux/api';
import Cookies from 'js-cookie';

import Toast from 'components/Toasts/Toasts';
import ResetScroll from 'components/ResetScroll/ResetScroll';
import Layout from 'components/Layout/Layout';
import Error from './pages/Error/Error';
import Films from './pages/Films/Films';
import User from './pages/User/User';
import Home from './pages/Home/Home';
import Film from './pages/Film/Film';
import Register from './pages/Register/Register';
import Proposal from './pages/Proposal/Proposal';
import Team from './pages/Team/Team';
import Admin from './pages/Admin/Admin';

function App() {
  const isLogged = useAppSelector(userState); // eslint-disable-line @typescript-eslint/no-unused-vars
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [refreshToken, {data, isLoading, isError}] = useLazyRefreshTokenQuery();

  // wait for refreshToken cycle to be done
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const token = Cookies.get('refreshToken');
    token && refreshToken();
  }, [refreshToken]);

  useEffect(() => {
    if (!isLoading && data && !isError) {
      dispatch(login(data));
      setReady(true);
    }
    setReady(true);
  }, [data]);
  
  return (
    ready ?
      <>
        <Layout>
          <AnimatePresence exitBeforeEnter>
            <ResetScroll />
            <Routes location={location} key={location.pathname}>
              <Route path='/' element={<Home />}/>
              <Route path='/film/:id' element={<Film />}/>
              <Route path='/films' element={<Films />}/>
              <Route path='/register' element={<Register />}/>
              <Route path='/user' element={<User />}/>
              <Route path='/user/:id' element={<User />}/>
              <Route path='/proposal' element={
                <RequireAuth redirectTo={'/'}>
                  <Proposal /> 
                </RequireAuth>}/>
              <Route path='/team' element={<Team />}/>
              <Route path='/admin' element={<Admin />}/>
              <Route path='*' element={<Error />}/>
            </Routes>
          </AnimatePresence>
        </Layout>
        <Toast />
      </>
      : null
  );
}

function RequireAuth({children, redirectTo}:{ children:any, redirectTo:any }) {
  const [resfreshToken, {isError, isLoading}] = useLazyRefreshTokenQuery();
  useEffect(() => {
    resfreshToken();
  }, []);
  if (!isLoading) {
    return !isError ? children : <Navigate to={redirectTo} />;
  }
}

export default App;