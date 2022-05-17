const getFrenchCountries = () => {

};

const formatDataFilters = (data: DBMovie[]) => {
  const formatedData: FilterStateConstructor = {
    seasons: [{name: 'Tous les films', value: 'all', isChecked: true}],
    tags: [{tagName: 'Genres', tags: []},{tagName: 'Pays', tags: []}],
    periode: {baseValues: [], stateValues: []}
  };
  const seasonArr: string[] = [];
  const release_dateArr: number[] = [];
  const genreArr: string[] = [];
  const countryArr: string[] = [];
  data.forEach(({
    season_number,
    genres,
    countries,
    release_date,
  }) => {
    !(seasonArr.includes(String(season_number))) && seasonArr.push(String(season_number));
    !(release_dateArr.includes(Number(release_date.slice(0,4)))) && release_dateArr.push(Number(release_date.slice(0,4)));
    genres.forEach((genre) => {
      !(genreArr.includes(genre)) && genreArr.push(genre);
    });
    countries.forEach((country) => {
      !(countryArr.includes(country)) && countryArr.push(country);
    }); 
  });

  seasonArr.forEach((season) => {
    formatedData.seasons.push({ name: `Saison ${season}`, value: season, isChecked: false });
  });
  genreArr.forEach((genre) => {
    formatedData.tags[0].tags.push({name: genre, isChecked: false});
  });
  countryArr.forEach((country) => {
    formatedData.tags[1].tags.push({name: country, isChecked: false});
  });
  formatedData.periode.baseValues.push(Math.min(...release_dateArr));
  formatedData.periode.baseValues.push(Math.max(...release_dateArr));
  formatedData.periode.stateValues.push(Math.min(...release_dateArr));
  formatedData.periode.stateValues.push(Math.max(...release_dateArr));  
  return formatedData;
};

export { formatDataFilters, getFrenchCountries };