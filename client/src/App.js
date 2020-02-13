import React, { useContext, useEffect } from "react";
import Board from "./Components/Board";
import Navbar from "./Components/Navbar";
import TaskDetail from "./Components/TaskDetail";
import { LanesContext } from "./Context/lanes.context";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";

function App() {
	const lanes = useContext(LanesContext);
	const getTask = props => {
		const { taskId } = props.match.params;
		const lane = lanes.find(lane =>
			lane.tasks.some(task => task.id === taskId)
		);
		const task = lane.tasks.find(task => task.id === taskId);
		return <TaskDetail {...task} />;
	};

	const getLanes = () => {
		axios
			.get("/api")
			.then(response => {
				console.log("Data has been retrieved!");
				const data = response.data;
				console.log(response.data);
				return response.data.lanes;
			})
			.catch(() => {
				alert("Error retrieving data!");
			});
	};

	// useEffect(() => {
	// 	getLanes();
	// }, []);

	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Switch>
					<Route exact path="/board" render={() => <Board />} />
					<Route exact path="/board/:taskId" render={props => getTask(props)} />
					<Redirect to="/board" />
				</Switch>
			</BrowserRouter>
		</>
	);
}

export default App;
