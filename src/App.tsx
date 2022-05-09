import Toast from 'components/Toast/Toast';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Layout from 'components/Layout/Layout';
import Error from './pages/Error/Error';
import Films from 'pages/Films/Films';
import Home from './pages/Home/Home';
import Film from './pages/Film/Film';

function App() {

  return (
    <Layout>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/films' element={<Films />}/>
          <Route path='/film' element={<Film />}/>
          <Route path='*' element={<Error />}/>
        </Routes>
      </Router>
      <Toast />
    </Layout>
  );
}

export default App;