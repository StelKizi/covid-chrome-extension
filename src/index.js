import axios from 'axios';
const api = 'https://covid19.mathdro.id/api/countries';
const errors = document.querySelector('.errors');
const loading = document.querySelector('.loading');
const cases = document.querySelector('.cases');
const recovered = document.querySelector('.recovered');
const deaths = document.querySelector('.deaths');
const results = document.querySelector('.result');

const countryData = document.querySelector('.country-data');
const country = document.querySelector('.country-input');

const getCountry = async (countryName) => {
	loading.style.display = 'block';
	try {
		const res = await axios.get(`${api}/${countryName}`);
		cases.textContent = res.data.confirmed.value;
		recovered.textContent = res.data.confirmed.value;
		deaths.textContent = res.data.confirmed.value;
		results.style.display = 'block';
	} catch (error) {
		loading.display = 'none';
		results.display = 'none';
		errors.textContent = 'No available data.';
	}
};

const handleSubmit = (e) => {
	e.preventDefault();
	getCountry(country.value);
	console.log(country.value);
};

countryData.addEventListener('submit', (e) => handleSubmit(e));
