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
import Home from './pages/Home/Home';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
        </Routes>
      </Router>
      <Toast />
      <Button state='full'>Hello world</Button>
      <ButtonActions state='full'>Test</ButtonActions>
    </>
  );
}

export default App;