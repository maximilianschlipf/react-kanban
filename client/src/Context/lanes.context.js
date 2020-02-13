import React, { createContext, useReducer, useEffect } from "react";
import laneReducer from "../Reducers/lane.reducer";
import axios from "axios";

const defaultLanes = [
	{
		id: "1",
		title: "Open",
		tasks: [
			{
				id: "1",
				title: "Test task",
				status: "Open",
				description: "Test description",
				priority: "High"
			},
			{
				id: "4",
				title: "Test task 4",
				status: "Open",
				description: "Test description",
				priority: "Normal"
			}
		]
	},
	{
		id: "2",
		title: "In Progress",
		tasks: [
			{
				id: "2",
				title: "Test task 2",
				status: "In Progress",
				description: "Test description",
				priority: "Normal"
			},
			{
				id: "3",
				title: "Test task 3",
				status: "In Progress",
				description: "Test description",
				priority: "Normal"
			}
		]
	}
];

export const DispatchContext = createContext();
export const LanesContext = createContext();

export function LanesProvider(props) {
	const getLanes = () => {
		axios
			.get("/api")
			.then(response => {
				console.log("Data has been retrieved!");
				const data = response.data;
				return data;
			})
			.catch(() => {
				alert("Error retrieving data!");
			});
	};

	const [lanes, dispatch] = useReducer(laneReducer, defaultLanes);

	return (
		<LanesContext.Provider value={lanes}>
			<DispatchContext.Provider value={dispatch}>
				{props.children}
			</DispatchContext.Provider>
		</LanesContext.Provider>
	);
}
