import React, { useState, useReducer } from "react";
import useInputState from "../Hooks/useInputState";
import laneReducer from "../Reducers/lane.reducer";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Lane from "./Lane";
import styles from "../Styles/BoardStyles";

const defaultLanes = [{ id: 1, title: "Test lane" }];

const Board = props => {
	const { classes } = props;
	const [isTyping, toggleInput] = useState(false);
	const [lanes, dispatch] = useReducer(laneReducer, defaultLanes);
	const [value, handleChange, reset] = useInputState("");
	return (
		<div className={classes.board}>
			<h2>Board title</h2>
			<div className={classes.lanes}>
				{lanes.map(lane => (
					<Lane title={lane.title} id={lane.id} key={lane.id} />
				))}
				{isTyping ? (
					<TextField
						onChange={handleChange}
						value={value}
						className={classes.newLaneInput}
						onKeyDown={e => {
							if (e.key === "Enter") {
								toggleInput();
								dispatch({ type: "add", title: value });
								reset();
							}
						}}
					/>
				) : (
					<Button
						variant="contained"
						onClick={toggleInput}
						className={classes.toggleInputBtn}
					>
						Add new lane
					</Button>
				)}
			</div>
		</div>
	);
};

export default withStyles(styles)(Board);
