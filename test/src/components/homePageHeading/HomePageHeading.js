import React from "react";
import Slider from "react-slick";

const HomePageHeading = () => {
	const settings = {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      pauseOnHover: true,
      arows:false
    }
	return(
		<Slider {...settings}>
		    <div className="screen1">
			    <div className="content1">
			    	<p>Learn about the benefits of various yoga poses, sequences and flows that will help you achieve your fitness goals.</p>
			    	<button className="btn">Blog</button>
			    </div>
		    </div>
		    <div className="screen2">
		    	<div className="content2">
			    	<p>Find out best yoga products for you by leveraging our experience in reviewing products.</p>
			    	<button className="btn">Product rewievs</button>
			    </div>
		    </div>
		    <div className="screen3">
		    	<div className="content3">
			    	<p>Check out the best products to support your yoga journey.</p>
			    	<button className="btn">Products</button>
			    </div>
		    </div>
      	</Slider>
	)
}

export default HomePageHeading;


 
