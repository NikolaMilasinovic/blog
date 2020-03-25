import styled from "styled-components";

export default styled.div`
	display:flex;
	justify-content: space-between;
	align-items: center;
	width: 90%;
	@media(max-width:480px){
		width: 95%;
	}
	margin: 0 auto;
	.logo{
		img{
			@media(max-width:480px){
				height: 35px;
			}
			height: 50px;
		}
	}
	.navigation{
		@media(max-width:480px){
			font-size: 7px;
		}
		display: flex;
		.blog,.productReview{
			margin-right: 15px;
		}
		h2{
			font-weight:normal;
			cursor:pointer;
		}
	}
`;