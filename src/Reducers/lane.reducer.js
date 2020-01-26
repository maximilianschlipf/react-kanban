import uuid from "uuid/v4";

const reducer = (state, action) => {
	switch (action.type) {
		case "add":
			return [...state, { id: uuid(), title: action.title }];
		default:
			return state;
	}
};
export default reducer;
