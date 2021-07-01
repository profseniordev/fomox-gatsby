import React, { Component } from 'react'
import { Image } from 'react-bootstrap'
import { Link } from 'gatsby'
import FontAwesome from 'react-fontawesome'
import defaultimg from "../../images/hjo.jpg"
import { Button } from 'react-bootstrap'

class Latest extends Component {
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
		per_page = 8,
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
		let popularPosts = []
		for (var i = 0; i <= posts.length-1; i++) {
			let image
			if (posts[i].data.image !== null) {
				image = posts[i].data.image[0].url
			} else {
				image = defaultimg
			}
			popularPosts.push(
				<div className="latest__post-single" key={i}>
					<Link className="latest__post-title" to={posts[i].data.slug}>
						<div className="latest__post-image">
							<Image fluid src={image} />
						</div>
						{posts[i].data.title}
					</Link>
				</div>
			);
		}
		return (
			<div className="latest__post">
				<div className="latest__post-heading d-flex justify-content-between align-items-center">
					<div>
						<FontAwesome name="globe"/> World
					</div>
					<div>
						{ prev !== null ? <Button variant="outline-light" onClick={this.paginate.bind(allPosts, prev)}><FontAwesome name="chevron-left"/></Button> : <Button variant="outline-light" onClick={this.paginate.bind(allPosts, prev)} disabled><FontAwesome name="chevron-left"/></Button> }
						
						{ next !== null ? <Button variant="outline-light" onClick={this.paginate.bind(allPosts, next)}><FontAwesome name="chevron-right"/></Button> : <Button variant="outline-light" onClick={this.paginate.bind(allPosts, next)} disabled><FontAwesome name="chevron-right"/></Button> }
					</div>
				</div>
				{popularPosts}
			</div>
		);
	}
}

export default Latest