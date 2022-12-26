import axios from "axios"

const { REACT_APP_LOCATIONIQ_API_KEY, REACT_APP_LOCATIONIQ_URL, REACT_APP_BACKEND_URL } = process.env

const suggestionsURL = REACT_APP_LOCATIONIQ_URL
const searchHistoryURL = REACT_APP_BACKEND_URL

const suggestionsInstance = axios.create({
    baseURL: suggestionsURL,
    timeout: 30000,
    params: {
        key: REACT_APP_LOCATIONIQ_API_KEY,
        dedupe: 1,
        tag: "place:city"
    }
})
const searchHistoryInstance = axios.create({
    baseURL: searchHistoryURL,
    timeout: 30000
})

export const getSuggestions = async (queryParam) => {

    try {
        const response = await suggestionsInstance.get("/autocomplete", {
            params: {
                q: queryParam
            }
        })
        return response.data;
    } catch (error) {
        alert("Relax! Type it slowly.")
        console.log(error)
    }
}

export const saveSearchHistory = async (data) => {
    try {
        const response = await searchHistoryInstance.post("/saveAll", data)
        return response.data;
    } catch (error) {
        alert("Search could not be saved to history")
        console.log(error)
    }
}

export const getSearchHistory = async () => {
    try {
        const { data } = await searchHistoryInstance.get("/getAll")
        return data;
    } catch (error) {
        alert("Search history could not be fetched")
        console.log(error)
    }
}