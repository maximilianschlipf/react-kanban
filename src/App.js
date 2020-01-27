import React from "react";
import Board from "./Components/Board";
import Navbar from "./Components/Navbar";
import { LanesProvider } from "./Context/lanes.context";
import { TasksProvider } from "./Context/tasks.context";
import { Route, Switch } from "react-router-dom";

function App() {
	return (
		<>
			<Navbar>
				<Switch>
					<Route exact path="/" render={() => <Board />} />
					<Route exact path="/board" render={() => <Board />} />
				</Switch>
			</Navbar>
			<LanesProvider>
				<TasksProvider>
					<Board />
				</TasksProvider>
			</LanesProvider>
		</>
	);
}

export default App;
