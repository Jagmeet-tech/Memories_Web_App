import { FETCH_BY_SEARCH,FETCH_ALL,CREATE,UPDATE,DELETE, START_LOADING, END_LOADING, FETCH_POST } from "../constants/actionTypes";

const reducer = (state = {},action) => {
    switch (action.type) {
        case DELETE:
            return {...state,posts:state.posts.filter((post) => post._id != action.payload)};
        
        case UPDATE:   
            return{...state,posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)} //return new array with updated post.
        
        case FETCH_ALL:
            return {
                ...state,
                posts:action.payload.data,
                currentPage : action.payload.currentPage,
                numberOfPages : action.payload.numberOfPages
            };
            
        case FETCH_POST:
            return {...state,post: action.payload};    

        case FETCH_BY_SEARCH : 
            return {
                ...state,
                posts : action.payload
            };    
        case CREATE:{
            console.log("Reducers:  ",action.payload);
            return {...state,posts: [action.payload,...state.posts]}; 
        };

        case START_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case END_LOADING : 
            return {
                ...state,
                isLoading:false
            } ; 

        default:
            return state;
    }
}

export default reducer;