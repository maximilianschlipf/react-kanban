import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "../Styles/TaskStyles";

const Task = props => {
	const { classes, title } = props;
	return (
		<div className={classes.task} ref={props.innerRef}>
			{title}
		</div>
	);
};

export default withStyles(styles)(Task);
