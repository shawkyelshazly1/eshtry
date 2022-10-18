import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserNavigation from "./components/UserNavigation";
import Home from "./pages/Home";
import PrivateRouter from "./pages/PrivateRouter";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Users from "./pages/Users";
import Admins from "./pages/Admins";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "react-query";
// set react-query client
const queryClient = new QueryClient();
export default function RoutesProvider() {
	return (
		<Router>
			<div className="w-full h-screen relative ">
				<Routes>
					<Route
						path="*"
						element={
							<>
								<QueryClientProvider client={queryClient} contextSharing={true}>
									<PrivateRouter>
										<div className=" w-full h-full flex-row flex gap-6">
											<Navbar />
											<div className="flex-1 flex">
												<UserNavigation />
												<Routes>
													<Route path="/" element={<Home />} />
													<Route path="/orders" element={<Orders />} />
													<Route path="/products" element={<Products />} />
													<Route path="/categories" element={<Categories />} />
													<Route path="/admins" element={<Admins />} />
													<Route path="/users" element={<Users />} />
												</Routes>
											</div>
										</div>
									</PrivateRouter>
								</QueryClientProvider>{" "}
								{/* <ReactQueryDevtools initialIsOpen={false} /> */}
							</>
						}
					/>
				</Routes>
			</div>
		</Router>
	);
}
