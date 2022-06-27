import Header from './Header';
import Footer from './Footer';

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