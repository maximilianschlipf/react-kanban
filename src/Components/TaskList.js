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
				<Draggable draggableId={task.title} index={index} key={task.id}>
					{provided => (
						<div
							{...provided.draggableProps}
							{...provided.dragHandleProps}
							ref={provided.innerRef}
						>
							<Task title={task.title} key={task.id} id={task.id} />
						</div>
					)}
				</Draggable>
			))}
		</div>
	);
};

export default withStyles(styles)(TaskList);
