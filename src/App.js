import React, { useContext } from "react";
import Board from "./Components/Board";
import Navbar from "./Components/Navbar";
import TaskDetail from "./Components/TaskDetail";
import { LanesContext } from "./Context/lanes.context";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
	const lanes = useContext(LanesContext);
	const getTask = props => {
		const { taskId } = props.match.params;
		const lane = lanes.find(lane =>
			lane.tasks.some(task => task.id === parseInt(taskId))
		);
		const task = lane.tasks.find(task => task.id === parseInt(taskId));
		return <TaskDetail {...task} />;
	};
	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Switch>
					<Route exact path="/" render={() => <Board />} />
					<Route exact path="/board" render={() => <Board />} />
					<Route exact path="/board/:taskId" render={props => getTask(props)} />
				</Switch>
			</BrowserRouter>
		</>
	);
}

export default App;
