import React, { useContext } from "react";
import TaskList from "./TaskList";
import { Droppable } from "react-beautiful-dnd";
import { DispatchContext } from "../Context/lanes.context";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import styles from "../Styles/LaneStyles";

const Lane = props => {
	const { classes, title, id, tasks, locked } = props;
	const dispatch = useContext(DispatchContext);

	return (
		<div className={classes.lane}>
			<div className={classes.laneHeader}>
				{title}
				{locked ? null : (
					<Tooltip title={<p className={classes.tooltip}>Delete lane</p>}>
						<IconButton
							onClick={() => dispatch({ type: "remove", id: id })}
							aria-label="delete lane"
						>
							<DeleteIcon />
						</IconButton>
					</Tooltip>
				)}
			</div>
			<Droppable droppableId={id.toString()}>
				{(provided, snapshot) => (
					<div
						ref={provided.innerRef}
						{...provided.droppableProps}
						style={{
							...provided.droppableProps.style,
							minHeight: "4rem"
						}}
					>
						<TaskList
							tasks={tasks}
							isDraggingOver={snapshot.isDraggingOver}
						></TaskList>
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	);
};

export default withStyles(styles)(Lane);
