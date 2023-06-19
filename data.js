import { toggleTheme} from './theme_switcher.js'

const countriesEndpoint = 'https://restcountries.com/v3.1/all';

let defaultLoad;
let currentPage = 1;
const itemsPerPage = 12;

///GET Req from REST Countries API
export const fetchData = async()=>{
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

//defaultLoad()
export const countryDefaultLoader = (countries) => {
defaultLoad = countries;
    showPage(currentPage);
}

export const showPage =(page)=>{
    const countryContainer = document.getElementById('country-container');
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const countrySubset = defaultLoad.slice(startIndex, endIndex);

    countryContainer.innerHTML = '';                

    countrySubset.forEach((country,index)=> {
        //creating flag element
        const flagImg = document.createElement('img');
        flagImg.src = country.flags['png'];
        flagImg.classList.add('h-[55%]','rounded-t-lg','w-full');
        
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
        h3Region.classList.add('font-geologica','text-[0.9rem]','region')
        
        //creating capital element then reassign corresponding values
        const h3Capital = document.createElement('h3');
        h3Capital.innerHTML ="<span class='font-semibold font-geologica'>Capital</span>: " + country.capital;
        h3Capital.classList.add('font-geologica','text-[0.9rem]')

        //creating card-detail container then reassign elements
        const detailContainer = document.createElement('div');
        detailContainer.classList.add('card','bg-white','h-[45%]','rounded-b-lg','pl-4','pt-2','flex','flex-col','gap-y-1')
        detailContainer.appendChild(h1);
        detailContainer.appendChild(h3Population);
        detailContainer.appendChild(h3Region);
        detailContainer.appendChild(h3Capital);

        //create country-card 
        const countryCard = document.createElement('div');
        countryCard.appendChild(flagImg);
        countryCard.appendChild(detailContainer);
        countryCard.classList.add('flex','flex-col','cursor-pointer','shadow-md','shadow-slate-200/50','rounded-b-lg','h-[18rem]','mobile:h-[25rem]','country-card');
        
        // Set data-index attribute
        countryCard.setAttribute('data-index', index);
        
        
        //Event handler to pass data through url to preview page
        countryCard.addEventListener('click',(event)=>{
            const countryIndex = event.currentTarget.dataset.index;
            const nativeNameKey = Object.keys(country.name.nativeName)[0]
            const languagesKey = Object.keys(country.languages)[0]
            const currenciesKey = Object.keys(country.currencies)[0]
            const countryFlag = country.flags.png
            const countryName = country.name['common']
            const nativeName = country.name.nativeName[nativeNameKey].common
            const population = country.population
            const countryRegion = country.region
            const countrySubRegion = country.subregion
            const countryCapital = country.capital
            const countryTld = country.tld['0']
            const countryCurrency = country.currencies[currenciesKey].name
            const countryLanguages = country.languages[languagesKey]
            const borders = country.borders;
            
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
            "&redirectNeighbors=" + encodeURIComponent(borders);
            window.location.href = url;
        });
        // toggleTheme(darkModeEnabled,countryCard)
        const countryContainer = document.getElementById('country-container')
        countryContainer.appendChild(countryCard)
    })
    paginationActiveStates(page)
};

//Pagination Functions:
//Active page indicator
export const paginationActiveStates =(page)=>{
    const paginationCounts = document.querySelectorAll('#pagination li')
    paginationCounts.forEach((item)=>{
        if(item.dataset.index === page){
            item.classList.add('active','border-2', 'shadow-lg','text-[1.2rem]');
        }else{
            item.classList.remove('active','border-2','shadow-lg','text-[1.2rem]');
        }
    });
}

//EventListener for pagination list
const pagesRender = document.querySelectorAll("#pagination li");
pagesRender.forEach((page)=>{
    page.addEventListener("click",(event)=>{
        const pageIndex = event.currentTarget.dataset.index ;
        currentPage = pageIndex;
        showPage(currentPage);
    })
})

//eventListener to switch between up and down indicators
const filterContainer= document.getElementById("filter-items");
const downIndicator = document.querySelector('#down'); 
const upIndicator = document.querySelector('#up');
downIndicator.addEventListener('click',(event)=>{
    event.currentTarget.style.display = "none";
    upIndicator.style.display = "block";
    filterContainer.style.display = "block";
})

upIndicator.addEventListener('click',(event)=>{
    event.currentTarget.style.display = 'none';
    downIndicator.style.display = "block";
    filterContainer.style.display = "none";
    countryDefaultLoader(defaultLoad);
})