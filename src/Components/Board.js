import React, { useState, useContext } from "react";
import Lane from "./Lane";
import useInputState from "../Hooks/useInputState";
import { DispatchContext, LanesContext } from "../Context/lanes.context";
import { DragDropContext } from "react-beautiful-dnd";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import styles from "../Styles/BoardStyles";

const Board = props => {
	const { classes } = props;
	const [isTypingTitle, toggleInputTitle] = useState(false);
	const [open, setOpen] = useState(false);
	const [openDialog, setOpenDialog] = useState(false);
	const [value, handleChange, reset] = useInputState("");
	const [boardTitle, handleBoardTitleChange, resetBoardTitle] = useInputState(
		"Board Title"
	);
	const lanes = useContext(LanesContext);
	const dispatch = useContext(DispatchContext);

	const openAlert = () => {
		setOpen(true);
	};

	const closeAlert = reason => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	const onDragEnd = result => {
		const { destination, source } = result;

		if (!destination) {
			return;
		}

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		dispatch({
			type: "update",
			sourceDroppableId: source.droppableId,
			sourceIndex: source.index,
			destinationDroppableId: destination.droppableId,
			destinationIndex: destination.index
		});
	};

	const toggleEditBoardTitle = () => {
		toggleInputTitle(!isTypingTitle);
	};

	const handleKeyDownBoardTitle = e => {
		if (
			(e.key === "Enter" && boardTitle === "") ||
			(e.key === "Escape" && boardTitle === "")
		) {
			openAlert();
		}
		if (e.key === "Enter" && boardTitle !== "") {
			toggleEditBoardTitle();
		}
		if (e.key === "Escape" && boardTitle !== "") {
			toggleEditBoardTitle();
			resetBoardTitle();
		}
	};

	const handleClickOpen = () => {
		setOpenDialog(true);
	};

	const handleCreate = () => {
		if (value !== "") {
			setOpenDialog(false);
			dispatch({ type: "add", title: value });
			reset();
		} else {
			openAlert();
		}
	};

	const handleCancelCreate = () => {
		setOpenDialog(false);
		reset();
	};

	return (
		<div className={classes.board}>
			{isTypingTitle ? (
				<TextField
					value={boardTitle}
					onChange={handleBoardTitleChange}
					autoFocus={true}
					onKeyDown={e => handleKeyDownBoardTitle(e)}
				/>
			) : (
				<Button onClick={toggleEditBoardTitle}>
					<h2 className={classes.boardTitle}>{boardTitle}</h2>
				</Button>
			)}

			<div className={classes.lanes}>
				<DragDropContext key={"1"} onDragEnd={onDragEnd}>
					{lanes.map(lane => (
						<Lane
							title={lane.title}
							id={lane.id}
							key={lane.id}
							tasks={lane.tasks}
						/>
					))}

					<Button
						variant="contained"
						onClick={handleClickOpen}
						className={classes.toggleInputBtn}
					>
						Add new lane
					</Button>

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
							message="Please type in a title!"
							action={
								<React.Fragment>
									<IconButton
										size="small"
										aria-label="close"
										color="inherit"
										onClick={closeAlert}
									>
										<CloseIcon fontSize="large" />
									</IconButton>
								</React.Fragment>
							}
						/>
					</Snackbar>
					<Dialog
						open={openDialog}
						onClose={handleCancelCreate}
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
								onChange={handleChange}
								value={value}
								className={classes.newLaneInput}
								autoFocus={true}
							/>
						</DialogContent>
						<DialogActions>
							<Button
								onClick={handleCancelCreate}
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
				</DragDropContext>
			</div>
		</div>
	);
};

export default withStyles(styles)(Board);
