import { FieldsetSeason, FieldsetViewed, FieldsetTags, FieldsetDate } from './Fieldsets';
import styles from './DropDownMenu.module.scss';

const { season, genre, country, minValue, maxValue } = { 
  season: [1, 2, 3],
  genre: ['Action', 'Film d\'épouvante'],
  country: ['Alsace', 'Autre'],
  minValue: 1900, maxValue: 2077
};

function DropDownMenu() {
  return(
    <form className={styles['drop-down-menu']}>
      <FieldsetSeason array={season}/>
      <FieldsetViewed/>
      <FieldsetTags
        array={genre}
        tagName='Genres' 
      />
      <FieldsetTags 
        array={country}
        tagName='Pays'
      />
      <FieldsetDate
        min={minValue}
        max={maxValue}
        label='Période'
      />
    </form>
  );
}

export default DropDownMenu;