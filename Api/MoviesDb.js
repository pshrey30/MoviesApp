import axios from "axios";
import { apiKey } from '../Consts/Index'

//endpoints
const apiBaseUrl = 'https://api.themoviedb.org/3'
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`

//dynamic endpoints
const movieDetailsEndpoint = id => `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`
const movieCreditsEndpoint = id => `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`
const similarMoviesEndpoint = id => `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`


const personDetailsEndpoint = id => `${apiBaseUrl}/person/${id}?api_key=${apiKey}`
const personMovieEndpoint = id => `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`

//Search endpoints
const searchMovieEndpoint = `${apiBaseUrl}/search/movie?api_key=${apiKey}`


export const image500 = path => path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = path => path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = path => path ? `https://image.tmdb.org/t/p/w185${path}` : null;

const apiCall = async (endpoint, params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {}
    }
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.log('error: ', error)
        return {}
    }
}

export const fetchTrendingMovies = () => {
    return apiCall(trendingMoviesEndpoint);
}
export const fetchUpcomingMovies = () => {
    return apiCall(upcomingMoviesEndpoint);
}
export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMoviesEndpoint);
}



export const fetchMovieDetails = id => {
    return apiCall(movieDetailsEndpoint(id))
}
export const fetchMovieCredits = id => {
    return apiCall(movieCreditsEndpoint(id))
}
export const fetchSimilarMovies = id => {
    return apiCall(similarMoviesEndpoint(id))
}


export const fetchPersonDetails = id => {
    return apiCall(personDetailsEndpoint(id))
}
export const fetchPersonMovie = id => {
    return apiCall(personMovieEndpoint(id))
}


export const searchMovie = params => {
    return apiCall(searchMovieEndpoint, params);
}