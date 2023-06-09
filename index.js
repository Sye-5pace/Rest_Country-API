const countriesEndpoint = 'https://restcountries.com/v3.1/all';

//Redirect Functionality
// const preview = (event,countries)=>{
//     const index = event.currentTarget.dataset.index;
//     const country = countries[index]
//     console.log('Clicked for preview to: ' + country)
// }

//default function to load REST Country Data
let defaultLoad ;
const countryDefaultLoader=(countries)=>{
    defaultLoad = countries

    const countryContainer = document.getElementById('country-container');
    countryContainer.innerHTML = "";

    countries.forEach((country,index) =>{        
        //creating flag element
        const flagImg = document.createElement('img');
        flagImg.src = country.flags['png'];
        flagImg.classList.add('h-[55%]','rounded-t-lg');
        
        //creating Common name element then reassign corresponding values
        const h1 = document.createElement('h1');
        h1.textContent = country.name['common'];
        h1.classList.add('font-geologica','font-bold', 'text-[1.2rem]','leading-[1rem]','my-1');

        
        //creating population element then reassign corresponding values
        const h3Population = document.createElement('h3');
        h3Population.innerHTML = "<span class='font-semibold'>Population</span>: " + country.population;
        h3Population.classList.add('font-geologica','text-[0.9rem]');

        //creating region element then reassign corresponding values
        const h3Region = document.createElement('h3');
        h3Region.innerHTML ="<span class='font-semibold'>Region</span>: " + country.region;
        h3Region.classList.add('font-geologica','text-[0.9rem]')
        
        //creating capital element then reassign corresponding values
        const h3Capital = document.createElement('h3');
        h3Capital.innerHTML ="<span class='font-semibold'>Capital</span>: " + country.capital
        h3Capital.classList.add('font-geologica','text-[0.9rem]')

        //creating card-detail container then reassign elements
        const cardDetail = document.createElement('div');
        cardDetail.classList.add('bg-white','h-[45%]','rounded-b-lg','pl-4','pt-2','flex','flex-col','gap-y-1')
        cardDetail.appendChild(h1);
        cardDetail.appendChild(h3Population);
        cardDetail.appendChild(h3Region);
        cardDetail.appendChild(h3Capital);

        //create country-card 
        const countryCard = document.createElement('div');
        countryCard.appendChild(flagImg);
        countryCard.appendChild(cardDetail);
        countryCard.classList.add('flex','flex-col','cursor-pointer','shadow-lg','shadow-slate-200/50','h-[18rem]','country-card');


        // Set data-index attribute
        countryCard.setAttribute('data-index', index);

        //Event handler to pass data through url to preview page
        countryCard.addEventListener('click',(event,index)=>{
            const countryIndex = event.currentTarget.dataset.index;
            const countryFlag = country.flags.png
            const countryName = country.name['common']
            const nativeName = country.name.nativeName.ara
            const population = country.population
            const countryRegion = country.region
            const countrySubRegion = country.subregion
            const countryCapital = country.capital
            const countryTld = country.tld['0']
            const countryCurrency = country.currencies
            const countryLanguages = country.languages.ara
            const countryNeighbors = country.borders ;

            /* console.log(countryIndex)
            console.log("Flag: " + countryFlag)
            console.log("countryName: " + countryName)
            console.log("Native name: " +  nativeName)
            console.log("Population: " +population)
            console.log("Region: " +countryRegion)
            console.log("subregion: " +countrySubRegion)
            console.log("capital: " +countryCapital)
            console.log("TLD: " + countryTld)
            console.log("Currency: " +  countryCurrency)
            console.log("Languages: " + countryLanguages)
            console.log("borders: " + countryNeighbors); */

            const url = "previewpage.html?" +
            "&redirectFlag=" + encodeURIComponent(countryFlag) +
            "&redirectName=" + encodeURIComponent(countryName) +
            "&redirectNativeName=" + encodeURIComponent(nativeName) +
            "&redirectPopulation=" + encodeURIComponent(population) +
            "&redirectRegion=" + encodeURIComponent(countryRegion) +
            "&redirectSubRegion=" + encodeURIComponent(countrySubRegion) +
            "&redirectCapital=" + encodeURIComponent(countryCapital) +
            "&redirectTld=" + encodeURIComponent(countryTld) + 
            "&redirectCurrency=" + encodeURIComponent(countryCurrency) +
            "&redirectLanguage=" + encodeURIComponent(countryLanguages) + 
            "&redirectNeighbors=" + encodeURIComponent(countryNeighbors);

            //  console.log(url)
            window.location.href = url;
        });

        const countryContainer = document.getElementById('country-container')
        countryContainer.appendChild(countryCard);
    })
    return countryContainer
}



///Search for a country functionality
const searchQuery= () =>{
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
            countryCard.style.display = 'block;'
        } else{
            countryCard.style.display = 'none';
        }
    });
}
    

///GET Req from REST Countries API
const fetchData = async()=>{
    try{
        const response = await fetch(countriesEndpoint);
        if(!response.ok){
            throw new Error("Request failed with status" + response.status);
        }
        const countries = await response.json();
        countryDefaultLoader(countries);
        console.log(countries)
    }catch(error){
        console.log(error);
    }
}

//DOMContentLoaded for the main page
document.addEventListener("DOMContentLoaded",()=>{
    const searchInput = document.getElementById("search");
    searchInput.addEventListener("input",searchQuery);
    
    /* const countriesCard = document.querySelectorAll('.country-card')
    countriesCard.forEach((countryCard) => {
        countryCard.addEventListener('click',previewRedirect);
    })
     */
    fetchData();

});