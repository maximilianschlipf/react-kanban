import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import styles from "../Styles/NavbarStyles";

const Navbar = props => {
	const { classes } = props;
	return (
		<AppBar className={classes.navbar} position="fixed">
			<h1>Kanban Board</h1>
		</AppBar>
	);
};

export default withStyles(styles)(Navbar);
