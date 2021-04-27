import {
	Box,
	Breadcrumbs,
	Button,
	CircularProgress,
	Container,
	createStyles,
	IconButton,
	makeStyles,
	Typography,
} from "@material-ui/core";
import {
	Check,
	FavoriteBorder,
	Home,
	LocalShipping,
	LocalShippingOutlined,
	Shop,
} from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Link, NavLink } from "react-router-dom";
import NotFound from "../components/NotFound";
import { Product } from "../models/Product";
import { increment } from "../store/cartSlice";
import { AppDispatch } from "../store/store";
import { NumberUtils } from "../utils/NumberUtils";

const useStyles = makeStyles((theme) =>
	createStyles({
		navlink: {
			color: "inherit",
			textDecoration: "none",
			"&:hover": {
				textDecoration: "underline",
			},
			display: "flex",
		},
		icon: {
			marginRight: theme.spacing(0.5),
			width: 20,
			height: 20,
		},
		details: {
			"& > *:nth-child(n+2)": {
				marginTop: 24,
			},
		},
		sizes: {
			"& > li": {
				border: "1px solid #ebedee",
			},
		},
		description: {
			listStyle: "none",
			margin: 0,
			padding: 0,
			"& li": {
				display: "inline-block",
				padding: "0px 24px",
				textTransform: "uppercase",
				height: 50,
				lineHeight: "50px",
			},
		},
	})
);

export default function ProductDetails() {
	const classes = useStyles();
	const params = useParams<{ id: string }>();
	const dispatch = useDispatch<AppDispatch>();
	const [product, setProduct] = useState<Product>({
		id: "",
		description: "",
		images: [],
		name: "",
		price: 0,
	});

	const [loading, setLoading] = useState<boolean>(true);

	useLayoutEffect(() => {
		if (!params.id) return;
		setTimeout(() => {
			axios
				.get("http://localhost:3002/product/" + params.id)
				.then((res) => {
					setProduct(res.data);
				})
				.finally(() => {
					setLoading(false);
				});
		}, 2000);
	}, []);

	return loading ? (
		<Container>
			<CircularProgress />
		</Container>
	) : product.id ? (
		<div>
			<div style={{ borderBottom: "1px solid #eee" }}>
				<Container>
					<div>
						<Breadcrumbs aria-label="breadcrumb">
							<NavLink className={classes.navlink} to="/">
								<Home className={classes.icon} />
								Home
							</NavLink>
							<NavLink className={classes.navlink} to="/">
								Men
							</NavLink>
							<Typography color="textPrimary">{product.name}</Typography>
						</Breadcrumbs>
					</div>
					<div style={{ display: "flex", marginTop: 40 }}>
						<div
							style={{
								height: 600,
								flex: 0.6,
								backgroundImage: "url(" + product.images[0] + ")",
								backgroundPositionX: "center",
								backgroundRepeat: "no-repeat",
								backgroundSize: "contain",
							}}
						></div>

						<Box flex={0.4} pl={4} className={classes.details}>
							<Typography style={{ fontSize: "1.5rem" }}>{product.name}</Typography>
							<Typography style={{ fontWeight: "bold" }}>
								{new NumberUtils(product.price).formatMoney()}
							</Typography>
							<Typography style={{ fontWeight: "bold" }}>Select size</Typography>
							<Box>
								<ul
									style={{
										display: "flex",
										listStyle: "none",
										padding: 0,
										marginBottom: 0,
									}}
									className={classes.sizes}
								>
									<li>
										<Button>S</Button>
									</li>
									<li>
										<Button>M</Button>
									</li>
									<li>
										<Button>L</Button>
									</li>
									<li>
										<Button>XL</Button>
									</li>
								</ul>
							</Box>

							<div>
								<Button
									onClick={(e) => dispatch(increment())}
									startIcon={<Shop />}
									variant="contained"
									style={{
										borderRadius: 0,
										color: "#FFF",
										backgroundColor: "#000",
										fontWeight: 600,
										padding: "12px 63px",
									}}
								>
									Add to bag
								</Button>
								<IconButton
									style={{
										marginLeft: 8,
										borderRadius: 0,
										border: "2px solid",
										// color: "#FFF",
										// backgroundColor: "#000",
										// fontWeight: 600,
										padding: "12px",
									}}
								>
									<FavoriteBorder fontSize="small" />
								</IconButton>
							</div>

							<Box display="flex" alignItems="center">
								<Check />
								<Typography variant="caption" style={{ marginLeft: 16 }}>
									PAY OVER TIME IN INTEREST-FREE INSTALLMENTS WITH AFFIRM, KLARNA
									OR AFTERPAY
								</Typography>
							</Box>

							<Box display="flex" alignItems="center">
								<LocalShippingOutlined />
								<Typography variant="caption" style={{ marginLeft: 16 }}>
									JOIN CREATORS CLUB TO GET UNLIMITED FREE SHIPPING, RETURNS,
									&#38; EXCHANGES
								</Typography>
							</Box>
						</Box>
					</div>
					<div></div>
				</Container>
			</div>
			<div style={{ borderBottom: "1px solid #eee" }}>
				<Container>
					<Box display="flex" justifyContent="center">
						<ul className={classes.description}>
							<li>Gallery</li>
							<li>Reviews</li>
							<li>Description</li>
							<li>Details</li>
						</ul>
					</Box>
				</Container>
			</div>
			<div>
				<Container>{product.description}</Container>
			</div>
		</div>
	) : (
		<NotFound />
	);
}
