import { ThemeProvider } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout";
import NotFound from "./components/NotFound";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import { theme } from "./styles/theme";

function App() {
	// const { url, path } = useRouteMatch();
	const isPrivateRoute = window.location.href.includes("admin");

	return (
		<React.StrictMode>
			<ThemeProvider theme={theme}>
				<Router>
					<Switch>
						{isPrivateRoute ? (
							<Switch>
								<Route path="/admin">
									<Dashboard />
								</Route>

								<Route path="*">1111</Route>
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
										<Cart />
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
