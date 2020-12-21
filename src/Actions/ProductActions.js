export const loadingStatusAction = (payload) => {
	return {
		type: "LOADING_STATUS",
		payload
	}
}

export const getProductData = (payload) => {
	let url = "https://staging.healthandglow.com/api/catalog/product/v6/search/999?app=web&version=3.0.2&tag=loreal-paris&page=0:20&";
	if(typeof payload != "undefined" && payload){
		url = url+"&"+payload;
	}
	return(dispatch) => {
		dispatch(loadingStatusAction(true));
		fetch(url)
      		.then((response) => response.json())
      		.then((data) => {
        		dispatch({
        			type: "PRODUCT_DATA",
        			payload: data
        		})
      	});   
	}
}

export const selectMainFilterAction = (payload) => {
	return {
		type: "SELECT_MAIN_FILTER",
		payload
	}
}

export const selectSubFilterAction = (payload) => {
	return {
		type: "SELECT_SUB_FILTER",
		payload
	}
}

export const clearFiltersAction = () => {
	return {
		type: "CLEAR_FILTERS"
	}
}