import Header from './Header/Header';
import Footer from './Footer/Footer';

/**
 * @returns App layout 
 */
function Layout({children}: Layout) {
  return(
    <>
      <Header/>
      <main>
        {children}
      </main>
      <Footer/>
    </>
  );
}

export default Layout;