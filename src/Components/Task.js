import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "../Styles/TaskStyles";

const Task = props => {
	const { classes } = props;
	return <div className={classes.task}>Test task</div>;
};

export default withStyles(styles)(Task);
