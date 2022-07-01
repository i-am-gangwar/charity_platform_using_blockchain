import React from 'react';
import '../pages/css files/footer.css';
import { FaFacebookF, FaInstagram, FaLinkedin, FaYoutube, FaWhatsapp, FaTwitter } from 'react-icons/fa';
const Footer = () => {
	return (<>
		<div className="footer_outer_div"><footer>
			<div id="left_footer_div">
				<h2>Charity fund tracker</h2>
				<a href="!#"> <FaFacebookF></FaFacebookF></a>
				<a href="!#"><FaLinkedin></FaLinkedin></a>
				<a href="!#"><FaInstagram></FaInstagram></a>
				<a href="!#"><FaTwitter></FaTwitter></a>
				<a href="!#"><FaYoutube></FaYoutube></a>
				<a href="!#"><FaWhatsapp ></FaWhatsapp></a><br />
				<div id="left_footer_down_div">
					<span>For any queries</span><br />
					<span>Email: info@charitygmail.com</span><br />
					<span>Contact No:+919998884444</span>
				</div>
			</div><div>
				<table><tr>
					<th>Causes</th>
					<th>How it works</th>
					<th>About Us</th>
					<th>Support</th>
				</tr>
					<tr><td><a href="!#">Medical crowdfunding</a></td>
						<td><a href="!#">Fundraising for NGOs</a></td>
						<td><a href="!#">Our Partners</a></td>
						<td><a href="!#">Medical Finance</a></td>
					</tr>
					<tr><td><a href="!#">Cancer crowdfunding</a></td>
						<td><a href="!#">Sponsor A Child</a></td>
						<td><a href="!#">Careers</a></td>
						<td><a href="!#">FAQ & Help Center</a></td>
					</tr>
					<tr><td><a href="!#">Education crowdfunding</a></td>
						<td><a href="!#">Fundraising tips</a></td>
						<td><a href="!#">Blog</a></td>
						<td><a href="!#">Trust & Safety</a></td>
					</tr>
					<tr>
						<td><a href="!#">Creative fundraising</a></td>
						<td><a href="!#">Corporates</a></td>
						<td><a href="!#">Success Stories</a></td>
						<td><a href="!#">Plans & pricing</a></td>
					</tr>
					<tr>
						<td><a href="!#">Child welfare</a></td>
						<td><a href="!#">What is Crowdfunding?</a></td>
						<td><a href="!#">Contact Us</a></td>
						<td></td>
					</tr>
					<tr>
						<td><a href="!#">Others fundraisers</a></td>
						<td><a href="!#">about stores</a></td>
						<td></td>
						<td></td>
					</tr>
				</table>
			</div><div id="footer_botttom_div">
				<hr></hr>
				<h5>Copyright © 2022 Charity fund tracker Pvt Ltd. All Rights Reserved.Terms of Use |Privacy Policy |
					AML Policy |Use of cookies</h5>
			</div></footer></div>
	</>
	)
}

export default Footer
