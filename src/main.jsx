import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Navber from "./components/Navber/Navber.jsx";
createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<Navber />
		<App />
	</BrowserRouter>
);
