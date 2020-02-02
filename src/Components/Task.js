import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import styles from "../Styles/TaskStyles";

const Task = props => {
	const { classes, title, id } = props;
	return (
		<Link to={`/board/${id}`}>
			<div className={classes.task} ref={props.innerRef}>
				{title}
			</div>
		</Link>
	);
};

export default withStyles(styles)(Task);
