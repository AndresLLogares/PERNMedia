import axios from 'axios';
import { Key } from '../Key/Key';
import setAuthToken from '../utils/SethAuthToken.js';

export const SET_CURRENT_USER = 'SETCURRENTUSER';
export const GET_NEWS = 'GETNEWS';
export const GET_USER = 'GETUSER';
export const GET_COUNTRIES = 'GETCOUNTRIES';
export const GET_CITIES = 'GETCITIES';
export const GET_POSTS = 'GETPOSTS';
export const GET_POSTS_BY_USER = 'GETPOSTSBYUSER';
export const GET_ALL_USERS = 'GETALLUSERS';
export const GET_USER_UUID = 'GETUSERUUID';
export const GET_FRIENDS = 'GETFRIENDS';
export const GET_POST_BYUUID = 'GETPOSTBYUUID';

let URL = 'https://pinkbio.herokuapp.com/';

export const GETPOSTBYUUID = (info) => {
    return async (dispatch) => {
        return await axios.post(URL + 'getpostbyuuid', {
            useruuid: info
        })
            .then((response) => response.data)
            .then(data => {
                dispatch({ type: GET_POST_BYUUID, payload: data })
            })
    }
}

export const GETFRIENDS = (info) => {
    return async (dispatch) => {
        return await axios.post(URL + 'getfriends', {
            user: info
        })
            .then((response) => response.data)
            .then(data => {
                dispatch({ type: GET_FRIENDS, payload: data })
            })
    }
}


export const GETUSERUUID = (info) => {
    return async (dispatch) => {
        return await axios.post(URL + 'getuserbyuuid', {
            uuid: info
        })
            .then((response) => response.data)
            .then(data => {
                dispatch({ type: GET_USER_UUID, payload: data })
            })
    }
}

export const GETALLUSERS = () => {
    return async (dispatch) => {
        return await axios.get(URL + 'getallusers')
            .then((response) => response.data)
            .then(data => {
                dispatch({ type: GET_ALL_USERS, payload: data });
            })
    }
}

export const GETPOSTBYUSER = (info) => {
    return async (dispatch) => {
        return await axios.post(URL + 'getpostbyuser', {
            email: info
        })
            .then((response) => response.data)
            .then(data => {
                dispatch({ type: GET_POSTS_BY_USER, payload: data });
            })
    }
}

export const GETPOSTS = () => {
    return async (dispatch) => {
        return await axios.get(URL + 'getposts')
            .then((response) => response.data)
            .then(data => {
                dispatch({ type: GET_POSTS, payload: data });
            })
    }
}

export const GETCOUNTRIES = (info) => {
    return async (dispatch) => {
        return await axios.get(`https://restcountries.eu/rest/v2/region/${info}`)
            .then((response) => response.data)
            .then(data => {
                dispatch({ type: GET_COUNTRIES, payload: data })
            })
    }
}

export const GETCITIES = (info) => {
    return async (dispatch) => {
        return await axios.post('https://countriesnow.space/api/v0.1/countries/flag/images', {
            country: info
        })
            .then((response) => response.data)
            .then(data => {
                dispatch({ type: GET_CITIES, payload: data })
            })
    }
}

export const GETUSER = (info) => {
    return async (dispatch) => {
        return await axios.post(URL + 'getuser', {
            email: info
        })
            .then((response) => response.data)
            .then(data => {
                dispatch({ type: GET_USER, payload: data })
            })
    }
}

export const GETNEWS = () => {
    return async (dispatch) => {
        return await axios.get('https://saurav.tech/NewsAPI/everything/cnn.json')
            .then((response) => response.data)
            .then(data => {
                dispatch({ type: GET_NEWS, payload: data })
            })
    }
}

export const SETCURRENTUSER = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

export const LOGOUTUSER = () => {
    return async (dispatch) => {
        await localStorage.removeItem("jwtToken");
        await localStorage.removeItem("UserName");
        await localStorage.removeItem('Email');
        setAuthToken(false);
        dispatch(SETCURRENTUSER({}));
    };
};