export class NumberUtils {
	number: number;

	constructor(num: number) {
		this.number = num;
	}

	NumberUtils() {
	}

	formatMoney() {
		return new Intl.NumberFormat("en-GB", { style: "currency", currency: "USD" }).format(this.number);
	}
}
