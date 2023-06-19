import { countryDefaultLoader } from "./data.js";

//Search for a country functionality
export const searchQuery= () =>{
    const searchValue = document.getElementById('search').value.toLowerCase();
    const countryCards = document.querySelectorAll('.country-card')
   
    if( searchValue === ''){
        return countryDefaultLoader(defaultLoad);
    }
    
    //Function to load all classnames for country cards
    //convert them into a array then for the whose H1 element value to includes
    //the search value from the searchInput field
    Array.from(countryCards).forEach((countryCard) => {
        const countryName =  countryCard.querySelector('h1').textContent.toLowerCase();
        if(countryName.includes(searchValue)) {
            countryCard.style.display = 'block';
        } else{
            countryCard.style.display = 'none';
        }
    });
}

//Filter by region
export const filterQuery = (event) => {
    const filterValue = event.target.textContent.toLowerCase();
    const countryCards = document.querySelectorAll('.country-card');
    
    
    Array.from(countryCards).forEach((countryCard) => {
        const regionValue = countryCard.querySelector('.region').textContent.toLowerCase();
        if (regionValue.includes(filterValue)) {
            countryCard.style.display = 'block';
        } else {
            countryCard.style.display = 'none';
        }
    });
};
