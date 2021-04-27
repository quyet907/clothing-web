import {
	Badge,
	Box,
	Container,
	createStyles,
	IconButton,
	makeStyles,
	Theme,
	Typography,
	withStyles,
} from "@material-ui/core";
import { Shop, ShoppingCart } from "@material-ui/icons";
import React, { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { RootState } from "../store/store";

const useStyles = makeStyles((theme) => ({
	list: {
		listStyle: "none",
		display: "flex",
		justifyContent: "flex-end",
		"& li": {},
		"& li > a": {
			padding: "0 8px",
			lineHeight: "30px",
			textDecoration: "none",
			textTransform: "uppercase",
			fontWeight: 500,
			color: "unset",
			fontSize: "0.9rem",
		},
		margin: 0,
	},
	header: {
		backgroundColor: "#FFF",
		position: "sticky",
		top: 0,
		zIndex: 2,
	},
}));

const StyledBadge = withStyles((theme: Theme) =>
	createStyles({
		badge: {
			right: -4,
			top: 3,
			border: `2px solid ${theme.palette.background.paper}`,
			padding: "0 4px",
		},
	})
)(Badge);

export const Layout = (props: PropsWithChildren<Props>) => {
	const classes = useStyles();
	const history = useHistory();
	const count = useSelector((state: RootState) => state.cart.value);

	return (
		<div>
			<header className={classes.header}>
				<div
					style={{
						borderBottom: "1px solid #eee",
						backgroundColor: "#000000",
						color: "#fff",
					}}
				>
					<Container>
						<Box style={{ display: "flex", alignItems: "center" }}>
							<Box flex={3}></Box>
							<Box flex={6} textAlign="center">
								<Typography variant="caption">
									Virtual Stores and Store Services |{" "}
									<NavLink style={{ color: "white" }} to="#">
										Explore Now
									</NavLink>
								</Typography>
							</Box>
							<Box flex={3}>
								<ul className={classes.list}>
									<li>
										<Link style={{ fontWeight: 400 }} to="/#">
											Sign Up
										</Link>
									</li>
									<li>
										<Link style={{ fontWeight: 400 }} to="/#">
											Sign In
										</Link>
									</li>
								</ul>
							</Box>
						</Box>
					</Container>
				</div>
				<div style={{ borderBottom: "1px solid #eee" }}>
					<Container>
						<Box style={{ display: "flex", alignItems: "center", height: 70 }}>
							<Box>
								<Link to="/">
									<img
										src="https://cdn-fsly.yottaa.net/5e18d625d9314057054ee33e/www.ralphlauren.com/v~4b.13/on/demandware.static/Sites-RalphLauren_US-Site/-/en_US/v1619259507345/images/logo.svg?yocs=1_"
										alt="logo"
										height={25}
									/>
								</Link>
							</Box>
							<Box flex={1}>
								<ul
									className={classes.list}
									style={{ justifyContent: "flex-start" }}
								>
									<li>
										<Link to="#">Men</Link>
									</li>

									<li>
										<Link to="#">Women</Link>
									</li>

									<li>
										<Link to="#">Home</Link>
									</li>

									<li>
										<Link to="#">Gifts</Link>
									</li>

									<li>
										<Link to="#">World of Rl</Link>
									</li>

									<li>
										<Link to="#">Sale</Link>
									</li>
								</ul>
							</Box>
							<Box>
								<Link to="/cart">
									<IconButton>
										<StyledBadge badgeContent={count} color="primary">
											<Shop />
										</StyledBadge>
									</IconButton>
								</Link>
							</Box>
						</Box>
					</Container>
				</div>
			</header>
			<main style={{ marginTop: 40, marginBottom: 100 }}>{props.children}</main>
			<footer></footer>
		</div>
	);
};

type Props = {};
