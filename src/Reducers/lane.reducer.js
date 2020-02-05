import uuid from "uuid/v4";

const reducer = (state, action) => {
	switch (action.type) {
		case "add":
			return [...state, { id: uuid(), title: action.title, tasks: [] }];
		case "remove":
			return state.filter(lane => lane.id !== action.id);
		case "updateTaskOrder":
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
			const oldTasks = Array.from(startLane.tasks);

			const task = oldTasks[action.sourceIndex];

			oldTasks.splice(action.sourceIndex, 1);

			if (action.destinationDroppableId === action.sourceDroppableId) {
				oldTasks.splice(action.destinationIndex, 0, task);
			} else {
				task.status = finishLane.title;
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
		case "addTask":
			if (action.taskTitle === "" || action.taskTitle === undefined) {
				return state;
			} else {
				const firstLane = state.find(lane => lane.id === 1);
				const stateCopy = [...state];
				firstLane.tasks.push({
					id: uuid(),
					title: action.taskTitle,
					status: "Open",
					description: action.taskDescription,
					priority: action.priority
				});
				stateCopy[0] = firstLane;
				return [...stateCopy];
			}
		case "updateTask":
			const newLane = state.find(lane =>
				lane.tasks.some(task => task.id === action.taskId)
			);
			const index = state.findIndex(lane => lane.id === newLane.id);
			let updatedState = [...state];
			for (let i in newLane.tasks) {
				if (newLane.tasks[i].id === action.taskId) {
					newLane.tasks[i].title = action.taskTitle;
					newLane.tasks[i].status = action.taskStatus;
					newLane.tasks[i].priority = action.taskPriority;
					newLane.tasks[i].description = action.taskDescription;
					break;
				}
			}
			updatedState[index] = newLane;
			return updatedState;
		default:
			return state;
	}
};
export default reducer;
