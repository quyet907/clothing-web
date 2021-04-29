import { Container, Grid } from "@material-ui/core";
import { cleanup } from "@testing-library/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductItem from "../components/ProductItem";
import { config } from "../configs/config";
import { Paging } from "../models/Paging";
import { Product } from "../models/Product";

export default function Home() {
	const [pagingProduct, setPagingProduct] = useState<Paging<Product>>({
		page: 1,
		pageSize: 10,
		rows: [],
		total: 0,
		totalPages: 1,
	});

	useEffect(() => {
		axios.get(`${config.apiGateway}/product`).then((res) => {
			console.log(res);
			setPagingProduct(res.data as any);
		});
	}, []);

	return (
		<Container>

			
			<div
				style={{
					display: "grid",
					gap: 24,
					gridTemplateColumns: "repeat(4, 1fr)",
				}}
			>
				{pagingProduct.rows.map((item) => {
					return <ProductItem product={item}></ProductItem>;
				})}
			</div>
		</Container>
	);
}
