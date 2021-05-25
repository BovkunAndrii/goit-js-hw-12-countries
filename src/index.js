import './sass/main.scss';

import refs from './js/refs';
import API from './js/fetchCountries';
import previewCountry from './templates/preview-country.hbs'
import countryCards from './templates/country-cards.hbs'

import debounce from 'lodash.debounce';
import { error, notice } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const searchInput = e => {
    const searchQuery = e.target.value;
    refs.countriesMrkp.innerHTML = '';

    if (searchQuery.length < 1)
    return;

    API.fetchCountries(searchQuery)
    .then(dataShow)
    .catch(noticeInfo);
};

const dataShow = countries => {
    if (countries.length > 10) {
        error({
            text: 'Too many matches found. Please enter a more specific query!',
            delay: 5000,
        });
    };
    if (countries.length > 1 && countries.length < 10) {
        refs.countriesMrkp.innerHTML = previewCountry(countries);
    };
    if (countries.length === 1) {
        refs.countriesMrkp.innerHTML = countryCards(...countries);
    };
};
const noticeInfo = () => {
        notice({
            text: 'Invalid entered value.',
            delay: 2500,
        });
}

refs.search.addEventListener('input', debounce(searchInput, 500));