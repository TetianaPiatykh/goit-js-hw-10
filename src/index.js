import './css/styles.css';
import fetchCountries from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';


const DEBOUNCE_DELAY = 300;

const input = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

input.addEventListener('input', debounce(fetchCountriesSearch, DEBOUNCE_DELAY));

function fetchCountriesSearch(e) { 
    e.preventDefault();
    const inputText = e.target.value.trim();
    // console.log(inputText);
    

    if (inputText !== '') {
        fetchCountries(inputText).then(country => {
           if (country.length > 10) {
              Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            }
            else if (country.length >= 2 && country.length <= 10) {
                // console.log(renderCountryList());
               countryInfo.innerHTML = '';
                renderCountryList(country);
            }
           else if (country.length === 1) {

                countryList.innerHTML = '';
                renderCountryInfo(country);
           }
           else if (Number(response.status) === 404) {
               countryInfo.innerHTML = '';
               Notiflix.Notify.failure('Oops, there is no country with that name');
            }
       }).catch(error => console.log(error))
    }

};

function renderCountryList(country) {
    countryList.innerHTML = '';
    const countryListMarkup = country.map(({ name, flags }) => {
    return `<li class="country-item"><img src="${flags.svg}" alt="" width = 30px height = 15px><h2 class="country-name">${name.official}</h1>
</li>`}).join('')

    countryList.insertAdjacentHTML("afterbegin", countryListMarkup);
};
// console.log(renderCountryList());
function renderCountryInfo(country) {
    countryInfo.innerHTML = '';
    const countryInfoMarkup = country.map(({ name, capital, population, flags, languages }) => {
      return `<h1 class="country-info"><img src="${flags.svg}" alt="" width = 60px height = 30px>${name.official}</h1>
        <p class="country-info">Capital: ${capital}</p>
        <p class="country-infop">Population: ${(population)}</p>
        <p class="country-info">Languages: ${Object.values(languages)}</p>`}).join('')

    countryInfo.insertAdjacentHTML("afterbegin", countryInfoMarkup);
};

