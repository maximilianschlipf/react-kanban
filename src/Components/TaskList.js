import React from "react";
import Task from "./Task";
import { Draggable } from "react-beautiful-dnd";
import styles from "../Styles/TaskListStyles";
import { withStyles } from "@material-ui/core/styles";

const TaskList = props => {
	const { classes, tasks } = props;
	return (
		<div className={classes.taskList}>
			{tasks !== undefined &&
				tasks.map((task, index) => (
					<Draggable
						draggableId={task.id.toString()}
						index={index}
						key={task.id}
					>
						{(provided, snapshot) => (
							<div
								{...provided.draggableProps}
								{...provided.dragHandleProps}
								ref={provided.innerRef}
								style={{ ...provided.draggableProps.style, width: "29rem" }}
								//A width of 100% will cause a problem when using the snapshot to change styles when dragging
							>
								<Task
									title={task.title}
									key={task.id}
									id={task.id}
									isDragging={snapshot.isDragging}
								/>
							</div>
						)}
					</Draggable>
				))}
		</div>
	);
};

export default withStyles(styles)(TaskList);
