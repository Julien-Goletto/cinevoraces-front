import { FieldsetSeason, FieldsetViewed, FieldsetTags } from './Fieldsets';
import styles from './DropDownMenu.module.scss';

const { season, genre, country } = { 
  season: [1, 2, 3],
  genre: ['Porn', 'Cosplay', 'Bukkake', 'Golden shower', 'Creampie', 'Animals'],
  country: ['Alsace', 'France', 'Japon', 'Bolivie']
};

function DropDownMenu() {
  return(
    <form className={styles['drop-down-menu']}>
      <FieldsetSeason array={season}/>
      <FieldsetViewed/>
      <FieldsetTags array={genre} tagName='Genres' />
      <FieldsetTags array={country} tagName='Pays' />
      <div className={styles['periode']}>
        <div>Période</div>
        <div className={styles['periode__input']}></div>
      </div>
    </form>
  );
}

export default DropDownMenu;