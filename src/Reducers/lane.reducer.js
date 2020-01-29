import uuid from "uuid/v4";

const reducer = (state, action) => {
	switch (action.type) {
		case "add":
			return [...state, { id: uuid(), title: action.title, tasks: [] }];
		case "remove":
			return state.filter(lane => lane.id !== action.id);
		case "update":
			const newState = [...state];
			const startLane = state.find(
				lane => lane.id.toString() === action.sourceDroppableId
			);
			const startIndex = state.findIndex(
				lane => lane.id.toString() === action.sourceDroppableId
			);
			const finishIndex = state.findIndex(
				lane => lane.id.toString() === action.destinationDroppableId
			);

			const finishLane = state.find(
				lane => lane.id.toString() === action.destinationDroppableId
			);
			console.log(finishLane);
			const oldTasks = Array.from(startLane.tasks);
			const task = oldTasks[action.sourceIndex];
			oldTasks.splice(action.sourceIndex, 1);
			if (action.destinationDroppableId === action.sourceDroppableId) {
				oldTasks.splice(action.destinationIndex, 0, task);
			} else {
				let newTasks;
				if (finishLane.tasks !== undefined) {
					newTasks = Array.from(finishLane.tasks);
				} else {
					newTasks = [];
				}
				newTasks.splice(action.destinationIndex, 0, task);
				newState[finishIndex].tasks = newTasks;
			}

			newState[startIndex].tasks = oldTasks;

			return [...newState];
		default:
			return state;
	}
};
export default reducer;
