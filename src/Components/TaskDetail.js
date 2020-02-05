import React, { useContext, useState } from "react";
import useInputState from "../Hooks/useInputState";
import { DispatchContext } from "../Context/lanes.context";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Input from "@material-ui/core/Input";
import styles from "../Styles/TaskDetailStyles";

const TaskDetail = props => {
	const { id, title, status, description, priority, classes } = props;
	const dispatch = useContext(DispatchContext);
	const [isEditingTitle, toggleIsEditingTitle] = useState(false);
	const [statusValue, handleStatusChange, resetStatusInput] = useInputState(
		status
	);
	const [priorityValue, handlePriorityChange] = useInputState(priority);
	const [isEditingDescription, toggleIsEditingDescription] = useState(false);
	const [isEditingSelect, toggleIsEditingSelect] = useState(false);
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
		toggleIsEditingDescription(false);
		toggleIsEditingSelect(false);
	};
	return (
		<div className={classes.taskDetail}>
			{isEditingTitle ? (
				<ClickAwayListener onClickAway={() => toggleIsEditingTitle()}>
					<Input
						type="text"
						value={titleValue}
						onChange={handleTitleChange}
						autoFocus
						className={classes.taskTitleInput}
					/>
				</ClickAwayListener>
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
					toggleIsEditingSelect(true);
				}}
				diplay="inline"
				className={classes.taskSelectInput}
			>
				<MenuItem value={"Open"}>Open</MenuItem>
				<MenuItem value={"In Progress"}>In Progress</MenuItem>
			</Select>
			<br />
			<p className={classes.taskDetailPriorityLabel}>Priority:</p>
			<Select
				value={priorityValue}
				onChange={e => {
					handlePriorityChange(e);
					toggleIsEditingSelect(true);
				}}
				diplay="inline"
				className={classes.taskSelectInput}
			>
				<MenuItem value={"High"}>High</MenuItem>
				<MenuItem value={"Normal"}>Normal</MenuItem>
				<MenuItem value={"Low"}>Low</MenuItem>
			</Select>
			<p className={classes.taskDetailDescriptionLabel}>Description:</p>
			{isEditingDescription ? (
				<ClickAwayListener onClickAway={() => toggleIsEditingDescription()}>
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
						autoFocus
					/>
				</ClickAwayListener>
			) : (
				<Button className={classes.taskDetailDescriptionBtn}>
					<p
						className={classes.taskDetailDescription}
						onClick={toggleIsEditingDescription}
					>
						{descriptionValue}
					</p>
				</Button>
			)}
			{isEditingDescription || isEditingTitle || isEditingSelect ? (
				<Button
					className={classes.saveBtn}
					variant="outlined"
					onClick={handleSave}
				>
					Save
				</Button>
			) : null}
		</div>
	);
};

export default withStyles(styles)(TaskDetail);
