const countriesEndpoint = 'https://restcountries.com/v3.1/all';

let defaultLoad;
let currentPage =1;
const itemsPerPage = 12;

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


//defaultLoad()
const countryDefaultLoader = (countries) => {
    defaultLoad = countries;
    showPage(currentPage);
}

// Pagination breaker:ShowPage()
const showPage =(page)=>{
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
        // console.log(detailContainer)

        //create country-card 
        const countryCard = document.createElement('div');
        countryCard.appendChild(flagImg);
        countryCard.appendChild(detailContainer);
        countryCard.classList.add('flex','flex-col','cursor-pointer','shadow-lg','shadow-slate-200/50','rounded-b-lg','h-[18rem]','country-card');
        // const card = document.querySelector('.card');
        // toggleTheme(countryCard,card)
        
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
        const countryContainer = document.getElementById('country-container')
        countryContainer.appendChild(countryCard)
    })
    paginationActiveStates(page)
};

//Pagination Functions:
//Active page indicator
const paginationActiveStates =(page)=>{
    const paginationCounts = document.querySelectorAll('#pagination li')
    paginationCounts.forEach((item)=>{
        if(item.dataset.index === page){
            item.classList.add('active','border-2');
        }else{
            item.classList.remove('active','border-2');
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


// //default function to load REST Country Data
// const countryDefaultLoader=(countries)=>{
//     defaultLoad = countries

//     const countryContainer = document.getElementById('country-container');
//     countryContainer.innerHTML = "";

//     countries.forEach((country,index) =>{        
//         /* //creating flag element
//         const flagImg = document.createElement('img');
//         flagImg.src = country.flags['png'];
//         flagImg.classList.add('h-[55%]','rounded-t-lg','w-full');
        
//         //creating Common name element then reassign corresponding values
//         const h1 = document.createElement('h1');
//         h1.textContent = country.name['common'];
//         h1.classList.add('font-geologica','font-bold', 'text-[1.2rem]','leading-[1rem]','my-1');

        
//         //creating population element then reassign corresponding values
//         const h3Population = document.createElement('h3');
//         h3Population.innerHTML = "<span class='font-semibold'>Population</span>: " + country.population;
//         h3Population.classList.add('font-geologica','text-[0.9rem]');

//         //creating region element then reassign corresponding values
//         const h3Region = document.createElement('h3');
//         h3Region.innerHTML ="<span class='font-semibold'>Region</span>: " + country.region;
//         h3Region.classList.add('font-geologica','text-[0.9rem]','region')
        
//         //creating capital element then reassign corresponding values
//         const h3Capital = document.createElement('h3');
//         h3Capital.innerHTML ="<span class='font-semibold font-geologica'>Capital</span>: " + country.capital;
//         h3Capital.classList.add('font-geologica','text-[0.9rem]')

//         //creating card-detail container then reassign elements
//         const detailContainer = document.createElement('div');
//         detailContainer.classList.add('card','bg-white','h-[45%]','rounded-b-lg','pl-4','pt-2','flex','flex-col','gap-y-1')
//         detailContainer.appendChild(h1);
//         detailContainer.appendChild(h3Population);
//         detailContainer.appendChild(h3Region);
//         detailContainer.appendChild(h3Capital);
//         // console.log(detailContainer)

//         //create country-card 
//         const countryCard = document.createElement('div');
//         countryCard.appendChild(flagImg);
//         countryCard.appendChild(detailContainer);
//         countryCard.classList.add('flex','flex-col','cursor-pointer','shadow-lg','shadow-slate-200/50','rounded-b-lg','h-[18rem]','country-card');
//         // const card = document.querySelector('.card');
//         // toggleTheme(countryCard,card)
        
//         // Set data-index attribute
//         countryCard.setAttribute('data-index', index);
        
//         //Event handler to pass data through url to preview page
//         countryCard.addEventListener('click',(event)=>{
//             const countryIndex = event.currentTarget.dataset.index;
//             const nativeNameKey = Object.keys(country.name.nativeName)[0]
//             const languagesKey = Object.keys(country.languages)[0]
//             const currenciesKey = Object.keys(country.currencies)[0]
//             const countryFlag = country.flags.png
//             const countryName = country.name['common']
//             const nativeName = country.name.nativeName[nativeNameKey].common
//             const population = country.population
//             const countryRegion = country.region
//             const countrySubRegion = country.subregion
//             const countryCapital = country.capital
//             const countryTld = country.tld['0']
//             const countryCurrency = country.currencies[currenciesKey].name
//             const countryLanguages = country.languages[languagesKey]
//             const borders = country.borders;

//             const url = "previewpage.html?" +
//             "&redirectFlag=" + encodeURIComponent(countryFlag) +
//             "&redirectName=" + encodeURIComponent(countryName) +
//              "&redirectNativeName=" + encodeURIComponent(nativeName) +
//              "&redirectPopulation=" + encodeURIComponent(population) +
//              "&redirectRegion=" + encodeURIComponent(countryRegion) +
//              "&redirectSubRegion=" + encodeURIComponent(countrySubRegion) +
//              "&redirectCapital=" + encodeURIComponent(countryCapital) +
//              "&redirectTld=" + encodeURIComponent(countryTld) + 
//              "&redirectCurrency=" + encodeURIComponent(countryCurrency) +
//              "&redirectLanguage=" + encodeURIComponent(countryLanguages) + 
//              "&redirectNeighbors=" + encodeURIComponent(borders);
//              window.location.href = url;
//         }); */
        
//         const countryContainer = document.getElementById('country-container')
//         // countryContainer.appendChild(countryCard);
//     })
//     return countryContainer
// }



///Search for a country functionality
const searchQuery= () =>{
    const searchValue = document.getElementById('search').value.toLowerCase();
    const countryCards = document.querySelectorAll('.country-card')
    // const body = document.querySelector('body')
    
    if( searchValue === ''){
        return countryDefaultLoader(defaultLoad);
    }
    
    //Function to load all classnames for country cards
    //convert them into a array then for the whose H1 element value to includes
    //the search value from the searchInput field
    Array.from(countryCards).forEach((countryCard) => {
        const countryName =  countryCard.querySelector('h1').textContent.toLowerCase();
        if(countryName.includes(searchValue)) {
            // body.classList.add('grid','grid-rows-[9%_7%_84%]','gap-y-10')
            countryCard.style.display = 'block';
            // body.classList.add('grid','gap-y-4')
        } else{
            countryCard.style.display = 'none';
        }
    });
}

//Filter by region
// const filterRegion 
const filterQuery = (event) => {
    const filterValue = event.target.textContent.toLowerCase();
    const countryCards = document.querySelectorAll('.country-card');
    
    
    Array.from(countryCards).forEach((countryCard) => {
        //   console.log(flagImg);
        const regionValue = countryCard.querySelector('.region').textContent.toLowerCase();
        if (regionValue.includes(filterValue)) {
            countryCard.style.display = 'block';
        } else {
            countryCard.style.display = 'none';
        }
    });
};


//DOMContentLoaded for the main page
document.addEventListener("DOMContentLoaded",()=>{
    //load page will fetch content
    fetchData();
    
    //Theme Switcher EventListeners:
// Function to save the current theme in localStorage
    const saveTheme = (darkModeEnabled) => {
        localStorage.setItem('darkModeEnabled', darkModeEnabled);
    }
// Function to load the theme from localStorage
    const loadTheme = () => {
        const darkModeEnabled = localStorage.getItem('darkModeEnabled') === 'true';
        toggleTheme(darkModeEnabled);
    }

// Function to toggle the theme
    const toggleTheme = (darkModeEnabled,countryCards) => {
        
        const lightMode = document.querySelector("#light-mode");
        const darkMode = document.querySelector("#dark-mode");
        const header = document.querySelector("header");
        const body = document.querySelector("body");
        const searchContainer = document.querySelector("#search-container");
        const searchField = document.querySelector("#search");
        const filterParent = document.querySelector("#filter-container");
        const filterHandler = document.querySelector('#filter-handler');
        const regionContainer = document.querySelector('#filter-items');
        // const countryCards = document.querySelectorAll('.country-card');
        const paginationSection = document.querySelector('#pagination');
        // console.log(countryCards);
        if (darkModeEnabled) {
            darkMode.style.display = "none";
            lightMode.style.display = "flex";
            paginationSection.style.color = '#fff';
            header.style.backgroundColor = '#2b3642';
            header.style.boxShadow = '16px 6px 16px rgba(30, 44, 52, 255)';
            header.style.color = '#fff';
            body.style.backgroundColor = '#212f36';
            searchContainer.style.backgroundColor = '#2a3643';
            searchContainer.style.boxShadow = '16px 6px 16px rgba(30, 44, 52, 255)';
            filterParent.style.backgroundColor = '#2a3643';
            filterParent.style.color = '#fff';
            filterParent.style.boxShadow = '16px 6px 16px rgba(30, 44, 52, 255)';
            filterHandler.style.backgroundColor = '#2a3643';
            filterHandler.style.color = '#fff';
            regionContainer.style.backgroundColor = '#2a3643';
            regionContainer.style.boxShadow = '16px 6px 16px rgba(30, 44, 52, 255)';
            regionContainer.style.color = "#fff";
            searchField.style.backgroundColor = "#2a3643";
            searchField.style.color = "#fff";
            // countryCard.style.boxShadow = '16px 6px 16px rgba(30, 44, 52, 255)';
            // card.style.backgroundColor = "#2a3643";
            // card.style.color = "#fff";
            saveTheme(true);
        } else {
            lightMode.style.display = "none";
            darkMode.style.display = "flex";
            header.style.backgroundColor = '#fff';
            header.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
            header.style.color = '#000';
            paginationSection.style.color = '#000';
            body.style.backgroundColor = '#fafafa';
            searchContainer.style.backgroundColor = '#fff';
            searchContainer.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
            filterParent.style.backgroundColor = '#fff';
            filterParent.style.color = '#000';
            filterParent.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
            filterHandler.style.backgroundColor = '#fff';
            filterHandler.style.color = '#000';
            regionContainer.style.backgroundColor = '#fff';
            regionContainer.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
            regionContainer.style.color = '#000';
            searchField.style.backgroundColor = '#fff';
            searchField.style.color = '#000';
            // countryCard.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
            // card.style.backgroundColor = '#fff';
            // card.style.color = '#000';
            saveTheme(false);
        }
    }

    // Theme Switcher EventListeners:
    const darkMode = document.querySelector("#dark-mode");
    const lightMode = document.querySelector("#light-mode");

    ///Dark Mode eventlistener
    darkMode.addEventListener("click", () => {
        toggleTheme(true);
    });

    //Light Mode eventlistener
    lightMode.addEventListener("click", () => {
        toggleTheme(false);
    });

    // Load the theme when the page is loaded
    loadTheme();

    const searchInput = document.getElementById("search");
    searchInput.addEventListener("input",searchQuery);
    
    const filterContainer= document.getElementById("filter-items");

    //eventListener to switch between up and down indicators
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
    
    //FilterQuery EventListener
    const filterItems = document.querySelectorAll(".filter-item");
    filterItems.forEach((filterItem)=>{
        filterItem.addEventListener("click",filterQuery)
    });   

});