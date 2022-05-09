import Toast from 'components/Toast/Toast';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Layout from 'components/Layout/Layout';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';

function App() {

  return (
    <Layout>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/register' element={<Register />}/>
        </Routes>
      </Router>
      <Toast />
    </Layout>
  );
}

export default App;