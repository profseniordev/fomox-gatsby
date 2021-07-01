import React, { Component } from 'react'
import { Image, Row, Col } from 'react-bootstrap'
import { Link } from "gatsby"
import defaultimg from "../../images/hjo.jpg"
class Posts extends Component {

	render() {
		const { posts } = this.props
		let allPosts = []
		for (var i = 0; i <= posts.length-1; i++) {
			let image
			if (posts[i].data.image !== null) {
				image = posts[i].data.image[0].url
			} else {
				image = defaultimg
			}
			allPosts.push(<Post 
				slug={posts[i].data.slug} 
				title={posts[i].data.title} 
				date={posts[i].data.date}     
                author={posts[i].data.author} 
				photo={image} 
				excerpt={posts[i].data.excerpt} 
				key={i} 
				id={i}
			/>);
		}
		return (
			<div className="single__post">
				{allPosts}
			</div>
		);
	}
}

class Post extends Component {
	render() {
		const { id, title, excerpt, slug, photo } = this.props
		if (id !== 0) {
			return (
				<div className="single__post-single">
					<Row>
						<Col md={3} className="order-md-last single__post-image">
							<Link to={slug}><Image fluid src={photo} /></Link>
						</Col>
						<Col md={9}>
							<Link to={slug} className="single__post-title">{title}</Link>
							<p className="single__post-description">{excerpt}</p>
						</Col>
					</Row>
				</div>
			)
		} else {
			return (
				<div className="single__post-single single__post-first">
					<Row>
						<Col md={12} className="single__post-image">
							<Link to={slug}><Image fluid src={photo} /></Link>
						</Col>
						<Col md={12}>
							<Link to={slug} className="single__post-title">{title}</Link>
							<p className="single__post-description">{excerpt}</p>
						</Col>
					</Row>
				</div>
			)
		}
	}
}

export default Posts