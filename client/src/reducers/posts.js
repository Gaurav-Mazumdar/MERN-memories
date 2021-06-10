import { FETCH_ALL, FETCH_SINGLE, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE, START_LOADING, END_LOADING} from '../constants/actionTypes';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages
      }
    case FETCH_SINGLE:
      return {...state, post: action.payload.post}
    case FETCH_BY_SEARCH:
      return{...state, posts: action.payload} 
    case CREATE:
      return {...state, posts: [...state.posts, action.payload ]};
    case UPDATE:
      return {...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))};
    case LIKE:
      return {...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))};
    case DELETE:
      return {...state, posts: state.posts.filter((post) => post._id !== action.payload)};
    case START_LOADING:
      return {...state, isLoading: true}
    case END_LOADING:
      return {...state, isLoading: false}
    default:
      return state;
  }
};
