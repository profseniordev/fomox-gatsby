import React, { Component } from 'react'
import Main from '../templates/master'
import Posts from '../components/posts'
import Tags from '../components/posts/tags'
import FeaturedPosts from '../components/posts/featured'
import Latest from '../components/posts/latest'
import { Row, Col, Button } from 'react-bootstrap'
import { graphql, Link } from 'gatsby'

class Index extends Component {
  render() {
  	const { allPosts, featuredPosts, latestPosts, allAirtable } = this.props.data
    const { previousPagePath, nextPagePath } = this.props.pageContext
    console.log(previousPagePath);
    // Paginate
    var nextPage = <Link to={nextPagePath} className="pull-right"><Button variant="outline-light">Next</Button></Link>
    if (nextPagePath === '') {
        nextPage = <Link to={nextPagePath} className="pull-right"><Button variant="outline-light">Home</Button></Link>
    }

    var previousPage = ''
    if (previousPagePath !== '') {
        previousPage = <Link to={previousPagePath} className="pull-left">
            <Button variant="outline-light">Previous</Button>
        </Link>
    }

    return (
        <Main>
	        <Row className="full__height">
	            <Col md={3} className="left__sidebar d-none d-md-block">
	                <Tags tags={allAirtable.group} />
	                <FeaturedPosts posts={featuredPosts.nodes}/>
	            </Col>
	            <Col md={6} className="main__section">
	                <Posts posts={allPosts.nodes}/>
                    <div className="paginate">
                        {previousPage}
                        {nextPage}
                    </div>
	            </Col>
	            <Col md={3} className="right__sidebar d-none d-md-block">
	            	<Latest posts={latestPosts.nodes}/>
	            </Col>
	        </Row>
        </Main>
    );
  }
}

export default Index;


export const query = graphql`
query HomePageQuery($limit: Int, $skip: Int) {
    site {
        siteMetadata {
            title
            description
        }
    }
    allAirtable {
        group(field: data___tags) {
            fieldValue
            totalCount
        }
    }
    allPosts: allAirtable(
        limit: $limit
        skip: $skip
    )  {
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
    featuredPosts: allAirtable(
        limit: 99
        sort: {order: DESC, fields: data___date}
        filter: {data: {tags: {in: ["中文"]}}}
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
        group(field: data___tags) {
            fieldValue
            totalCount
        }
    }
    latestPosts: allAirtable(
        sort: {order: DESC, fields: data___date}
        filter: {data: {tags: {in: ["singapore", "malaysia", "china"]}}}
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
        group(field: data___tags) {
            fieldValue
            totalCount
        }
    }
}

`
