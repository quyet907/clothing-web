import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Box, Button, IconButton, TablePagination, Typography } from "@material-ui/core";
import { Paging } from "../../models/Paging";
import { Product } from "../../models/Product";
import { NumberUtils } from "../../utils/NumberUtils";
import { Add, Delete, Edit } from "@material-ui/icons";
import { config } from "../../configs/config";
import axios from "axios";
import DeletePopUp from "../../components/DeletePopUp";
import AddProductPopUp from "../../components/AddProductPopUp";

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
	description: {
		"& p": {
			display: "-webkit-box",
			WebkitLineClamp: 1,
			WebkitBoxOrient: "vertical",
			overflow: "hidden",
			margin: 0
		},
		"& > p > img": {
			display: "none"
		},
	},
});

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
	return { name, calories, fat, carbs, protein };
}

export default function DashboardProduct() {
	const classes = useStyles();
	const [deletePopUp, setDeletePopUp] = useState<boolean>(false);
	const [addNewPopUp, setAddNewPopUp] = useState<boolean>(false);

	const [selectedProduct, setSelectedProduct] = useState<Product>({ id: "" } as Product);
	const [paging, setPaging] = useState<Paging<Product>>({
		page: 1,
		pageSize: 10,
		rows: [],
		total: 1,
		totalPages: 1,
	});

	const [query, setQuery] = useState<{ page: number; pageSize: number }>({
		page: 1,
		pageSize: 10,
	});

	useEffect(() => {
		axios
			.get(`${config.apiGateway}/product`, {
				params: { page: query.page, pageSize: query.pageSize },
			})
			.then((res) => {
				setPaging(res.data);
			});
	}, [query]);

	return (
		<div>
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<Typography style={{ fontWeight: "bold" }} variant="h5">
					Product
				</Typography>
				<Button
					variant="contained"
					color="primary"
					startIcon={<Add />}
					onClick={() => {
						setSelectedProduct({ id: "" } as Product);
						setAddNewPopUp(true);
					}}
				>
					Add Product
				</Button>
			</div>
			<TableContainer style={{ marginTop: 8 * 3 }}>
				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							{/* <TableCell style={{ fontWeight: "bold" }}>Order</TableCell> */}
							<TableCell padding="none" style={{ fontWeight: "bold" }}>
								Product
							</TableCell>
							<TableCell style={{ fontWeight: "bold" }}>Description</TableCell>
							<TableCell align="right" style={{ fontWeight: "bold" }}>
								Price
							</TableCell>
							<TableCell align="right"></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{paging.rows.map((row, index) => (
							<TableRow key={row.id}>
								{/* <TableCell align="right" style={{maxWidth: 20}}>
									{index}
								</TableCell> */}
								<TableCell padding="none">
									<div
										style={{
											display: "flex",
											alignItems: "center",
											padding: "12px 0",
										}}
									>
										<Box
											style={{
												backgroundImage: `url("${
													row.images ? row.images[0] : ""
												}")`,
												backgroundRepeat: "no-repeat",
												backgroundSize: "cover",
												width: 40,
												height: 40,
												borderRadius: 5,
												marginRight: 16,
												border: "1px solid #eee",
											}}
										></Box>
										{row.name}
									</div>
								</TableCell>

								<TableCell
									className={classes.description}
									dangerouslySetInnerHTML={{ __html: row.description }}
								></TableCell>
								<TableCell align="right">
									{new NumberUtils(row.price).formatMoney()}
								</TableCell>
								<TableCell align="right" padding="none">
									<IconButton
										onClick={() => {
											setSelectedProduct(row);
											setAddNewPopUp(true);
										}}
									>
										<Edit />
									</IconButton>
									<IconButton
										onClick={() => {
											setSelectedProduct(row);
											setDeletePopUp(true);
										}}
									>
										<Delete color="error" />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				<TablePagination
					component="div"
					count={paging.total}
					onChangePage={(e, page) => setQuery({ ...query, page: page + 1 })}
					page={paging.page - 1}
					rowsPerPage={paging.pageSize}
					onChangeRowsPerPage={(e) =>
						setQuery({ ...query, pageSize: Number(e.target.value) })
					}
				/>
			</TableContainer>
			<DeletePopUp
				open={deletePopUp}
				onAgree={() => {
					axios
						.delete(`${config.apiGateway}/product`, {
							params: { id: selectedProduct.id },
						})
						.then((res) => {
							axios
								.get(`${config.apiGateway}/product`, {
									params: { page: query.page, pageSize: query.pageSize },
								})
								.then((res) => {
									setPaging(res.data);
								});
						})
						.finally(() => {
							setDeletePopUp(false);
						});
				}}
				onClose={() => setDeletePopUp(false)}
				onDisagree={() => setDeletePopUp(false)}
			></DeletePopUp>

			<AddProductPopUp
				product={selectedProduct}
				open={addNewPopUp}
				onSave={(product) => {
					if (product.id) {
						axios
							.put(`${config.apiGateway}/product`, product)
							.then((res) => {
								axios
									.get(`${config.apiGateway}/product`, {
										params: { page: query.page, pageSize: query.pageSize },
									})
									.then((res) => {
										setPaging(res.data);
									});
							})
							.finally(() => {
								setAddNewPopUp(false);
							});
					} else {
						axios
							.post(`${config.apiGateway}/product`, product)
							.then((res) => {
								axios
									.get(`${config.apiGateway}/product`, {
										params: { page: query.page, pageSize: query.pageSize },
									})
									.then((res) => {
										setPaging(res.data);
									});
							})
							.finally(() => {
								setAddNewPopUp(false);
							});
					}
				}}
				onClose={() => setAddNewPopUp(false)}
			></AddProductPopUp>
		</div>
	);
}
