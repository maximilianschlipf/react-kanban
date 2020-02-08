import React, { useState, useContext } from "react";
import Lane from "./Lane";
import CreateTaskForm from "./CreateTaskForm";
import useInputState from "../Hooks/useInputState";
import { DispatchContext, LanesContext } from "../Context/lanes.context";
import { DragDropContext } from "react-beautiful-dnd";
import { withStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import styles from "../Styles/BoardStyles";

const Board = props => {
	const { classes } = props;
	const [isTypingBoardTitle, toggleInputBoardTitle] = useState(false);
	const [open, setOpen] = useState(false);
	const [locked, toggleLocked] = useState(false);
	const [message, setMessage] = useState("");
	const [createTaskFormOpen, setOpenCreateTaskForm] = useState(false);
	const [isTypingLaneTitle, toggleInputLaneTitle] = useState(false);
	const [laneTitle, handleLaneTitleChange, resetLaneTitleInput] = useInputState(
		""
	);
	const [
		boardTitle,
		handleBoardTitleChange,
		resetBoardTitleInput
	] = useInputState("Board Title");
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
			type: "updateTaskOrder",
			sourceDroppableId: source.droppableId,
			sourceIndex: source.index,
			destinationDroppableId: destination.droppableId,
			destinationIndex: destination.index
		});
	};

	const toggleEditBoardTitle = () => {
		toggleInputBoardTitle(!isTypingBoardTitle);
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
			resetBoardTitleInput();
		}
	};

	const handleKeyDownLaneTitle = e => {
		if (
			(e.key === "Enter" && laneTitle === "") ||
			(e.key === "Escape" && laneTitle === "")
		) {
			openAlert();
		}
		if (e.key === "Enter" && laneTitle !== "") {
			toggleInputLaneTitle();
		}
		if (e.key === "Escape" && laneTitle !== "") {
			toggleInputLaneTitle();
			dispatch({ type: "add", title: laneTitle });
			resetLaneTitleInput();
		}
	};

	const handleClickOpen = () => {
		toggleInputLaneTitle(true);
	};

	const handleCreate = () => {
		const exists = lanes.some(lane => lane.title === laneTitle);
		if (laneTitle !== "" && !exists) {
			toggleInputLaneTitle(false);
			dispatch({ type: "add", title: laneTitle });
			resetLaneTitleInput();
		} else if (exists) {
			setMessage("Title is already in use!");
			openAlert();
		} else {
			setMessage("Please type in a title!");
			openAlert();
		}
	};

	const handleCancelCreate = () => {
		toggleInputLaneTitle(false);
		resetLaneTitleInput();
	};

	const handleOpenCreateTaskForm = () => {
		setOpenCreateTaskForm(true);
	};

	const handleCloseCreateTaskForm = () => {
		setOpenCreateTaskForm(false);
	};

	return (
		<div className={classes.board}>
			<div className={classes.boardHeader}>
				{isTypingBoardTitle ? (
					<ClickAwayListener onClickAway={() => toggleInputBoardTitle(false)}>
						<TextField
							value={boardTitle}
							onChange={handleBoardTitleChange}
							autoFocus={true}
							onKeyDown={e => handleKeyDownBoardTitle(e)}
							className={classes.boardTitleInput}
						/>
					</ClickAwayListener>
				) : (
					<Button
						onClick={toggleEditBoardTitle}
						className={classes.toggleEditTitleBtn}
					>
						<h2 className={classes.boardTitle}>{boardTitle}</h2>
					</Button>
				)}
				<Tooltip title={<p className={classes.tooltip}>Create a new task</p>}>
					<Button
						aria-label="create task"
						className={classes.createTaskBtn}
						onClick={handleOpenCreateTaskForm}
						startIcon={<AddIcon />}
					>
						Task
					</Button>
				</Tooltip>
				<Tooltip title={<p className={classes.tooltip}>Lock lanes</p>}>
					<IconButton
						onClick={() => toggleLocked(!locked)}
						className={classes.lockBtn}
					>
						{locked ? <LockIcon /> : <LockOpenIcon />}
					</IconButton>
				</Tooltip>
			</div>
			<div className={classes.lanes}>
				<DragDropContext key={"1"} onDragEnd={onDragEnd}>
					{lanes.map(lane => (
						<Lane
							title={lane.title}
							id={lane.id}
							key={lane.id}
							tasks={lane.tasks}
							locked={locked}
						/>
					))}
					{locked ? null : (
						<Button
							variant="contained"
							onClick={handleClickOpen}
							className={classes.toggleNewLaneBtn}
						>
							Add new lane
						</Button>
					)}

					{/* This will show up when the user did not type in a title */}
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
							message={message}
							action={
								<>
									<IconButton
										size="small"
										aria-label="close"
										color="inherit"
										onClick={closeAlert}
									>
										<CloseIcon fontSize="large" />
									</IconButton>
								</>
							}
						/>
					</Snackbar>
					{/* Form for creating a new lane - could be its own component */}
					<Dialog
						open={isTypingLaneTitle}
						onClose={handleCancelCreate}
						aria-labelledby="form-dialog-title"
						className={classes.dialogOverride}
						maxWidth="lg"
					>
						<h3 className={classes.createLaneTitleHeading}>
							Create a new lane
						</h3>
						<DialogContent className={classes.dialogOverride}>
							<p className={classes.createLaneTitleText}>
								Please give your lane a title
							</p>
							<TextField
								onChange={handleLaneTitleChange}
								value={laneTitle}
								className={classes.newLaneInput}
								autoFocus={true}
								onKeyDown={e => handleKeyDownLaneTitle(e)}
							/>
						</DialogContent>
						<DialogActions>
							<Button
								onClick={handleCancelCreate}
								className={classes.createLaneFormBtn}
								color="primary"
							>
								Cancel
							</Button>
							<Button
								onClick={handleCreate}
								className={classes.createLaneFormBtn}
								color="primary"
							>
								Create lane
							</Button>
						</DialogActions>
					</Dialog>
				</DragDropContext>
				<CreateTaskForm
					handleClose={handleCloseCreateTaskForm}
					open={createTaskFormOpen}
				/>
			</div>
		</div>
	);
};

export default withStyles(styles)(Board);
