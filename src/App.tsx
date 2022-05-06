import Toast from 'components/Toast/Toast';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Layout from 'components/Layout/Layout';
import Home from './pages/Home/Home';
import Movie from './pages/Movie/Movie';

function App() {

  return (
    <Layout>
      <Router>
        <Routes>
          {/* <Route path='/' element={<Home />}/> */}
          <Route path='/movie' element={<Movie />}/>
        </Routes>
      </Router>
      <Toast />
    </Layout>
  );
}

export default App;