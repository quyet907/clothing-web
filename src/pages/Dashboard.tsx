import {
	Box,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	makeStyles,
	Typography,
} from "@material-ui/core";
import { Drafts, Inbox } from "@material-ui/icons";
import React from "react";
import { Route, Switch } from "react-router";
import DashboardHome from "./DashboardHome";
import DashboardProduct from "./DashboardProduct";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
}));

function ListItemLink(props: any) {
	return <ListItem button component="a" {...props} />;
}

export default function Dashboard() {
	const classes = useStyles();

	return (
		<div style={{ display: "flex", minHeight: "100vh" }}>
			<Box flexBasis={280} style={{borderRight: "1px solid #eee"}}>
				<List component="nav" aria-label="main mailbox folders">
					<ListItem button>
						<ListItemIcon>
							<Inbox />
						</ListItemIcon>
						<ListItemText primary="Inbox" />
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<Drafts />
						</ListItemIcon>
						<ListItemText primary="Drafts" />
					</ListItem>
				</List>
				<Divider />
				<List component="nav" aria-label="secondary mailbox folders">
					<ListItem button>
						<ListItemText primary="Trash" />
					</ListItem>
					<ListItemLink href="#simple-list">
						<ListItemText primary="Spam" />
					</ListItemLink>
				</List>
			</Box>
			<Box flex={1}>
				<Box style={{ padding: 48 }}>
					<Switch>
						<Route exact path="/">
							<DashboardHome></DashboardHome>
						</Route>
						<Route exact path="/home">
							<DashboardHome></DashboardHome>
						</Route>
						<Route exact path="/product">
							<DashboardProduct></DashboardProduct>
						</Route>
					</Switch>
				</Box>
			</Box>
		</div>
	);
}
