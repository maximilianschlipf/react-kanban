import React, { useContext, useState } from "react";
import CreateTaskForm from "./CreateTaskForm";
import { NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";

import styles from "../Styles/NavbarStyles";

const Navbar = props => {
	const { classes } = props;

	return (
		<>
			<AppBar className={classes.navbar} position="fixed">
				<NavLink
					exact
					to="/board"
					activeStyle={{ textDecoration: "none" }}
					className={classes.navLink}
				>
					<h1>Kanban Board</h1>
				</NavLink>
			</AppBar>
		</>
	);
};

export default withStyles(styles)(Navbar);
