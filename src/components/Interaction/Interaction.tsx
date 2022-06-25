type InteractionProps = {
  type: string,
}
function Interaction({type}: InteractionProps) {
  const typeResolver = (searchedString: string) => {
    if (RegExp(`\\b${searchedString}\\b`).test(type!)) {
      return true;
    } else {
      return false;
    }};
  
  return(
    <>
      {typeResolver('Jambon') && <p>Jambon</p>}
    </>
  );
}

export default Interaction;