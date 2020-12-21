let initialState= {
	loading: false,
	productTitle: "",
	totalCount: 0,
	products: [],
	sortOptions: [],
	filterOptions: [],
	selectedFilterMain: "category",
	selectedSubFilters: []
};

export default (state=initialState, action) => {
	switch(action.type) {
		case "LOADING_STATUS":
			return {
				...state,
				loading: true
			}
		case "PRODUCT_DATA":
			return {
				...state,
				productTitle: action.payload.data.title,
				totalCount: action.payload.data.totalCount,
				products: action.payload.data.products,
				sortOptions: action.payload.data.sorts,
				filterOptions: action.payload.data.aggregations,
				loading: false
			}
		case "SELECT_MAIN_FILTER":
			return {
				...state,
				selectedFilterMain: action.payload
			}
		case "SELECT_SUB_FILTER":
			let sf = [...state.selectedSubFilters];
			if(sf.indexOf(action.payload) !== -1){
				sf.splice(sf.indexOf(action.payload), 1);
			}else{
				sf.push(action.payload);
			}
			return {
				...state,
				selectedSubFilters: sf
			}
		case "CLEAR_FILTERS":
			return {
				...state,
				selectedFilterMain: "category",
				selectedSubFilters: []
			}
		default:
			return state;
	}
}