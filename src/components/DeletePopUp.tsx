import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Product } from "../models/Product";

export default function DeletePopUp(props: Props) {
	const handleClose = () => {
		props.onClose();
	};

	return (
		<Dialog
			open={props.open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">
				{"Are you sure to delete this product?"}
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					Once removed, the product cannot be restored!
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.onDisagree} color="primary">
					No
				</Button>
				<Button onClick={props.onAgree} color="primary" autoFocus>
					Yes
				</Button>
			</DialogActions>
		</Dialog>
	);
}

type Props = {
	open: boolean;
	onClose(): void;
	onAgree(): void;
	onDisagree(): void;
};
