import React, { Component } from 'react'
import Posts from '../components/posts'
import { StaticQuery, graphql } from 'gatsby'

class Search extends Component {
	render() {
		const { query } = this.props
		return (
			<div>
				<h6>Search result for: <strong>{query}</strong></h6>
			</div>
		);
	}
}

export default Search;