import uuid from "uuid/v4";
import axios from "axios";

const reducer = (state, action) => {
	switch (action.type) {
		case "add":
			axios({
				url: "http://localhost:8080/api/save",
				method: "POST",
				data: [...state, { id: uuid(), title: action.title, tasks: [] }]
			})
				.then(() => {
					console.log("Data has been sent to the server");
				})
				.catch(() => {
					console.log("Internal server error");
				});
			return [...state, { id: uuid(), title: action.title, tasks: [] }];
		case "remove":
			return state.filter(lane => lane.id !== action.id);
		case "updateWithFetchedData":
			return action.data;
		case "updateTaskOrder":
			const newState = [...state];

			const startLane = state.find(
				lane => lane.id === action.sourceDroppableId
			);
			const startIndex = state.findIndex(
				lane => lane.id === action.sourceDroppableId
			);
			const finishIndex = state.findIndex(
				lane => lane.id === action.destinationDroppableId
			);

			const finishLane = state.find(
				lane => lane.id === action.destinationDroppableId
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

			axios({
				url: "http://localhost:8080/api/put",
				method: "PUT",
				data: [...newState]
			})
				.then(() => {
					console.log("Updated data has been sent to the server");
				})
				.catch(() => {
					console.log("Internal server error (PUT)");
				});

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
			// gets called when changes in TaskDetail are being saved
			let newLane = [];
			let oldLane = state.find(lane =>
				lane.tasks.some(task => task.id === action.taskId)
			);
			let updatedState = [...state];
			const newTask = {
				id: action.taskId,
				title: action.taskTitle,
				status: action.taskStatus,
				priority: action.taskPriority,
				description: action.taskDescription
			};

			if (action.taskStatus !== oldLane.title) {
				// Status has changed
				newLane = state.find(lane => action.taskStatus === lane.title);

				const taskIndex = oldLane.tasks.findIndex(
					task => task.id === action.taskId
				);

				oldLane.tasks.splice(taskIndex, 1);

				const oldLaneIndex = state.findIndex(lane => lane.id === oldLane.id);

				updatedState[oldLaneIndex] = oldLane;

				newLane.tasks.push(newTask);
			} else {
				// Status has not changed
				newLane = state.find(lane =>
					lane.tasks.some(task => task.id === action.taskId)
				);
				for (let i in newLane.tasks) {
					if (newLane.tasks[i].id === action.taskId) {
						newLane.tasks[i] = newTask;
						break;
					}
				}
			}

			const index = state.findIndex(lane => lane.id === newLane.id);

			updatedState[index] = newLane;
			return updatedState;
		default:
			return state;
	}
};
export default reducer;
