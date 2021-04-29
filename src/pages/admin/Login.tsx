import { makeStyles, Container, Typography, TextField, Button, Box } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
	container: {
		minWidth: 500,
		marginTop: "-10vh",
		"& > *": {
			display: "block",
			width: "100%",
		},
		"& > *:nth-child(n+2)": {
			marginTop: 24,
		},
	},
}));

export default function Login() {
	const classes = useStyles();
	const [user, setUser] = useState({ username: "admin", password: "admin" });
	const history = useHistory();
	const [error, setError] = useState("");

	return (
		<Container>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					minHeight: "100vh",
				}}
			>
				<form>
					<div className={classes.container}>
						<Typography variant="h5" style={{ fontWeight: "bold" }}>
							Login
						</Typography>

						<TextField
							label="Username"
							fullWidth
							variant="outlined"
							color="primary"
							value={user.username}
							onChange={(e) => {
								setUser({ ...user, username: e.target.value });
							}}
						></TextField>

						<TextField
							label="Password"
							fullWidth
							type="password"
							variant="outlined"
							color="primary"
							value={user.password}
							onChange={(e) => {
								setUser({ ...user, password: e.target.value });
							}}
						></TextField>

						<Box>
							<Typography variant="caption" color="error">
								{error}
							</Typography>
						</Box>

						<Button
							variant="contained"
							color="primary"
							onClick={() => {
								axios
									.post("http://localhost:3002/admin/user/login", {
										username: user.username,
										password: user.password,
									})
									.then((res) => {
										localStorage.setItem("jwt", `${res.data.token}`);
										history.push("/admin");
										setError("")
									})
									.catch((err) => {
										console.log(err.response);
										setError(err.response.data.message)
									});
							}}
						>
							Login
						</Button>
					</div>
				</form>
			</div>
		</Container>
	);
}
