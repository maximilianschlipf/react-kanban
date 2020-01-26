import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Task from "./Task";
import styles from "../Styles/LaneStyles";

const Lane = props => {
	const { classes, title, id } = props;
	return (
		<div className={classes.lane}>
			<div className={classes.laneHeader}>{title}</div>
			<div className={classes.taskWrapper}>
				<Task />
			</div>
		</div>
	);
};

export default withStyles(styles)(Lane);
