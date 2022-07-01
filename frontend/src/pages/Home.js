import React from 'react';
import './css files/home.css';
const Home = () => {
	return (
		<><div className='home_div'>
			<div className='home_div_1'>
				<h1>INTRODUCTION</h1>
				<ul>
					<li>According to “India Giving report 2021” , the average amount of donations went up to 43% in India during the covid pandemic.</li>
					<li>Nearly 72 % Indians donated money last year according to the report. Nearly 1.27 billion rs were donated to PM cares fund <br></br>last year during the pandemic.</li>
					<li>When this much amount of money is being donated, a donor wants to know where their money is being spent at.</li>
					<li>Transparency within a charity scheme has always been a problem. </li>
					<li>	So the idea is to use a blockchain based platform for charity where donors can track where their money is being spent at.</li>
				</ul>
			</div>

			<div className="home_div_2">
				<h1>Why Blockchain?</h1>
				<p>Blockchain is a shared, immutable ledger that facilitates the process of recording <br></br>transactions and tracking assets in a business network.</p>
				<h3>Key elements of Blockchain</h3>
				<p><span>Immutable Records-</span> Can't be edited/deleted</p>
				<p><span>Distributed Ledger- </span> No centralized control. Each block in the network has same rights.</p>
				<p><span>Smart Contracts- </span> Smart contracts are programs stored on a blockchain that are automatically <br></br> executed when predetermined terms and conditions are met.</p>

			</div>

			<div className="home_div_3">
				<div className="float-child_1">
					<div className='green'>
						<h1>Charity System Model</h1>
						<p>Our proposed model has four basic user roles</p>
						<h3>Donor</h3>
						<h3>Beneficiary</h3>
						<h3>Co-operative stores</h3>
						<h3>Charity Organization</h3>
					</div>

				</div>

				<div className="float-child_2">

					<div className="home_div_4_2">
						<h1>features of platform</h1>
						<ul>
							<li>Login and registration page for new users. </li>
							<li> Forget password for existing users. </li>
							<li>On home page, all the information about the platform will be visible </li>
							<li>for new comers about how the platform works and the target of it. </li>
							<li>Anyone can see the raised projects on project window.  </li>
							<li>New projects can be added by all users. </li>
							<li>All the transactions history will be available on platform.  </li>
							<li>One can see the blogs raised by him own and others as well.  </li>
						</ul>
					</div>

				</div>

			</div>

			<div className='home_div_4'>
				<div className='home_div_4_1'>
					<h1> Project Phases</h1>
					<h3>FrontEnd</h3>
					<h3>Backend</h3>
					<h3>Smart Contracts</h3>
					<br /><br />
					<h3>Integeration</h3>
				</div>
				<div className='home_div_4_2'>
					<h1>Technologies Used</h1>
					<ul>
						<li>HTML, CSS and ReactJS for frontend</li>
						<li>MongoDB database for storing user</li>
						<li>Express.js library in backend</li>
						<li>Solidity to build smart contracts. </li>
						<li>Rinkyby test network for deploying smart contracts</li>
						<li>Truffle to provide ethereum development environment. </li>
						<li>Metamask as the digital wallet for users. </li>
						<li>Web3.js library for interacting between react and blockchain </li>
					</ul>
				</div>

			</div>

		</div>











		</>
	)
};

export default Home;
