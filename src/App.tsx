import Button from 'components/Buttons/Button';
import ButtonActions from 'components/Buttons/ButtonActions';
import ButtonSearch from 'components/Buttons/ButtonSearch';
import Toast from 'components/Toast/Toast';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Layout from 'components/Layout/Layout';
import Home from './pages/Home/Home';

function App() {

  return (
    <Layout>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
        </Routes>
      </Router>
      <Toast />
    </Layout>
  );
}

export default App;