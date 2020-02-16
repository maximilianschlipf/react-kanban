import React, { useContext, useEffect, useState } from "react";
import Board from "./Components/Board";
import Navbar from "./Components/Navbar";
import TaskDetail from "./Components/TaskDetail";
import { LanesContext, DispatchContext } from "./Context/lanes.context";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";

function App() {
	const lanes = useContext(LanesContext);
	const dispatch = useContext(DispatchContext);
	const [isLoading, setIsLoading] = useState(false);

	const getTask = props => {
		const { taskId } = props.match.params;
		const lane = lanes.find(lane =>
			lane.tasks.some(task => task.id === taskId)
		);
		const task = lane.tasks.find(task => task.id === taskId);
		return <TaskDetail {...task} />;
	};

	const getLanes = () => {
		setIsLoading(true);
		axios
			.get("/api")
			.then(response => {
				const data = response.data;
				console.log("Data has been retrieved!", data);
				dispatch({ type: "updateWithFetchedData", data: data });
				setIsLoading(false);
			})
			.catch(() => {
				alert("Error retrieving data!");
			});
	};

	// Runs once
	useEffect(() => {
		getLanes();
	}, []);

	return (
		<>
			<BrowserRouter>
				<Navbar />
				{isLoading ? (
					<h2>Loading...</h2>
				) : (
					<Switch>
						<Route exact path="/board" render={() => <Board />} />
						<Route
							exact
							path="/board/:taskId"
							render={props => getTask(props)}
						/>
						<Redirect to="/board" />
					</Switch>
				)}
			</BrowserRouter>
		</>
	);
}

export default App;
