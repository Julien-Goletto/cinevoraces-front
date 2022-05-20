import Header from './Header/Header';
import Footer from './Footer/Footer';

function Layout({children}: Layout) {
  return(
    <>
      <Header/>
      <main style={{minHeight: '78vh'}}>
        {children}
      </main>
      <Footer/>
    </>
  );
}

export default Layout;