import classes from "*.module.css";
import {
	Box,
	Button,
	Container,
	FormControl,
	InputLabel,
	makeStyles,
	MenuItem,
	Select,
	Typography,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { config } from "../configs/config";
import { CartItem } from "../models/Cart";
import { updateCart } from "../store/cartSlice";
import { AppDispatch, RootState } from "../store/store";
import { NumberUtils } from "../utils/NumberUtils";

const useStyles = makeStyles((theme) => ({
	payment: {
		"& > *": {
			display: "block",
			width: "100%",
		},
		"& > *:nth-child(n)": {
			display: "flex",
			justifyContent: "space-between",
			marginTop: 24,
			paddingBottom: 24,
		},
	},
}));

export default function Cart() {
	const classes = useStyles();
	const cartItems: CartItem[] = useSelector((state: RootState) => state.cart);
	const dispatch = useDispatch<AppDispatch>();

	return (
		<Container maxWidth="lg">
			<div style={{ display: "flex" }}>
				<Box flex={1}>
					<Typography variant="h5" style={{ fontWeight: "bold" }}>
						Order
					</Typography>
					{cartItems.map((item) => {
						return (
							<div
								style={{
									display: "flex",
									borderBottom: "1px solid #eee",
									marginTop: 20,
									paddingBottom: 20,
								}}
							>
								<Box
									style={{
										width: 120,
										height: 120,
										backgroundImage: `url(${item.product.images[0]})`,
										backgroundRepeat: "no-repeat",
										backgroundPositionX: "center",
										backgroundSize: "cover",
										marginRight: 24,
										border: "1px solid #eee",
									}}
								></Box>
								<Box
									flex={1}
									display="flex"
									flexDirection="column"
									justifyContent="space-between"
								>
									<Typography style={{ fontWeight: 500, fontSize: "1.1rem" }}>
										{item.product.name}
									</Typography>
									<Box display="flex" alignItems="center" pt={1}>
										<Typography style={{ marginRight: 10 }}>
											Quantity
										</Typography>
										<FormControl variant="outlined" size="small">
											<Select
												labelId="demo-simple-select-outlined-label"
												id="demo-simple-select-outlined"
												value={item.quantity}
												onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
													axios
														.put(`${config.apiGateway}/cart/update`, {
															productId: item.product_id,
															quantity: event.target.value,
														})
														.then((res) => {
															dispatch(updateCart(res.data));
														});
												}}
											>
												<MenuItem value={1}>1</MenuItem>
												<MenuItem value={2}>2</MenuItem>
												<MenuItem value={3}>3</MenuItem>
												<MenuItem value={4}>4</MenuItem>
												<MenuItem value={5}>5</MenuItem>
											</Select>
										</FormControl>
									</Box>
									<Box ml={-0.5} mb={-0.5}>
										<Button
											size="small"
											startIcon={<Close />}
											onClick={() => {
												axios
													.put(`${config.apiGateway}/cart/update`, {
														productId: item.product_id,
														quantity: 0,
													})
													.then((res) => {
														dispatch(updateCart(res.data));
													});
											}}
										>
											Remove
										</Button>
									</Box>
								</Box>
								<Box>
									<Typography>
										{new NumberUtils(item.product.price).formatMoney()}
									</Typography>
								</Box>
							</div>
						);
					})}
				</Box>
				<Box flexBasis={400} marginLeft={6} style={{ position: "sticky", top: 0 }}>
					<Typography variant="h5" style={{ fontWeight: "bold" }}>
						Payment Summary
					</Typography>
					<Box className={classes.payment}>
						<Box>
							<Typography>Subtotal</Typography>
							<Typography>
								{new NumberUtils(
									cartItems.reduce((acc, cur) => {
										return (acc += cur.product.price * cur.quantity);
									}, 0)
								).formatMoney()}
							</Typography>
						</Box>

						<Box style={{ borderBottom: "1px solid #eee", marginTop: 12 }}>
							<Typography>{"Estimated Delivery & Handling"}</Typography>
							<Typography>{new NumberUtils(0).formatMoney()}</Typography>
						</Box>

						<Box style={{ borderBottom: "1px solid #eee" }}>
							<Typography style={{ fontWeight: "bold" }}>{"Total"}</Typography>
							<Typography style={{ fontWeight: "bold" }}>
								{new NumberUtils(
									cartItems.reduce((acc, cur) => {
										return (acc += cur.product.price * cur.quantity);
									}, 0)
								).formatMoney()}
							</Typography>
						</Box>

						<Box>
							<Button
								style={{ padding: "13px", fontWeight: 600 }}
								fullWidth
								variant="contained"
								color="primary"
							>
								Checkout
							</Button>
						</Box>
					</Box>
				</Box>
			</div>
		</Container>
	);
}
