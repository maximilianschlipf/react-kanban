import React, { useContext, useState } from "react";
import useInputState from "../Hooks/useInputState";
import { DispatchContext } from "../Context/lanes.context";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import styles from "../Styles/NavbarStyles";

const Navbar = props => {
	const { classes } = props;
	const dispatch = useContext(DispatchContext);
	const [open, setOpen] = useState(false);
	const [value, handleChange, reset] = useInputState("");

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleCreate = () => {
		if (value !== undefined || value !== "") {
			dispatch({ type: "addTask", taskTitle: value });
		}
		setOpen(false);
		reset();
	};

	const handleCancel = () => {
		setOpen(false);
		reset();
	};
	return (
		<>
			<AppBar className={classes.navbar} position="fixed">
				<h1>Kanban Board</h1>
				<button
					className={classes.createTaskNavbarBtn}
					onClick={handleClickOpen}
				>
					Create task
				</button>
			</AppBar>
			<Dialog
				open={open}
				onClose={handleCancel}
				aria-labelledby="form-dialog-title"
				className={classes.dialogOverride}
				maxWidth="lg"
			>
				<h3 className={classes.createTaskTitle}>Create task</h3>
				<DialogContent className={classes.dialogOverride}>
					<p className={classes.createTaskText}>
						Please give your task a title
					</p>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Title"
						type="text"
						fullWidth
						value={value}
						onChange={handleChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleCancel}
						className={classes.createTaskFormBtn}
						color="primary"
					>
						Cancel
					</Button>
					<Button
						onClick={handleCreate}
						className={classes.createTaskFormBtn}
						color="primary"
					>
						Create task
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default withStyles(styles)(Navbar);
