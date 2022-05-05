import Header from './Header/Header';

function Layout({children}: Layout) {
  return(
    <>
      <Header/>
      {children}
    </>
  );
}

export default Layout;