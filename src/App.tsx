import Toast from 'components/Toast/Toast';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Layout from 'components/Layout/Layout';
import Error from './pages/Error/Error';
import Films from './pages/Films/Films';
import User from './pages/User/User';
import Home from './pages/Home/Home';
import Film from './pages/Film/Film';
import Register from './pages/Register/Register';
import Proposal from './pages/Proposal/Proposal';

function App() {

  return (
    <Layout>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/films' element={<Films />}/>
          <Route path='/film' element={<Film />}/>
          <Route path='/user' element={<User />}/>
          <Route path='/proposal' element={<Proposal />}/>
          <Route path='*' element={<Error />}/>
        </Routes>
      </Router>
      <Toast />
    </Layout>
  );
}

export default App;