import React, { Component } from 'react'
import { Link } from 'gatsby'
import FontAwesome from 'react-fontawesome'
import 'font-awesome/css/font-awesome.css'

class Footer extends Component {
	render() {
		return (
			<footer className="d-sm-block d-md-none">
				<nav className="footer nav nav-pills nav-justified fixed-bottom">
					<Link className="nav-item nav-link" to="/">
						<FontAwesome name="bolt" size="2x" />
					    <br/>
						Latest
					</Link>
					<Link className="nav-item nav-link" to="/tags/singapore/">
						<FontAwesome name="adjust" size="2x" />
					    <br/>
						Singapore
					</Link>
					<Link className="nav-item nav-link" to="/tags/world/">
						<FontAwesome name="globe" size="2x" />
					    <br/>
						World
					</Link>
					<a className="nav-item nav-link" rel="noopener noreferrer" target="_blank" href="https://t.me/fathership">
						<FontAwesome name="telegram" size="2x" />
					    <br/>
						Telegram
					</a>
					<a className="nav-item nav-link" rel="noopener noreferrer" target="_blank" href="https://facebook.com/fathershipco">
						<FontAwesome name="facebook" size="2x" />
					    <br/>
						Facebook
					</a>
				</nav>
			</footer>
		);
	}
}

export default Footer