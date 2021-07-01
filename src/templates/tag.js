import React, { Component } from 'react'
import Main from '../templates/master'
import Posts from '../components/posts'
import Tags from '../components/posts/tags'
import FeaturedPosts from '../components/posts/featured'
import Latest from '../components/posts/latest'
import { Row, Col } from 'react-bootstrap'
import { graphql } from 'gatsby'

class Tag extends Component {
  render() {
  	const { tagPosts, allPosts } = this.props.data
    return (
        <Main>
	        <Row className="full__height">
	            <Col md={3} className="left__sidebar d-none d-md-block">
	                <Tags tags={allPosts.group} />
	                <FeaturedPosts posts={allPosts.nodes}/>
	            </Col>
	            <Col md={6} className="main__section">
	                <Posts posts={tagPosts.nodes}/>
	            </Col>
	            <Col md={3} className="right__sidebar d-none d-md-block">
	            	<Latest posts={allPosts.nodes}/>
	            </Col>
	        </Row>
        </Main>
    );
  }
}

export default Tag;

export const query = graphql`
    query($tag: String) {
        tagPosts: allAirtable(
            limit: 99
            sort: { fields: [data___date], order: DESC }
            filter: { data: { tags: { in: [$tag] } } }
        ) {
            nodes {
                data {
                    title
                    excerpt
                    body
                    author
                    url
                    tags
                    slug
                    image {
                        url
                    }
                }
            }
        }
        allPosts: allAirtable {
            nodes {
                data {
                    title
                    excerpt
                    body
                    author
                    url
                    tags
                    slug
                    image {
                        url
                    }
                }
            }
            group(field: data___tags) {
                fieldValue
                totalCount
            }
        }
	}
`