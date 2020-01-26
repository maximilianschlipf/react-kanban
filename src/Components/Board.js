import React, { useState, useContext } from "react";
import Lane from "./Lane";
import useInputState from "../Hooks/useInputState";
import { DispatchContext, LanesContext } from "../Context/lanes.context";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import styles from "../Styles/BoardStyles";

const Board = props => {
	const { classes } = props;
	const [isTyping, toggleInput] = useState(false);
	const [open, setOpen] = useState(false);
	const [value, handleChange, reset] = useInputState("");
	const lanes = useContext(LanesContext);
	const dispatch = useContext(DispatchContext);
	const openAlert = () => {
		setOpen(true);
	};

	const closeAlert = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};
	return (
		<div className={classes.board}>
			<h2>Board title</h2>
			<div className={classes.lanes}>
				{lanes.map(lane => (
					<Lane title={lane.title} id={lane.id} key={lane.id} />
				))}
				{isTyping ? (
					<TextField
						onChange={handleChange}
						value={value}
						className={classes.newLaneInput}
						onKeyDown={e => {
							if (e.key === "Enter" && e.value !== undefined) {
								console.log(e.value);
								toggleInput();
								dispatch({ type: "add", title: value });
								reset();
							} else {
								openAlert();
							}
						}}
						autoFocus={true}
					/>
				) : (
					<Button
						variant="contained"
						onClick={toggleInput}
						className={classes.toggleInputBtn}
					>
						Add new lane
					</Button>
				)}
				<Snackbar
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "left"
					}}
					open={open}
					autoHideDuration={6000}
					onClose={closeAlert}
				>
					<SnackbarContent
						className={classes.alertOverride}
						message="Please type in a title in order to add a new lane!"
						action={
							<React.Fragment>
								<IconButton
									size="small"
									aria-label="close"
									color="inherit"
									onClick={closeAlert}
								>
									<CloseIcon fontSize="small" />
								</IconButton>
							</React.Fragment>
						}
					/>
				</Snackbar>
			</div>
		</div>
	);
};

export default withStyles(styles)(Board);
