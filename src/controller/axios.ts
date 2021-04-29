import axios from "axios";

axios.create({
	baseURL: "http://localhost:3002"
})

axios.interceptors.request.use(
	function (config) {
		const token = localStorage.getItem("jwt");
		config.headers.Authorization = token ? `Bearer ${token}` : null;
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

export default axios;
