import React, { Component } from 'react'
import { 
	Navbar, 
	Nav, 
	Image, 
	Button,  
	Form, 
	FormControl, 
	InputGroup,
} from 'react-bootstrap'
import { Link } from "gatsby"
import FontAwesome from 'react-fontawesome'
import Search from "../../components/search"

import logo from '../../images/logo.png'

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			keyword: '',
			sidebarOpen: false,
			sideSearchbarOpen: false,
		};
		this.toggleSidebar = this.toggleSidebar.bind(this);
		this.handleSearchInput = this.handleSearchInput.bind(this);
	}

	toggleSidebar() {
		this.setState({ sidebarOpen: !this.state.sidebarOpen });
	}

	handleSearchInput(e) {
		this.setState({
			keyword: e.target.value,
		})

		if (e.target.value !== '') {
			this.setState({
				sideSearchbarOpen: true
			});
		} else {
			this.setState({
				sideSearchbarOpen: false
			});
		}
	}

	render() {
		const { sidebarOpen, keyword } = this.state;

		const searchIndices = [{ name: `fomox`, title: `Blog Posts` }];

		return (
			<section>
				<Navbar className="border-bottom fixed-top header" collapseOnSelect expand="lg" variant="dark">
					<Search collapse indices={searchIndices} />
					<Navbar.Brand className="d-md-none d-sm-block width-100 m-0">
						<Link className="text-decoration-none" to="/">
							<Image className="logo" fluid src={logo} />
						</Link>
						<FontAwesome className="search" name="search"/>
					</Navbar.Brand>
					<Navbar.Collapse id="responsive-navbar-nav" className="header__navbar">
						<Nav className="header__menu">
							<Form inline>
								<InputGroup>
								<InputGroup.Prepend>
									<InputGroup.Text id="inputGroupPrepend">
										<FontAwesome name="search"/>
									</InputGroup.Text>
								</InputGroup.Prepend>
								<FormControl type="text" placeholder="Explore" className="header__search" value={keyword} onChange={this.handleSearchInput} />
								</InputGroup>
							</Form>
						</Nav>
						<Navbar.Brand className="m-auto">
							<a className="text-decoration-none" rel="noopener noreferrer" target="_blank" href="https://fathership.co">
								<Image className="logo" fluid src={logo} />
							</a>
						</Navbar.Brand>
						<Nav className="header__social">

							<a className="nav-link" rel="noopener noreferrer" target="_blank" href="https://facebook.com/fathershipco">
								<Button variant="dark" size="sm">
									<FontAwesome className="social" name="facebook"/>
								</Button>
							</a>

							<a className="nav-link" rel="noopener noreferrer" target="_blank" href="https://twitter.com/fathershipco">
								<Button variant="dark" size="sm">
									<FontAwesome className="social" name="twitter"/>
								</Button>
							</a>

							<a className="nav-link" rel="noopener noreferrer" target="_blank" href="https://t.me/fathership">
								<Button variant="dark" size="sm">
									<FontAwesome className="social" name="telegram"/>
								</Button>
							</a>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</section>
		);
	}
}

export default Header
