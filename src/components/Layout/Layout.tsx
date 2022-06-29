import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children?: React.ReactNode
};

/**
 * @returns App layout 
 */
function Layout({children}: LayoutProps) {
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