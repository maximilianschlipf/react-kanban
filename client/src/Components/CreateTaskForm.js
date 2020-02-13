import React, { useContext } from "react";
import useInputState from "../Hooks/useInputState";
import { DispatchContext } from "../Context/lanes.context";
import { withStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import styles from "../Styles/CreateTaskFormStyles";

const CreateTaskForm = props => {
	const { classes, handleClose, open } = props;
	const history = useHistory();
	const dispatch = useContext(DispatchContext);
	const [taskTitle, handleTaskTitleChange, resetTaskTitleInput] = useInputState(
		""
	);
	const [priority, handlePriorityChange, resetPriorityInput] = useInputState(
		"Normal"
	);
	const [
		taskDescription,
		handleTaskDescriptionChange,
		resetTaskDescriptionInput
	] = useInputState("");

	const handleCancel = () => {
		handleClose();
		resetTaskTitleInput();
	};

	const handleCreate = () => {
		if (taskTitle !== undefined && taskTitle !== "") {
			dispatch({
				type: "addTask",
				taskTitle: taskTitle,
				taskDescription: taskDescription,
				priority: priority
			});
		}
		handleClose();
		resetTaskTitleInput();
		resetPriorityInput();
		resetTaskDescriptionInput();
		history.push("/board");
	};

	return (
		<Dialog
			open={open}
			onClose={handleCancel}
			aria-labelledby="form-dialog-title"
			className={classes.dialogOverride}
			maxWidth="lg"
			fullWidth={true}
		>
			<h3 className={classes.createTaskTitle}>Create a new task</h3>
			<DialogContent className={classes.dialogOverride}>
				<p className={classes.formLabel}>Title: </p>
				<TextField
					autoFocus
					margin="dense"
					id="name"
					type="text"
					value={taskTitle}
					onChange={handleTaskTitleChange}
					required
					InputProps={{
						className: classes.taskTitleInput,
						disableUnderline: true
					}}
				/>
				<br />
				<p className={classes.formLabelPriority}>Priority:</p>
				<Select
					value={priority}
					onChange={handlePriorityChange}
					diplay="inline"
					className={classes.taskPriorityInput}
				>
					<MenuItem value={"High"} className={classes.taskPriorityMenuItem}>
						High
					</MenuItem>
					<MenuItem value={"Normal"} className={classes.taskPriorityMenuItem}>
						Normal
					</MenuItem>
					<MenuItem value={"Low"} className={classes.taskPriorityMenuItem}>
						Low
					</MenuItem>
				</Select>
				<p className={classes.formLabel}>Description:</p>
				<TextField
					margin="dense"
					id="name"
					type="text"
					multiline
					rows="4"
					fullWidth
					InputProps={{
						className: classes.taskDescriptionTextArea,
						disableUnderline: true
					}}
					value={taskDescription}
					onChange={handleTaskDescriptionChange}
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
	);
};

export default withStyles(styles)(CreateTaskForm);
