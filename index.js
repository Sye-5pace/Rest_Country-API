import { fetchData } from './data.js'
import { searchQuery,filterQuery} from './query_helper.js'
import { loadTheme,toggleTheme } from './theme_switcher.js';


//DOMContentLoaded for the main page
document.addEventListener("DOMContentLoaded",()=>{
    fetchData();
    
    // Load the theme when the page is loaded
    loadTheme();

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


    const searchInput = document.getElementById("search");
    searchInput.addEventListener("input",searchQuery);
    
    //FilterQuery EventListener
    const filterItems = document.querySelectorAll(".filter-item");
    filterItems.forEach((filterItem)=>{
        filterItem.addEventListener("click",filterQuery)
    });   
    
    
});