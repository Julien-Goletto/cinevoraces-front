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

function App() {

  return (
    <Layout>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/films' element={<Films />}/>
          <Route path='/user' element={<User />}/>
          <Route path='*' element={<Error />}/>
        </Routes>
      </Router>
      <Toast />
    </Layout>
  );
}

export default App;