import uuid from "uuid/v4";

const reducer = (state, action) => {
	switch (action.type) {
		case "add":
			return [...state, { id: uuid(), title: action.title }];
		case "remove":
			return state.filter(lane => lane.id !== action.id);
		case "update":
			const lane = state.find(
				lane => lane.id === parseInt(action.sourceDroppableId)
			);
			const newTasks = Array.from(lane.tasks);
			const task = newTasks[action.sourceIndex];
			newTasks.splice(action.sourceIndex, 1);
			newTasks.splice(action.destinationIndex, 0, task);
			lane.tasks = newTasks;
			const newState = state.filter(
				lane => lane.id !== action.sourceDroppableId
			);
			return [...newState];
		default:
			return state;
	}
};
export default reducer;
