import React from "react";
import HeaderStyle from "./style";

const Header = () => {
	return(
		<HeaderStyle>
			<div className="logo">
				<img src="images/logo.png"/>
			</div>
			<div className="navigation">
				<h2 className="blog">Blog</h2>
				<h2 className="productReview">Product reviews</h2>
				<h2 className="products">Products</h2>
			</div>
		</HeaderStyle>
	)
}

export default Header;