import React from "react";
import Board from "./Components/Board";
import Navbar from "./Components/Navbar";
import { LanesProvider } from "./Context/lanes.context";

function App() {
	return (
		<>
			<Navbar />
			<LanesProvider>
				<Board />
			</LanesProvider>
		</>
	);
}

export default App;
