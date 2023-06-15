// const { preview } = require("vite");

document.addEventListener('DOMContentLoaded', () => {

    //Receives and breaks the URL passed with data parameters
    const urlReceiver = (paramName,url) =>{
        if(!url) url = window.location.href;
        paramName = paramName.replace(/[[\]]/g, "\\$&");
        const regex = new RegExp("[?&]" + paramName + "(=([^&#]*)|&|#|$)");
        let results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ""));
    }
    
    //Extract params from the urlReceiver 
    const previewUpdater = () => {
        const countryFlag = urlReceiver('redirectFlag');
        const countryName = urlReceiver('redirectName');
        const nativeName = urlReceiver('redirectNativeName');
        const countryPopulation = urlReceiver('redirectPopulation');
        const countryRegion = urlReceiver('redirectRegion');
        const subRegion = urlReceiver('redirectSubRegion');
        const capital = urlReceiver('redirectCapital');
        const countryTld = urlReceiver('redirectTld');
        const countryCurrency = urlReceiver('redirectCurrency');
        const language = urlReceiver('redirectLanguage');
        const borders = urlReceiver('redirectNeighbors');

        //mapping border Array elements then create a
        //div into append  
        const neighborArray = borders.split(',');
        const borderContainer = document.getElementById('border-neighbor');
        const neighborContainer = document.createElement('div');
        neighborContainer.classList.add('neighbor-name','w-[21%]','h-[65%]','rounded-[0.3rem]','shadow-xl','shadow-slate-200/50','pl-3','pr-12','self-center','font-geologica','font-semibold','text-black','border-2' ,'border-dashed');
        
        neighborArray.forEach(neighbor => {
            neighborContainer.textContent = neighbor;
            borderContainer.appendChild(neighborContainer);
        })
        // Array.from(borders).forEach(neighbor => console.log(neighbor))

        const flagContainer = document.getElementById('flag-container');
        const flagImg = document.createElement('img');
        flagImg.src = countryFlag;
        flagImg.classList.add('w-full','h-full');
        flagContainer.appendChild(flagImg);

        const previewH1 = document.getElementById('preview-h1');
        previewH1.textContent = countryName;

        const previewDetails1 = document.getElementById('preview-details-1');
        const previewNativeName = document.createElement('h3');
        previewNativeName.innerHTML = "<span class='font-semibold font-geologica'>Native name: </span> " + nativeName;
        
        
        const populationH3 = document.createElement('h3');
        populationH3.innerHTML = "<span class='font-semibold font-geologica'>Population: </span> " + countryPopulation;
        
        const previewRegion = document.createElement('h3');
        previewRegion.innerHTML = "<span class='font-semibold font-geologica'>Region: </span> " + countryRegion;
        
        const previewSubRegion = document.createElement('h3');
        previewSubRegion.innerHTML = "<span class='font-semibold font-geologica'>Sub Region: </span> " + subRegion;
        
        const previewCapital = document.createElement('h3');
        previewCapital.innerHTML = "<span class='font-semibold font-geologica'>Capital: </span> " + capital;
        
        const previewTld = document.createElement('h3');
        previewTld.innerHTML = "<span class='font-semibold font-geologica'>Top Level Domain: </span> " + countryTld;
        
        const previewCurrency = document.createElement('h3');
        previewCurrency.innerHTML = "<span class='font-semibold font-geologica'>Currency: </span> " + countryCurrency;
        
        const previewLang = document.createElement('h3');
        previewLang.innerHTML = "<span class='font-semibold font-geologica'>Languages: </span> " + language;


        previewDetails1.appendChild(previewNativeName);
        previewDetails1.appendChild(populationH3);
        previewDetails1.appendChild(previewRegion);
        previewDetails1.appendChild(previewSubRegion);
        previewDetails1.appendChild(previewCapital);
        previewDetails1.classList.add('font-geologica','text-[1.3rem]','flex','flex-col','gap-y-2');

        const previewDetails2 = document.getElementById('preview-details-2')
        previewDetails2.appendChild(previewTld);
        previewDetails2.appendChild(previewCurrency);
        previewDetails2.appendChild(previewLang);
        previewDetails2.classList.add('font-geologica','text-[1.5rem]','flex','flex-col','gap-y-4')

        //theme Switcher for PreviewPage
        const toggleTheme = (darkModeEnabled) => {
            const darkMode = document.querySelector('#dark-mode');
            const lightMode = document.querySelector("#light-mode");
            const header = document.querySelector('header');
            const previewDetail1 = document.querySelector('#preview-details-1')
            const previewDetail2 = document.querySelector('#preview-details-2')
            const navBack = document.querySelector('#nav-back');
            const navTxt = document.querySelector('#nav-text')
            const navIcon = document.querySelector('#nav-icon')
            const body = document.querySelector('body');
            const h1Preview = document.querySelector('#preview-h1');
            const borderElem = document.querySelector("#border-elem");
            const neighborName = document.querySelectorAll(".neighbor-name");
        
            if (darkModeEnabled) {
              darkMode.style.display = "none";
              lightMode.style.display = "flex";
              header.style.backgroundColor = '#2a3643'
              header.style.color = "#fff"
              header.style.boxShadow = '16px 6px 16px rgba(30,44,52,255)';
              navBack.style.backgroundColor = '#2a3643'
              navBack.style.boxShadow = '10px 6px 16px rgba(30,44,52,255)'
              navBack.style.color = '#2a3643';
              navTxt.style.color = '#fff';
              navIcon.style.color = '#fff';
              previewDetail1.style.color='#fff';
              previewDetail2.style.color='#fff';
              body.style.backgroundColor = '#2a3643'
              h1Preview.style.color="#fff";
              borderElem.style.color="#fff";
              neighborName.forEach((name) => {
                name.style.color='#fff';
                name.style.boxShadow = '10px 6px 10px rgba(30,44,52,255)'
              })
            } else {
              darkMode.style.display = "flex";
              lightMode.style.display = "none";
              header.style.backgroundColor = '#fff'
              header.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
              header.style.color = "#000"
              navBack.style.backgroundColor = '#fff'
              navBack.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
              navBack.style.color = '#000'
              navTxt.style.color= '#000'
              navIcon.style.color = '#000';
              h1Preview.style.color="#000";
              previewDetail1.style.color='#000';
              previewDetail2.style.color='#000';
              borderElem.style.color="#000";
              body.style.backgroundColor = '#fafafa'
              body.style.color = '#000'
              neighborName.forEach((name) => {
                name.style.color='#000';
                name.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
              })
            }
        }

        // Function to save the current theme in localStorage
        const saveTheme = (darkModeEnabled) => {
            localStorage.setItem('darkModeEnabled', darkModeEnabled);
        }

        // Function to load the theme from localStorage
        const loadTheme = () => {
            const darkModeEnabled = localStorage.getItem('darkModeEnabled') === 'true';
            toggleTheme(darkModeEnabled);
        }

        // Theme switch event listeners
        const darkMode = document.querySelector('#dark-mode');
        const lightMode = document.querySelector("#light-mode");

        darkMode.addEventListener("click", () => {
            toggleTheme(true);
            saveTheme(true);
        });

        lightMode.addEventListener("click", () => {
            toggleTheme(false);
            saveTheme(false);
        });

        // Load the theme when the DOM is ready
        loadTheme();
    }

    previewUpdater()
    
});