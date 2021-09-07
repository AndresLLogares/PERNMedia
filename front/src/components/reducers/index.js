import {
  GET_NEWS,
  GET_USER,
  GET_COUNTRIES,
  GET_CITIES,
  GET_POSTS,
  GET_POSTS_BY_USER,
  GET_ALL_USERS,
  GET_USER_UUID,
  GET_FRIENDS,
  GET_POST_BYUUID,
  GET_FRIENDS_BYUUID,
} from "../actions/index";

const initialState = {
  news: [],
  user: [],
  countries: [],
  cities: [],
  posts: [],
  postsuser: [],
  allusers: [],
  userUUID: [],
  friends: [],
  postuuid: [],
  friendsuuid: [],
};

const reducers = (state = initialState, action) => {
  if (action.type === GET_NEWS) {
    return {
      ...state,
      news: action.payload,
    };
  }
  if (action.type === GET_USER) {
    return {
      ...state,
      user: action.payload,
    };
  }
  if (action.type === GET_COUNTRIES) {
    return {
      ...state,
      countries: action.payload,
    };
  }
  if (action.type === GET_CITIES) {
    return {
      ...state,
      cities: action.payload,
    };
  }
  if (action.type === GET_POSTS) {
    return {
      ...state,
      posts: action.payload,
    };
  }
  if (action.type === GET_POSTS_BY_USER) {
    return {
      ...state,
      postuser: action.payload,
    };
  }
  if (action.type === GET_ALL_USERS) {
    return {
      ...state,
      allusers: action.payload,
    };
  }
  if (action.type === GET_USER_UUID) {
    return {
      ...state,
      userUUID: action.payload,
    };
  }
  if (action.type === GET_FRIENDS) {
    return {
      ...state,
      friends: action.payload,
    };
  }
  if (action.type === GET_POST_BYUUID) {
    return {
      ...state,
      postuuid: action.payload,
    };
  }
  if (action.type === GET_FRIENDS_BYUUID) {
    return {
      ...state,
      friendsuuid: action.payload,
    };
  }
  return state;
};

export default reducers;
