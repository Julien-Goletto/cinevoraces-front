import Toast from 'components/Toasts/Toasts';
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { isOnline, setUser, userLogged } from 'redux/slices/user';
import Cookies from 'js-cookie';

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
import { usePendingPropositionQuery, useRefreshTokenMutation } from 'redux/api';
import Loader from 'components/Loader/Loader';
import { addToast } from 'redux/slices/global';

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isLogged = useAppSelector<boolean>(isOnline);
  const dispatch = useAppDispatch();
  const [refreshToken, {data, isLoading, isError}] = useRefreshTokenMutation();

  // wait for refreshToken cycle to be done
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ready, setReady] = useState<boolean>(false);


  useEffect(()=>{
    const token = Cookies.get('refreshToken');
    if(token) {
      refreshToken();
    } else return;

  }, [refreshToken]);

  useEffect(()=> {
    if(!isLoading && data && !isError ) {
      dispatch(setUser({
        id: data.id,
        pseudo: data.pseudo,
        role: data.role,
        access_jwt: Cookies.get('accessToken'),
        refresh_jwt: Cookies.get('refreshToken'),
        isOnline: true
      }));
      setReady(true);
    }
    setReady(true);
  }, [data, isLoading, isError, dispatch]);

  
  
  
  return (
    <>
      <Router>
        <ResetScroll />
        <Layout>
          <Routes>
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
            {/* <Route path='/proposal' 
              element={(isLogged) ? <Proposal /> : <Error errorNum={401}/>}
            /> */}
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
        </Layout>
      </Router>
      <Toast />
    </>
  );
}

function RequireAuth({ children, redirectTo }:{ children:any, redirectTo:any }) {
  const [resfreshToken, {isError, isLoading}] = useRefreshTokenMutation();
  useEffect(()=> {
    resfreshToken();
  }, []);
  if(!isLoading) {
    return !isError ? children : <Navigate to={redirectTo} />;
  }
}
function PendingPropositionCheck ({ children, redirectTo }:{ children:any, redirectTo:any }) {
  const user = useAppSelector(userLogged);
  const dispatch = useAppDispatch();
  const {data, isError, isLoading} = usePendingPropositionQuery(user.id); 

  useEffect(()=> {
    if(isError) dispatch(addToast({type:'warn', text: 'Vous avez déja une proposition en attente'}));
  }, [isError, dispatch]);


  if(isLoading) {
    return <Loader />;
  }
  
  if(!isLoading){
    
    return !isError ? children : <Navigate to={redirectTo} />;
  }
}




export default App;