import Header from './Header/Header';
import Footer from './Footer/Footer';

function Layout({children}: Layout) {
  return(
    <>
      <Header/>
      {children}
      <Footer/>
    </>
  );
}

export default Layout;