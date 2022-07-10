import { useGetOneMovieQuery } from 'redux/api';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'redux/hooks';
import { userState } from 'redux/slices/user';
import Content from './Content';
import FilmReviews from './FilmReviews';
import Footer from 'components/Layout/Footer';
import Loader from 'components/Loader/Loader';
import AnimationLayout from 'components/AnimationLayout/AnimationLayout';
import styles from './Film.module.scss';

function Film() {
  const {id: movieId}            = useParams();
  const {id: userId}             = useAppSelector(userState);
  const {data: movie, isLoading} = useGetOneMovieQuery(movieId!);
  return (
    <AnimationLayout>
      {movie &&
      <>
        <main className={styles.film}>
          <Content movie={movie}/>
          <FilmReviews movieId={movieId!} userId={userId}/>
        </main>
        <Footer/>
      </>}
      {isLoading && <Loader isMaxed/>}
    </AnimationLayout>
  );
};

export default Film;