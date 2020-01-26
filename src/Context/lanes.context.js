import React, { createContext, useReducer } from "react";
import laneReducer from "../Reducers/lane.reducer";

const defaultLanes = [{ id: 1, title: "Test lane" }];

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
