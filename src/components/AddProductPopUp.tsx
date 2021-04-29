import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Product } from "../models/Product";
import { makeStyles, TextField } from "@material-ui/core";
import { Editor } from "@tinymce/tinymce-react";

const useStyles = makeStyles((theme) => ({
	container: {
		"& > *": {
			display: "block",
			width: "100%",
		},
		"& > *:nth-child(n+2)": {
			marginTop: 24,
		},
	},
}));

export default function AddProductPopUp(props: Props) {
	const classes = useStyles();

	const [product, setProduct] = useState<Product>({
		id: "",
		description: "",
		images: [],
		name: "",
		price: 0,
	});

	const isNew = !!!props.product.id;

	const handleClose = () => {
		props.onClose();
	};

	useEffect(() => {
		setProduct(props.product);
	}, [props.product]);

	return (
		<Dialog
			maxWidth={"md"}
			open={props.open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">
				{isNew ? "ADD PRODUCT" : "EDIT PRODUCT"}
			</DialogTitle>
			<DialogContent>
				<div className={classes.container}>
					<TextField
						variant="outlined"
						label="Image"
						fullWidth
						value={product.images}
						onChange={(e) => setProduct({ ...product, images: [e.target.value] })}
					></TextField>
					<TextField
						variant="outlined"
						label="Name"
						fullWidth
						value={product.name}
						onChange={(e) => setProduct({ ...product, name: e.target.value })}
					></TextField>
					<TextField
						variant="outlined"
						label="Price"
						fullWidth
						type="number"
						value={product.price}
						onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
					></TextField>
					<Editor
						apiKey="8x2ixjpdc6sigjnb5xhluh335t8a3q0s2zx0xdofz3woekba"
						initialValue={props.product.description || ""}
						init={{
							min_height: 300,
							width: 700,
							// menubar: false,
							inline: false,
							quickbars_insert_toolbar: "quicktable",
							autosave_ask_before_unload: false,
							mobile: {
								plugins:
									"print preview   importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen  link   template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists checklist wordcount   textpattern noneditable help   charmap  quickbars  emoticons",
							},
							plugins:
								"print code preview  importcss tinydrive searchreplace autolink autosave save directionality visualblocks visualchars fullscreen quickbars  link   template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime lists  wordcount   textpattern noneditable help   charmap   emoticons ",
							toolbar:
								"undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist  | forecolor backcolor casechange   removeformat | pagebreak | charmap emoticons | fullscreen  preview save print |   template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment code",
						}}
						// onEditorChange={this.handleEditorChange}
						onSaveContent={() => {}}
						// onBlur={()}
						onFocus={() => {
							// setCursorPointerMessage({
							// 	...cursorPointerMessage,
							// 	isFocus: true,
							// });
							// setCursorPointerTitle({
							// 	...cursorPointerTitle,
							// 	isFocus: false,
							// });
						}}
						onEditorChange={(content, editor) =>
							setProduct({ ...product, description: content })
						}
					/>
				</div>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.onClose} color="primary">
					Cancel
				</Button>
				<Button
					onClick={() =>
						props.onSave({
							...product,
							images:
								product.images && product.images.length > 0 ? product.images : [],
						})
					}
					color="primary"
					autoFocus
				>
					Save
				</Button>
			</DialogActions>
		</Dialog>
	);
}

type Props = {
	product: Product;
	open: boolean;
	onClose(): void;
	onSave(product: Product): void;
};
