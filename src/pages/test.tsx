import Interaction from 'components/Interaction/Interaction';

export default function Test() {
  const value = 5;
  const setter = () => {

  };
  return(
    <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '10rem'}}>
      <Interaction value={value} setter={setter} type='liked' count={8}/>
      <Interaction value={value} setter={setter} type='viewed' count={8}/>
      <Interaction value={value} setter={setter} type='bookmarked' count={8}/>
      <Interaction isActive value={value} setter={setter} type='starred' count={8}/>
    </div>
  );
}