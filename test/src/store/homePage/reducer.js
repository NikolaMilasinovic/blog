import constants from "./actionTypes";

const initState = {
	blogs:{},
	error: "",
	loader:false
}

export default (state=initState, action) => {
	const {type, payload} = action;
	switch(type){
		case constants.FETCH_BLOGS:
			return {
				...state,
				loader:true
			}
		case constants.FETCH_BLOGS_SUCCESS:
			return {
				...state,
				loader:false
			}
		case constants.FETCH_BLOGS_FAIL:
			return {
				...state,
				loader:false
			}
		default:
			return state;
	}
}