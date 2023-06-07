const countriesEndpoint = 'https://restcountries.com/v3.1/all';

const countryDefaultLoader=(countries)=>{
    countries.forEach((country) =>{
        // console.log(country);
        console.log("flag:"+ country.flags['png']);
        console.log("name:"+ country.name['common']);
        console.log("population:"+ country.population);
        console.log("region:"+ country.region);
        console.log("capital:"+ country.capital);
        
        //creating flag element
        const flagImg = document.createElement('img');
        flagImg.src = country.flags['png'];
        
        //creating Common name element then reassign corresponding values
        const h1 = document.createElement('h1');
        h1.textContent = country.name['common'];

        
        //creating population element then reassign corresponding values
        const h3Population = document.createElement('h3');
        h3Population.textContent = "Population: " + country.population;

        //creating region element then reassign corresponding values
        const h3Region = document.createElement('h3');
        h3Region.textContent ="Region: " + country.region;

        //creating capital element then reassign corresponding values
        const h3Capital = document.createElement('h3');
        h3Capital.textContent ="Capital: " + country.capital

        //creating card-detail container then reassign elements
        const cardDetail = document.createElement('div');
        cardDetail.appendChild(h1);
        cardDetail.appendChild(h3Population);
        cardDetail.appendChild(h3Region);
        cardDetail.appendChild(h3Capital);

        //create country-card 
        const countryCard = document.createElement('div');
        countryCard.appendChild(flagImg);
        countryCard.appendChild(cardDetail);
        countryCard.classList.add('flex','flex-col','border-2','border-dashed');
        // countryCard.classList.add('w-[20%]','h-[28%]','border-2','border-dashed')

        const countryContainer = document.getElementById('country-container')
        countryContainer.appendChild(countryCard);
        console.log(countryContainer)
    })
    return countryContainer;

}

const fetchData = async()=>{
    try{
        const response = await fetch(countriesEndpoint);
        if(!response.ok){
            throw new Error("Request failed with status" + response.status);
        }
        const countries = await response.json();
        countryDefaultLoader(countries);
    }catch(error){
        console.log(error);
    }
}

document.addEventListener("DOMContentLoaded",()=>{
    fetchData();
});