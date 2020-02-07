export default {
	board: {
		height: "97vh",
		position: "relative",
		marginTop: "7vh",
		paddingLeft: "1.5rem",
		paddingRight: "1.5rem"
	},
	boardTitle: {
		padding: ".5rem 1rem",
		fontSize: "2rem"
	},
	lanes: {
		display: "flex",
		overflowX: "scroll",
		overflowY: "hidden",
		whiteSpace: "nowrap",
		height: "100%",
		alignItems: "flex-start",
		paddingTop: "1rem"
	},
	newLaneInput: {
		margin: "0 .5rem",
		width: "30rem"
	},
	toggleNewLaneBtn: {
		minWidth: "30rem",
		height: "4.5rem",
		margin: "0 .5rem",
		fontSize: "1.5rem"
	},
	toggleEditTitleBtn: {
		marginTop: "2rem",
		borderRadius: "5px",
		paddingLeft: "0"
	},
	boardTitleInput: {
		marginTop: "3.1rem",
		marginBottom: "1rem",
		marginLeft: ".5rem"
	},
	alertOverride: {
		fontSize: "1.5rem",
		marginLeft: "0"
	},
	createLaneTitleHeading: {
		fontSize: "2rem",
		fontWeight: "bold",
		textAlign: "center",
		margin: "1rem 0"
	},
	createLaneTitleText: {
		fontSize: "1.5rem"
	},
	createLaneFormBtn: {
		fontSize: "1.3rem"
	},
	createTaskBtn: {
		borderRadius: "5px",
		backgroundColor: "#e0e0e0",
		fontSize: "1.2rem",
		height: "75%",
		marginLeft: "75%",
		boxShadow:
			"0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)"
	},
	boardHeader: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center"
	},
	lockBtn: {
		marginRight: "1rem"
	}
};
