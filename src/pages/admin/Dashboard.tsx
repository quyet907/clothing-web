import {
	Box,
	Button,
	CircularProgress,
	Container,
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	makeStyles,
	TextField,
	Typography,
} from "@material-ui/core";
import { AllInbox, Apps, Drafts, ExitToApp, Inbox, PeopleAlt, ViewList } from "@material-ui/icons";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Redirect, Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import axios from "../../controller/axios";
import { User } from "../../models/User";
import DashboardHome from "./DashboardHome";
import DashboardProduct from "./DashboardProduct";
import Login from "./Login";

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

function ListItemLink(props: any) {
	return <ListItem button component="a" {...props} />;
}

export default function Dashboard() {
	const classes = useStyles();
	let { path, url } = useRouteMatch();
	const [loading, setLoading] = useState<boolean>(false);
	const history = useHistory();
	const [isAuth, setIsAuth] = useState<boolean>(false);
	const [user, setUser] = useState<User>({ id: "", email: "", password: "", username: "" });
	const [selectedIndex, setSelectedIndex] = React.useState(0);
	const jwt = localStorage.getItem("jwt");

	useLayoutEffect(() => {
		if (jwt) {
			axios
				.get("http://localhost:3002/admin/user/me")
				.then((res) => {
					setIsAuth(true);
					setUser(res.data);
				})
				.catch((err) => {
					setIsAuth(false);
					localStorage.removeItem("jwt");
					history.push(`/admin/login`);
				})
				.finally(() => {});
		} else {
			localStorage.removeItem("jwt");
			history.push(`/admin/login`);
		}
	}, [history, jwt]);

	return loading ? (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				height: "100vh",
			}}
		>
			<CircularProgress />
		</div>
	) : isAuth ? (
		<div style={{ display: "flex", minHeight: "100vh" }}>
			<Box
				flexBasis={280}
				style={{
					borderRight: "1px solid #eee",
					display: "flex",
					flexDirection: "column",
					maxHeight: "100vh",
					position: "sticky",
					top: 0,
				}}
			>
				<Box flex={1}>
					<Box mt={3.5} mb={2} style={{ display: "flex", justifyContent: "center" }}>
						<div
							style={{
								backgroundImage:
									"url('https://images.jazelc.com/uploads/fordcrestview/ExpressStore-Logo-01.png')",
								height: 77,
								width: "100%",
								backgroundRepeat: "no-repeat",
								backgroundSize: "contain",
								backgroundPositionX: "center",
							}}
						></div>
					</Box>
					<List component="nav" aria-label="main mailbox folders">
						<ListItem
							button
							selected={selectedIndex === 0}
							onClick={(e) => {
								history.push(`${path}/home`);
								setSelectedIndex(0);
							}}
						>
							<ListItemIcon>
								<Apps />
							</ListItemIcon>
							<ListItemText primary="Home" />
						</ListItem>
						<ListItem
							button
							selected={selectedIndex === 1}
							onClick={(e) => {
								history.push(`${path}/product`);
								setSelectedIndex(1);
							}}
						>
							<ListItemIcon>
								<AllInbox />
							</ListItemIcon>
							<ListItemText primary="Product" />
						</ListItem>
						<ListItem button disabled onClick={(e) => setSelectedIndex(2)}>
							<ListItemIcon>
								<ViewList />
							</ListItemIcon>
							<ListItemText primary="Category" />
						</ListItem>
						<ListItem button disabled onClick={(e) => setSelectedIndex(3)}>
							<ListItemIcon>
								<PeopleAlt />
							</ListItemIcon>
							<ListItemText primary="User" />
						</ListItem>
					</List>
				</Box>
				<Box padding={2}>
					<Box
						style={{
							border: "1px solid #ddd",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Typography style={{ fontWeight: 600, justifySelf: "center" }}>
							{user.username}
						</Typography>
						<IconButton
							style={{ justifySelf: "flex-end" }}
							onClick={() => {
								localStorage.removeItem("jwt");
								setIsAuth(false);
							}}
						>
							<ExitToApp />
						</IconButton>
					</Box>
				</Box>
			</Box>
			<Box flex={1}>
				<Box style={{ padding: 48 }}>
					<Switch>
						<Route exact path={`${path}/home`}>
							<DashboardHome></DashboardHome>
						</Route>
						<Route exact path={`${path}/product`}>
							<DashboardProduct></DashboardProduct>
						</Route>
						<Route exact path={path}>
							<Redirect to={`${path}/home`} />
						</Route>
						<Route path="*">
							Not found - 404
							<Button onClick={() => history.push(`${path}`)}>
								Back to Dashboard
							</Button>
						</Route>
					</Switch>
				</Box>
			</Box>
		</div>
	) : (
		<Login />
	);
}
