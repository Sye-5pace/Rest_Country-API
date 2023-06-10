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
        //Passing countryNeighbors missed take notice?

        const flagContainer = document.getElementById('flag-container');
        const flagImg = document.createElement('img');
        flagImg.src = countryFlag;
        flagImg.classList.add('w-full','h-full');
        flagContainer.appendChild(flagImg);

        const previewH1 = document.getElementById('preview-h1');
        previewH1.textContent = countryName;

        const previewDetails1 = document.getElementById('preview-details-1');
        const previewNativeName = document.createElement('h3');
        previewNativeName.innerHTML = "<span class='font-semibold font-geologica'>Native name:</span>" + nativeName;
        
        
        const populationH3 = document.createElement('h3');
        populationH3.innerHTML = "<span class='font-semibold font-geologica'>Population:</span> " + countryPopulation;
        
        const previewRegion = document.createElement('h3');
        previewRegion.innerHTML = "<span class='font-semibold font-geologica'>Region:</span> " + countryRegion;
        
        const previewSubRegion = document.createElement('h3');
        previewSubRegion.innerHTML = "<span class='font-semibold font-geologica'>Sub Region:</span> " + subRegion;
        
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
        previewDetails1.classList.add('font-geologica','text-[1.5rem]','flex','flex-col','gap-y-4');

        const previewDetails2 = document.getElementById('preview-details-2')
        previewDetails2.appendChild(previewTld);
        previewDetails2.appendChild(previewCurrency);
        previewDetails2.appendChild(previewLang);
        previewDetails2.classList.add('font-geologica','text-[1.5rem]','flex','flex-col','gap-y-4')




        console.log(countryFlag);
        console.log(countryName);
        console.log(nativeName);
        console.log(countryPopulation);
        console.log(countryRegion);
        console.log(subRegion);
        console.log(capital);
        console.log(countryTld);
        console.log(countryCurrency);
        console.log(language);
    }

    previewUpdater()
    
});