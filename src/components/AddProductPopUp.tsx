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
import * as Yup from "yup";
import { useFormik } from "formik";

const ProductSchema = Yup.object().shape({
	images: Yup.string().required("Required"),
	name: Yup.string().required("Required"),
	price: Yup.number().min(0, "Price > 0").required("Required"),
	description: Yup.string(),
});

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

	const formik = useFormik({
		initialValues: {
			...product,
			images: product.images && product.images.length > 0 ? product.images[0] : "",
		},
		enableReinitialize: true,
		validationSchema: ProductSchema,
		onSubmit: (values, { setSubmitting }) => {
			// setSubmitting(true);
			props.onSave({
				...values,
				images:
					product.images && product.images.length > 0
						? [values.images, ...product.images]
						: [values.images],
			});
		},
	});

	useEffect(() => {
		setProduct(props.product);
		if (!props.product.id) {
			formik.setValues({ id: "", description: "", images: "", name: "", price: 0 });
		}
	}, [props.product]);

	useEffect(() => {
		!props.open && formik.setErrors({});
	}, [props.open]);

	return (
		<form onSubmit={formik.handleSubmit}>
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
							name="images"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.images}
							error={!!formik.errors.images && formik.touched.images}
							helperText={formik.errors.images ? formik.errors.images : null}
						></TextField>
						<TextField
							variant="outlined"
							label="Name"
							fullWidth
							name="name"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.name}
							error={!!formik.errors.name && formik.touched.name}
							helperText={formik.errors.name ? formik.errors.name : null}
						></TextField>
						<TextField
							variant="outlined"
							label="Price"
							fullWidth
							type="number"
							name="price"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.price}
							error={!!formik.errors.price && formik.touched.price}
							helperText={formik.errors.price ? formik.errors.price : null}
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
								formik.setFieldValue("description", content)
							}
						/>
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={props.onClose} color="primary">
						Cancel
					</Button>
					<Button type="submit" onClick={formik.submitForm} color="primary" autoFocus>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</form>
	);
}

type Props = {
	product: Product;
	open: boolean;
	onClose(): void;
	onSave(product: Product): void;
};
