import { ThemeProvider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout";
import NotFound from "./components/NotFound";
import Cart from "./pages/Cart";
import Dashboard from "./pages/admin/Dashboard";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import { theme } from "./styles/theme";
import { config } from "./configs/config";
import axios from "./controller/axios";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import { update } from "./store/authentication";
import { updateCart } from "./store/cartSlice";

function App() {
	const dispatch = useDispatch<AppDispatch>();
	const isAdminRoute = window.location.href.includes("admin");
	const isPrivateRoute = window.location.href.includes("cart");

	const auth = useSelector((state: RootState) => state.authentication);

	useEffect(() => {
		axios
			.get(`${config.apiGateway}/user/me`)
			.then((res) => {
				dispatch(update(true));
			})
			.catch((err) => {
				dispatch(update(false));
			});
	}, []);

	useEffect(() => {
		if (!auth) {
			dispatch(updateCart([]));
		}
	}, [auth]);

	return (
		<React.StrictMode>
			<ThemeProvider theme={theme}>
				<Router>
					<Switch>
						<Route exact path="/login">
							{auth ? <Redirect to="/" /> : <Login />}
						</Route>
						{isAdminRoute ? (
							<Switch>
								<Route path="/admin">
									<Dashboard />
								</Route>

								<Route path="*">
									<NotFound />
								</Route>
							</Switch>
						) : (
							<Layout>
								<Switch>
									<Route exact path="/">
										<Home />
									</Route>

									<Route exact path="/product/:id">
										<ProductDetails />
									</Route>
									<Route exact path="/cart">
										{auth ? <Cart /> : <Redirect to="/login" />}
									</Route>
									<Route path="*">
										<NotFound />
									</Route>
								</Switch>
							</Layout>
						)}
					</Switch>
				</Router>
			</ThemeProvider>
		</React.StrictMode>
	);
}

export default App;
