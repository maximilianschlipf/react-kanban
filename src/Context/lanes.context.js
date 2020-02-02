import React, { createContext, useReducer } from "react";
import laneReducer from "../Reducers/lane.reducer";

const defaultLanes = [
	{
		id: 1,
		title: "Open",
		tasks: [
			{ id: 1, title: "Test task", status: "Open" },
			{ id: 4, title: "Test task 4", status: "Open" },
			{ id: 5, title: "Test task 5", status: "Open" }
		]
	},
	{
		id: 2,
		title: "In Progress",
		tasks: [
			{ id: 2, title: "Test task 2", status: "In Progress" },
			{ id: 3, title: "Test task 3", status: "In Progress" }
		]
	}
];

export const DispatchContext = createContext();
export const LanesContext = createContext();

export function LanesProvider(props) {
	const [lanes, dispatch] = useReducer(laneReducer, defaultLanes);
	return (
		<LanesContext.Provider value={lanes}>
			<DispatchContext.Provider value={dispatch}>
				{props.children}
			</DispatchContext.Provider>
		</LanesContext.Provider>
	);
}
