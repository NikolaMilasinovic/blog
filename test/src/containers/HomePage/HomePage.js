import React from "react";
import Slider from "react-slick";
import HomePageStyle from './style';
import HomePageHeading from "../../components/homePageHeading";
import HomePageSecondSection from "../../components/homePageSecondSection";

const HomePage = () => {
	return(
		<HomePageStyle>
			<HomePageHeading/>
			<HomePageSecondSection/>
	    </HomePageStyle>
	)
}

export default HomePage;


 
