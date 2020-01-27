import React from "react";
import Task from "./Task";
import { Draggable } from "react-beautiful-dnd";
import styles from "../Styles/TaskListStyles";
import { withStyles } from "@material-ui/core/styles";

const TaskList = props => {
	const { classes, tasks } = props;
	return (
		<div className={classes.taskList}>
			{tasks.map((task, index) => (
				<Draggable draggableId={task.title} index={index}>
					{provided => (
						<Task
							title={task.title}
							key={task.id}
							id={task.id}
							{...provided.draggableProps}
							{...provided.dragHandleProps}
							innerRef={provided.innerRef}
						/>
					)}
				</Draggable>
			))}
		</div>
	);
};

export default withStyles(styles)(TaskList);
