import Toast from 'components/Toasts/Toasts';
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { isOnline, setUser } from 'redux/slices/user';
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
import { useRefreshTokenMutation } from 'redux/api';

function App() {
  const isLogged = useAppSelector<boolean>(isOnline);
  const dispatch = useAppDispatch();
  const [refreshToken, {data, isLoading, isError}] = useRefreshTokenMutation();

  //wait for refreshToken cycle to be done
  const [ready, setReady] = useState<boolean>(false);


  useEffect(()=>{
    const token = Cookies.get('refreshToken');
    if(token) {
      refreshToken(token);
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
            <Route path='/user/:id' element={<User />}/>
            <Route path='/proposal' 
              element={(isLogged) ? <Proposal /> : <Error errorNum={401}/>}
            />
            <Route path='*' element={<Error />}/>
          </Routes>
        </Layout>
      </Router>
      <Toast />
    </>
  );
}

export default App;