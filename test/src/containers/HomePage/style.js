import styled from "styled-components";

export default styled.div`
	width: 90%;
	@media(max-width:480px){
		width: 95%;
	}
	margin: 0 auto;
	min-height: 400px;
	margin-bottom: 50px;
	.screen1{
		min-height: 400px;
		position:relative;
		width: 100%;
		background-image: linear-gradient(
	      to right bottom,
	      rgba(0, 0, 0, 0.5),
	      rgba(0, 0, 0, 0.5)
	    ),
    	url(https://images.unsplash.com/photo-1513222022162-53e2036ceb5a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80);
	    background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		.content1{
			width:80%;
			position:absolute;
			top:50%;
			left:50%;
			transform:translate(-50%,-45%);
			padding:20px;
			text-align:center;
			p{
				font-size: 25px;
				margin-bottom:20px;
				font-weight:bold;
				color:white;
			}
			.btn{
				border:none;
				outline:none;
				padding: 10px 30px;
				color:white;
				font-weight:bold;
				background-color:rgba(255,255,255, 0.3);
				border-radius: 20px;
				border:2px solid white;
				font-size: 18px;
				cursor:pointer;
			}
		}
	}
	.screen2{
		min-height: 400px;
		position:relative;
		width: 100%;
		background-image: linear-gradient(
	      to right bottom,
	      rgba(0, 0, 0, 0.5),
	      rgba(0, 0, 0, 0.5)
	    ),
		url(https://images.unsplash.com/photo-1549540951-dc3f59581f6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80);
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		.content2{
			width:80%;
			position:absolute;
			top:50%;
			left:50%;
			transform:translate(-50%,-45%);
			padding:20px;
			text-align:center;
			p{
				font-size: 25px;
				margin-bottom:20px;
				font-weight:bold;
				color:white;
			}
			.btn{
				border:none;
				outline:none;
				padding: 10px 30px;
				color:white;
				font-weight:bold;
				background-color:rgba(255,255,255, 0.3);
				border-radius: 20px;
				border:2px solid white;
				font-size: 18px;
				cursor:pointer;
			}
		}
	}
	.screen3{
		min-height: 400px;
		position:relative;
		width: 100%;
		background-image: linear-gradient(
	      to right bottom,
	      rgba(0, 0, 0, 0.5),
	      rgba(0, 0, 0, 0.5)
	    ),
	    url(https://images.unsplash.com/photo-1554977929-0ed5ce8f1509?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80);
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		.content3{
			width:80%;
			position:absolute;
			top:50%;
			left:50%;
			transform:translate(-50%,-45%);
			padding:20px;
			text-align:center;
			p{
				font-size: 25px;
				margin-bottom:20px;
				font-weight:bold;
				color:white;
			}
			.btn{
				border:none;
				outline:none;
				padding: 10px 30px;
				color:white;
				font-weight:bold;
				background-color:rgba(255,255,255, 0.3);
				border-radius: 20px;
				border:2px solid white;
				font-size: 18px;
				cursor:pointer;
			}
		}
	}

	.secondSection{
		margin-top: 40px;
	}
`;