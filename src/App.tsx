import Toast from 'components/Toast/Toast';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Layout from 'components/Layout/Layout';
import Home from './pages/Home/Home';
import Modal from 'components/Modal/Modal';
import Connection from 'components/Modal/Connection/Connection';

function App() {

  return (
    <Layout>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
        </Routes>
      </Router>
      <Toast />
      <Modal>
        <Connection />
      </Modal>
    </Layout>
  );
}

export default App;