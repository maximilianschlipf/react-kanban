import React, { useContext, useState } from "react";
import CreateTaskForm from "./CreateTaskForm";
import { NavLink, useHistory } from "react-router-dom";
import useInputState from "../Hooks/useInputState";
import { DispatchContext } from "../Context/lanes.context";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import styles from "../Styles/NavbarStyles";

const Navbar = props => {
	const { classes } = props;
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

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
				<button
					className={classes.createTaskNavbarBtn}
					onClick={handleClickOpen}
				>
					Create task
				</button>
			</AppBar>
			<CreateTaskForm handleClose={handleClose} open={open} />
		</>
	);
};

export default withStyles(styles)(Navbar);
