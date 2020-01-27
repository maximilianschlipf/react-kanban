import React, { createContext, useReducer } from "react";
import taskReducer from "../Reducers/task.reducer";

const defaultTasks = [
	{ id: 1, title: "Test task", laneId: 1 },
	{ id: 2, title: "Test task 2", laneId: 2 }
];

export const TasksDispatchContext = createContext();
export const TasksContext = createContext();

export function TasksProvider(props) {
	const [tasks, dispatch] = useReducer(taskReducer, defaultTasks);
	return (
		<TasksContext.Provider value={tasks}>
			<TasksDispatchContext.Provider value={dispatch}>
				{props.children}
			</TasksDispatchContext.Provider>
		</TasksContext.Provider>
	);
}
