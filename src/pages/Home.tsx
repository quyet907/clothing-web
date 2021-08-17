import { Box, Container, Grid } from "@material-ui/core";
import { cleanup } from "@testing-library/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductItem from "../components/ProductItem";
import { config } from "../configs/config";
import { Paging } from "../models/Paging";
import { Product } from "../models/Product";
import Pagination from "@material-ui/lab/Pagination";

export default function Home() {
	const [pagingProduct, setPagingProduct] = useState<Paging<Product>>({
		page: 1,
		pageSize: 8,
		rows: [],
		total: 0,
		totalPages: 1,
	});

	useEffect(() => {
		axios
			.get(`${config.apiGateway}/product`, {
				params: { page: pagingProduct.page, pageSize: pagingProduct.pageSize },
			})
			.then((res) => {
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
			<Box display="flex" justifyContent="center" mt={3}>
				<Pagination
					count={pagingProduct.totalPages}
					variant="outlined"
					shape="rounded"
					onChange={(e, vl) => {
						axios
							.get(`${config.apiGateway}/product`, {
								params: {
									page: vl,
									pageSize: pagingProduct.pageSize,
								},
							})
							.then((res) => {
								console.log(res);
								setPagingProduct(res.data as any);
							});
					}}
				/>
			</Box>
		</Container>
	);
}
