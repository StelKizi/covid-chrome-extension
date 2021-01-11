import axios from 'axios';
const api = 'https://covid19.mathdro.id/api/countries';
const errors = document.querySelector('.errors');
const loading = document.querySelector('.loading');
const cases = document.querySelector('.cases');
const recovered = document.querySelector('.recovered');
const deaths = document.querySelector('.deaths');
const results = document.querySelector('.output-container');
const search = document.querySelector('.country-search');

const countryData = document.querySelector('.country-data');
const country = document.querySelector('.country-input');

const getCountry = async (countryName) => {
	loading.style.display = 'block';
	try {
		const res = await axios.get(`${api}/${countryName}`);
		loading.style.display = 'none';
		cases.textContent = res.data.confirmed.value;
		recovered.textContent = res.data.recovered.value;
		deaths.textContent = res.data.deaths.value;
		results.style.display = 'block';
		errors.textContent = '';
	} catch (error) {
		errors.textContent = 'No available data.';
		loading.style.display = 'none';
		results.style.display = 'none';
	}
};

const handleSubmit = (e) => {
	e.preventDefault();
	getCountry(country.value);
	console.log(country.value);
};

countryData.addEventListener('submit', (e) => handleSubmit(e));
search.addEventListener('click', (e) => handleSubmit(e));
