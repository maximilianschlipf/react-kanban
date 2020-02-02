import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "../Styles/TaskDetailStyles";

const TaskDetail = props => {
	const { title, status, description, priority, classes } = props;
	return (
		<div className={classes.taskDetail}>
			<h2>{title}</h2>
			<p className={classes.taskDetailStatus}>Status: {status}</p>
			<p className={classes.taskDetailPriority}>Priority: {priority}</p>
			<p>
				Description:
				<br />
				{description}
			</p>
		</div>
	);
};

export default withStyles(styles)(TaskDetail);
