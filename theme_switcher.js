 //Theme Switcher EventListeners:
// Function to save the current theme in localStorage
export const saveTheme = (darkModeEnabled) => {
    localStorage.setItem('darkModeEnabled', darkModeEnabled);
}
// Function to load the theme from localStorage
export const loadTheme = () => {
    const darkModeEnabled = localStorage.getItem('darkModeEnabled') === 'true';
    toggleTheme(darkModeEnabled);
}

// Function to toggle the theme
export const toggleTheme = (darkModeEnabled) => {
    
    const lightMode = document.querySelector("#light-mode");
    const darkMode = document.querySelector("#dark-mode");
    const header = document.querySelector("header");
    const body = document.querySelector("body");
    const searchContainer = document.querySelector("#search-container");
    const searchField = document.querySelector("#search");
    const filterParent = document.querySelector("#filter-container");
    const filterHandler = document.querySelector('#filter-handler');
    const regionContainer = document.querySelector('#filter-items');
    const paginationSection = document.querySelector('#pagination');
    // const card = countryCard.querySelector('.card')
    // console.log(card)
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
        /* card.style.backgroundColor = "#2a3643";
        card.style.color = "#fff"; */
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

