// import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const transition = {
  type: 'tween',
  ease: 'linear',
  duration: 0.2
}; 
const variants  = {
  hidden: { opacity: 0, transition },
  show:   { opacity: 1, transition },
};

const AnimationLayout = ({children}: {children: React.ReactNode}) => {
  // This method no longer work in React-router-dom v6
  // You need to wrap every page you want to animate with this component
  // const { pathname } = useLocation();
  return (
    <motion.div
      // key={pathname}
      variants={variants}
      initial='hidden'
      animate='show'
      exit='hidden'
    >
      {children}
      {/* <Outlet /> */}
    </motion.div>
  );
};

export default AnimationLayout;