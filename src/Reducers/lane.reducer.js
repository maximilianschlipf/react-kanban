import uuid from "uuid/v4";

const reducer = (state, action) => {
	switch (action.type) {
		case "add":
			return [...state, { id: uuid(), title: action.title }];
		case "remove":
			return state.filter(lane => lane.id !== action.id);
		default:
			return state;
	}
};
export default reducer;
