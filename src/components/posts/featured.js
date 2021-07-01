import React, { Component } from 'react'
import { Link } from 'gatsby'
import FontAwesome from 'react-fontawesome'
import { Button } from 'react-bootstrap'

class Featured extends Component {
	constructor(props) {
		super(props)
		this.state = {
			allPosts: this.props.posts,
			posts: [],
			next: '',
			prev: '',
		}
		this.paginate = this.paginate.bind(this)
	}

	componentDidMount() {
		this.paginate(1)
	}

	paginate(page) {
		var items = this.state.allPosts,
		page = page || 1,
		per_page = 20,
		offset = (page - 1) * per_page,

		paginatedItems = items.slice(offset).slice(0, per_page),
		total_pages = Math.ceil(items.length / per_page);
		this.setState({
			posts: paginatedItems,
			next: (total_pages > page) ? page + 1 : null,
			prev: page - 1 ? page - 1 : null,
		})
	}

	render() {
		const { allPosts, posts, next, prev } = this.state
		const featuredPosts = posts.map((item, index) =>
			<div className="featured__post-single" key={index}>
				<Link className="featured__post-title" to={item.data.slug}>{item.data.title}</Link>
			</div>
		);
		return (
			<div className="featured__post">
				<div className="featured__post-heading d-flex justify-content-between align-items-center">
					<div>
						<FontAwesome name="fire"/> 中文 
					</div>

					<div>
						{ prev !== null ? <Button variant="outline-light" onClick={this.paginate.bind(allPosts, prev)}><FontAwesome name="chevron-left"/></Button> : <Button variant="outline-light" onClick={this.paginate.bind(allPosts, prev)} disabled><FontAwesome name="chevron-left"/></Button> }
						
						{ next !== null ? <Button variant="outline-light" onClick={this.paginate.bind(allPosts, next)}><FontAwesome name="chevron-right"/></Button> : <Button variant="outline-light" onClick={this.paginate.bind(allPosts, next)} disabled><FontAwesome name="chevron-right"/></Button> }
					</div>
				</div>
				{featuredPosts}
			</div>
		);
	}
}

export default Featured