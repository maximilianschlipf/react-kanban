import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "../Styles/TaskDetailStyles";

const TaskDetail = props => {
	const { title, id, status, classes } = props;
	return (
		<div className={classes.taskDetail}>
			<h2>{title}</h2>
			<p>Status: {status}</p>
		</div>
	);
};

export default withStyles(styles)(TaskDetail);
