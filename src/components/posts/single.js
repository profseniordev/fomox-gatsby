import React, { Component } from 'react'
import { Image, Row, Col } from 'react-bootstrap'
import defaultimg from "../../images/hjo.jpg"
import Emoji from 'a11y-react-emoji'

class Single extends Component {

	render() {
		const { title, date, body, photo, cat, ori, author, url, share } = this.props
		let image;
		if (photo !== null) {
			image = photo[0].url
		} else {
			image = defaultimg
		}
		return (
			<div className="post">
				<div className="post-single post-first">
					<Row>
						<Col md={{ offset: 1, span: 10 }}>
						<p className="badge" dangerouslySetInnerHTML={{ __html: cat }} />
						<a className="source pull-right" href={url} rel="noopener noreferrer nofollow" target="_blank"> <p dangerouslySetInnerHTML={{ __html: ori }} /> </a>
							<h1 className="post-title">{title}</h1>
							<small className="post-publisher pull-left">{date} | <Emoji symbol="🚀" label="Fathership" /> <b>Fathership</b></small>
							{share}
						</Col>
						<Col md={12}>
							<div className="post-image">
								<Image fluid src={image} />
							</div>
						</Col>
						<Col md={{ offset: 1, span: 10 }}>
							<p><small className="post-author pull-left"><a  href={url} rel="noopener noreferrer nofollow" target="_blank"><p dangerouslySetInnerHTML={{ __html: author }} /></a></small></p>
						</Col>
						<Col className="line" md={{ offset: 1, span: 10 }}>
						{/* <p className="post-body" dangerouslySetInnerHTML={{ __html: body }} /> */}
						<div className="post-body" dangerouslySetInnerHTML={{ __html: `<div> ${body} </div>` }} />
						<a className="post-footer pull-left" href={url} rel="noopener noreferrer nofollow" target="_blank"> <p dangerouslySetInnerHTML={{ __html: ori }} /> </a>
						</Col>	
					</Row>
				</div>	
			</div>
		);
	}
}

export default Single

