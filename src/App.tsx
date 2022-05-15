import Toast from 'components/Toast/Toast';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { useAppSelector } from 'redux/hooks';
import { isOnline } from 'redux/slices/user';

import ResetScroll from 'components/ResetScroll/ResetScroll';
import Layout from 'components/Layout/Layout';
import Error from './pages/Error/Error';
import Films from './pages/Films/Films';
import User from './pages/User/User';
import Home from './pages/Home/Home';
import Film from './pages/Film/Film';
import Register from './pages/Register/Register';
import Proposal from './pages/Proposal/Proposal';

function App() {
  const isLogged = useAppSelector<boolean>(isOnline);

  return (
    <>
      <Router>
        <ResetScroll />
        <Layout>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/film' element={<Film />}/>
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