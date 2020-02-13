export default {
	task: props => ({
		width: "100%",
		fontSize: "1.5rem",
		borderRadius: "5px",
		backgroundColor: props.isDragging ? "#eee" : "#fff",
		color: "#000",
		padding: ".5rem",
		marginTop: ".5rem"
	}),
	taskLink: {
		textDecoration: "none"
	}
};
