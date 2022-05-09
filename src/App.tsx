import Toast from 'components/Toast/Toast';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Layout from 'components/Layout/Layout';
import Error from './pages/Error/Error';
import Home from './pages/Home/Home';

function App() {

  return (
    <Layout>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='*' element={<Error />}/>
        </Routes>
      </Router>
      <Toast />
    </Layout>
  );
}

export default App;