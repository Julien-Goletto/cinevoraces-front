import React, { useEffect, useState } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';
import Cookies from 'js-cookie';
import { AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { isOnline, setUser, userLogged } from 'redux/slices/user';
import { usePendingPropositionQuery, useLazyRefreshTokenQuery } from 'redux/api';

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
import Loader from 'components/Loader/Loader';

function App() {
  const isLogged = useAppSelector<boolean>(isOnline); // eslint-disable-line @typescript-eslint/no-unused-vars
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [refreshToken, {data, isLoading, isError}] = useLazyRefreshTokenQuery();

  // wait for refreshToken cycle to be done
  const [ready, setReady] = useState<boolean>(false);
  useEffect(()=>{
    const token = Cookies.get('refreshToken');
    if(token) {
      refreshToken();
    } else return;
  }, [refreshToken]);

  useEffect(()=> {
    if(!isLoading && data && !isError ) {
      dispatch(setUser(data));
      setReady(true);
    }
    setReady(true);
  }, [data, isLoading, isError, dispatch]);
  
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
              <Route path='/user/:id' element={
                // FIXME: Does not redirect when user use the URL manually
                <RequireAuth redirectTo={'/'}>
                  <User /> 
                </RequireAuth>
              }/>
              <Route path='/proposal' 
                element={
                  <RequireAuth redirectTo={'/'}>
                    <PendingPropositionCheck redirectTo={'/'}>
                      <Proposal /> 
                    </PendingPropositionCheck>
                  </RequireAuth>
                }
              />
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

function RequireAuth({ children, redirectTo }:{ children:any, redirectTo:any }) {
  const [resfreshToken, {isError, isLoading}] = useLazyRefreshTokenQuery();
  useEffect(()=> {
    resfreshToken();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  if(!isLoading) {
    return !isError ? children : <Navigate to={redirectTo} />;
  }
}
function PendingPropositionCheck ({ children, redirectTo }:{ children:any, redirectTo:any }) {
  const user = useAppSelector(userLogged);
  const {isError, isLoading} = usePendingPropositionQuery(user.id); 

  if(isLoading) {
    return (
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Loader />
      </div>
    );
  }
  
  if(!isLoading){
    return !isError ? children : <Navigate to={redirectTo} />;
  }
}

export default App;