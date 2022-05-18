// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './Option.module.scss';

type OptionProps = {
  slot: {
    episode: number,
    publishing_date?: string
  }
}

function Option(props: OptionProps) {
  const { slot } = props;
  return (
    <>
      <option value={slot.episode}>Episode {slot.episode}</option>
    </>
  );
}

export default Option;