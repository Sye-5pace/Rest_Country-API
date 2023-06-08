const countriesEndpoint = 'https://restcountries.com/v3.1/all';



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
        countryCard.addEventListener('click',(event)=>{
            const index = event.currentTarget.dataset.index;
            // const className = event.currentTarget.classList;
            console.log("Country index: " + index);
            // console.log("class name: " + className);
        });

        const countryContainer = document.getElementById('country-container')
        countryContainer.appendChild(countryCard);
    })
    return countryContainer
}

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
        // console.log("Country name: " + countryName);
        if(countryName.includes(searchValue)) {
            countryCard.style.display = 'block;'
        } else{
            countryCard.style.display = 'none';
        }
    });
}

const fetchData = async()=>{
    try{
        const response = await fetch(countriesEndpoint);
        if(!response.ok){
            throw new Error("Request failed with status" + response.status);
        }
        const countries = await response.json();
        countryDefaultLoader(countries);
        // searchQuery(countries);
    }catch(error){
        console.log(error);
    }
}

document.addEventListener("DOMContentLoaded",()=>{
    const searchInput = document.getElementById("search");
    searchInput.addEventListener("input",searchQuery);
    // searchInput.addEventListener("input",()=>{})
    // if(searchInput.value === '')
    fetchData();

});