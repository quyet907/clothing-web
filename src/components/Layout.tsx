import {
	Badge,
	Box,
	Button,
	Container,
	createStyles,
	IconButton,
	makeStyles,
	Theme,
	Typography,
	withStyles,
} from "@material-ui/core";
import { Shop, ShoppingCart } from "@material-ui/icons";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory, useRouteMatch } from "react-router-dom";
import { config } from "../configs/config";
import axios from "../controller/axios";
import { update } from "../store/authentication";
import { updateCart } from "../store/cartSlice";
import { AppDispatch, RootState } from "../store/store";

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
	const cart = useSelector((state: RootState) => state.cart);
	const auth = useSelector((state: RootState) => state.authentication);

	const [user, setUser] = useState();
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (localStorage.getItem("jwt")) {
			axios.get(`${config.apiGateway}/cart`).then((res) => {
				console.log(res.data);
				dispatch(updateCart(res.data));
			});
		}
	}, []);

	useEffect(() => {
		console.log(cart);
	}, [cart]);

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
									{auth ? (
										<li>
											<Button
												style={{ fontWeight: 400, color: "#FFF" }}
												onClick={() => {
													dispatch(update(false));
													localStorage.removeItem("jwt");
												}}
											>
												Logout
											</Button>
										</li>
									) : (
										<>
											<li>
												<Link style={{ fontWeight: 400 }} to="/#">
													Sign Up
												</Link>
											</li>
											<li>
												<Link style={{ fontWeight: 400 }} to="/login">
													Sign In
												</Link>
											</li>
										</>
									)}
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
										<StyledBadge
											badgeContent={cart.reduce((acc, cur) => {
												return (acc += cur.quantity);
											}, 0)}
											color="primary"
										>
											<Shop />
										</StyledBadge>
									</IconButton>
								</Link>
							</Box>
						</Box>
					</Container>
				</div>
			</header>
			<div style={{ display: window.location.pathname === "/" ? undefined : "none" }}>
				<img
					src="https://firebasestorage.googleapis.com/v0/b/fir-app-87c8a.appspot.com/o/3rd_Banner_5_1600x%20(1).jpg?alt=media&token=54606252-9ae0-4e6e-b1f3-ca9929d5f1cd"
					alt="3rd-Banner-5-1600x-1"
					width="100%"
				/>
				<Container style={{ marginTop: 24 }}>
					<div style={{ display: "grid", gap: 24 }}>
						<div
							style={{
								gridColumn: "1/3",
								gridRow: "1/3",
								height: 500,
								backgroundImage:
									"url('https://assets.ajio.com/medias/sys_master/images/images/hd7/hcf/14844211527710/10122019-M-MHP-topbanner-NewArrivals-upto50.jpg",
								backgroundRepeat: "no-repeat",
								backgroundSize: "cover",
								backgroundPositionX: "center",
							}}
						></div>
						<div
							style={{
								gridColumn: "3/5",
								backgroundImage:
									"url('https://cdn.shopify.com/s/files/1/2265/5245/files/Mens-Fashion-Online-Shopping-in-Pakistan-3.jpg?v=1593221571",
								backgroundRepeat: "no-repeat",
								backgroundSize: "cover",
								backgroundPositionX: "center",
							}}
						></div>
						<div
							style={{
								backgroundImage:
									"url('https://i.pinimg.com/originals/6b/01/ce/6b01cee0eb95524c30f3030d9ea02dbe.jpg",
								backgroundRepeat: "no-repeat",
								backgroundSize: "cover",
								backgroundPositionX: "center",
							}}
						></div>
						<div
							style={{
								backgroundImage: "url('http://sitsoftwares.co.in/med/ALIA.jpg')",
								backgroundRepeat: "no-repeat",
								backgroundSize: "cover",
								backgroundPositionX: "center",
							}}
						></div>
					</div>
				</Container>
			</div>
			<main style={{ marginTop: 40, marginBottom: 100 }}>{props.children}</main>
			<footer></footer>
		</div>
	);
};

type Props = {};
