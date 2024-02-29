import dataCountry from "./country-data/countries.json"
import dataCity from "./country-data/states.json"


const useCountryApi = () => {
    // get all countries
    const getAllCountries = () => {
        return dataCountry
    }

    const getAllCountriesLikeOptions = () => {
        return dataCountry.map(country => ({
            label: country.name,
            value: country
        }))
    }

    return {
        getAllCountries,
        getAllCountriesLikeOptions,
    }
}

const useCityApi = () => {
    // get cities by country
    const getCitiesByCountry = (idCountry: number) => {
        return dataCity.filter((city) => {
            city.id_country === idCountry
        })
    }

    const getCitiesByCountryLikeOptions = (idCountry: number) => {
        const dataFilter = dataCity.filter((city) => city.id_country === idCountry)

        return dataFilter.map(city => ({
            label: city.name,
            value: city
        }))
    }

    return {
        getCitiesByCountry,
        getCitiesByCountryLikeOptions,
    }
}

export {
    useCountryApi,
    useCityApi
}