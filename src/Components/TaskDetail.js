import React, { useContext, useState } from "react";
import useInputState from "../Hooks/useInputState";
import { DispatchContext, LanesContext } from "../Context/lanes.context";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import styles from "../Styles/TaskDetailStyles";

const TaskDetail = props => {
	const { id, title, status, description, priority, classes } = props;
	const dispatch = useContext(DispatchContext);
	const lanes = useContext(LanesContext);
	const [isEditingTitle, toggleIsEditingTitle] = useState(false);
	const [statusValue, handleStatusChange] = useInputState(status);
	const [priorityValue, handlePriorityChange] = useInputState(priority);
	const [titleValue, handleTitleChange] = useInputState(title);
	const [descriptionValue, handleDescriptionChange] = useInputState(
		description
	);

	const handleSave = () => {
		dispatch({
			type: "updateTask",
			taskId: id,
			taskTitle: titleValue,
			taskStatus: statusValue,
			taskPriority: priorityValue,
			taskDescription: descriptionValue
		});
		toggleIsEditingTitle(false);
	};

	return (
		<div className={classes.taskDetail}>
			{isEditingTitle ? (
				<Input
					type="text"
					value={titleValue}
					onChange={handleTitleChange}
					autoFocus
					className={classes.taskTitleInput}
				/>
			) : (
				<Button
					onClick={toggleIsEditingTitle}
					className={classes.taskDetailTitleBtn}
				>
					<h2 className={classes.taskDetailTitle}>{titleValue}</h2>
				</Button>
			)}
			<br />
			<p className={classes.taskDetailStatusLabel}>Status:</p>
			<Select
				value={statusValue}
				onChange={e => {
					handleStatusChange(e);
				}}
				diplay="inline"
				className={classes.taskSelectInput}
			>
				{lanes.map(lane => (
					<MenuItem
						value={`${lane.title}`}
						key={lane.id}
						className={classes.taskMenuItem}
					>
						{lane.title}
					</MenuItem>
				))}
			</Select>
			<br />
			<p className={classes.taskDetailPriorityLabel}>Priority:</p>
			<Select
				value={priorityValue}
				onChange={e => {
					handlePriorityChange(e);
				}}
				diplay="inline"
				className={classes.taskSelectInput}
			>
				<MenuItem value={"High"} className={classes.taskMenuItem}>
					High
				</MenuItem>
				<MenuItem value={"Normal"} className={classes.taskMenuItem}>
					Normal
				</MenuItem>
				<MenuItem value={"Low"} className={classes.taskMenuItem}>
					Low
				</MenuItem>
			</Select>
			<p className={classes.taskDetailDescriptionLabel}>Description:</p>
			<TextField
				value={descriptionValue}
				onChange={handleDescriptionChange}
				multiline
				rows="4"
				fullWidth
				InputProps={{
					className: classes.taskDetailDescriptionInput,
					disableUnderline: true
				}}
			/>
			<Button
				className={classes.saveBtn}
				variant="outlined"
				onClick={handleSave}
			>
				Save
			</Button>
		</div>
	);
};

export default withStyles(styles)(TaskDetail);
