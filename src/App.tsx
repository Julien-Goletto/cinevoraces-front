import { useEffect }                  from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence }            from 'framer-motion';
import { useLazyRefreshTokenQuery }   from 'redux/api';
import { useAppDispatch }             from 'redux/hooks';
import { login }                      from 'redux/slices/user';
import Cookies     from 'js-cookie';
import Toast       from 'components/Toasts/Toasts';
import ResetScroll from 'components/ResetScroll/ResetScroll';
import Layout      from 'components/Layout/Layout';
import Loader      from 'components/Loader/Loader';
import Error       from 'pages/Error/Error';
import Films       from 'pages/Films/Films';
import User        from 'pages/User/User';
import Home        from 'pages/Home/Home';
import Film        from 'pages/Film/Film';
import Register    from 'pages/Register/Register';
import Proposal    from 'pages/Proposal/Proposal';
import Team        from 'pages/Team/Team';
import Admin       from 'pages/Admin/Admin';

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [refreshToken, {data, isLoading, isError}] = useLazyRefreshTokenQuery();

  // Token cycle
  useEffect(() => {
    // Request new token
    Cookies.get('refreshToken') && refreshToken();
  }, []);
  useEffect(() => {
    // Dispatch response
    (!isLoading && data && !isError) && dispatch(login(data));
  }, [data]);
  
  return ( 
    <>
      {data &&
        <>
          <Layout>
            <AnimatePresence exitBeforeEnter>
              <ResetScroll />
              <Routes location={location} key={location.pathname}>
                <Route path='/' element={<Home />}/>
                <Route path='/film/:id' element={<Film />}/>
                <Route path='/films' element={<Films />}/>
                <Route path='/register' element={<Register />}/>
                <Route path='/user/:id' element={<User />}/>
                <Route path='/proposal' element={<Proposal />}/>
                <Route path='/team' element={<Team />}/>
                <Route path='/admin' element={<Admin />}/>
                <Route path='*' element={<Error />}/>
              </Routes>
            </AnimatePresence>
          </Layout>
          <Toast />
        </>}
      {!data && <Loader isMaxed/>}
    </>

  );
}

export default App;