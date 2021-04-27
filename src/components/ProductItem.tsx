import {
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	makeStyles,
	Typography,
} from "@material-ui/core";
import React, { PropsWithChildren } from "react";
import { useHistory } from "react-router";
import { Product } from "../models/Product";
import { NumberUtils } from "../utils/NumberUtils";

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
	},
	media: {
		height: 370,
	},
});

export default function ProductItem(props: PropsWithChildren<Props>) {
	const classes = useStyles();
	const { product } = props;
	const history = useHistory();

	return (
		<div>
			<Card className={classes.root}>
				<CardActionArea
					onClick={(e) => {
                        e.stopPropagation();
						history.push(`/product/${props.product.id}`);
					}}
				>
					<CardMedia
						className={classes.media}
						image={product.images[0]}
						title={product.name.split(" ").join("-").toLowerCase()}
					/>
					<CardContent>
						<Typography gutterBottom>{product.name}</Typography>
						<Typography variant="body1" color="textSecondary">
							{new NumberUtils(product.price).formatMoney()}
						</Typography>
					</CardContent>
				</CardActionArea>
				{/* <CardActions>
					<Button size="small" color="primary">
						Share
					</Button>
					<Button size="small" color="primary">
						Learn More
					</Button>
				</CardActions> */}
			</Card>
		</div>
	);
}

type Props = {
	product: Product;
};
