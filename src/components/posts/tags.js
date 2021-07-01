import kebabCase from "lodash/kebabCase"

import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'gatsby'
import FontAwesome from 'react-fontawesome'

class Tags extends Component {

	render() {
		const { tags } = this.props
		let allTags = []
		// Pushing all tags into allTags array
		for (var i = 0; i <= tags.length-1; i++) {
			allTags.push(<Link key={i} to={`/tags/${kebabCase(tags[i].fieldValue)}/`}><Button variant="outline-light" size="sm" className="mr-2 mb-2">{tags[i].fieldValue} </Button></Link>)
		}
		
		return (
			<div className="latest__tag">
				<div className="latest__tag-heading">
					<FontAwesome name="tags" /> Tags
				</div>
					{allTags}
			</div>
		);
	}
}


export default Tags