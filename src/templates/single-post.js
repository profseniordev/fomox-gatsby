import React, { useState, useEffect } from "react";
import Main from "./master";
import Single from "../components/posts/single";
import Related from "../components/posts/related";
import Tags from "../components/posts/tags";
import FeaturedPosts from "../components/posts/featured";
import Latest from "../components/posts/latest";
import Share from "../components/posts/share";
import { Row, Col, Button } from "react-bootstrap";
import { graphql, Link } from "gatsby";
import SEO from "./seo/seo";

function Post(props) {
  const {
    allPosts,
    relatedPosts,
    site,
    featuredPosts,
    latestPosts,
  } = props.data;
  const { data } = props.data.airtable;
  const { title, tags } = data;
  const { twitterHandle } = site.siteMetadata;
  const url = site.siteMetadata.siteUrl;
  const { next, prev } = props.pageContext;

  let slug = props.path;
  // Post Share
  let share = (
    <Share
      socialConfig={{ twitterHandle, config: { url: `${url}${slug}`, title } }}
      tags={tags}
    />
  );

  // Post navigation
  let prevLink;
  let nextLink;
  if (prev !== null) {
    prevLink = (
      <Link to={prev.slug} className="next pull-left">
        <Button variant="outline-secondary">Previous</Button>
      </Link>
    );
  }
  if (next !== null) {
    nextLink = (
      <Link to={next.slug} className="next pull-right">
        <Button variant="outline-secondary">Next</Button>
      </Link>
    );
  }

  const [hasMore, setMore] = useState(relatedPosts.nodes.length > 1);
  const [currentRelatedPosts, addToList] = useState([
    ...relatedPosts.nodes.slice(0, 1),
  ]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [hasMore, currentRelatedPosts]);

  const handleScroll = () => {
    if (!hasMore) return;
    if (
      window &&
      window.innerHeight + document.documentElement.scrollTop + 50 >=
        document.documentElement.offsetHeight
    ) {
      loadRelatedPosts();
    }
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    handleScroll();
  };

  const loadRelatedPosts = () => {
    const currentRelatedPostsLength = currentRelatedPosts.length;
    const more = currentRelatedPostsLength < relatedPosts.nodes.length;
    const nextEdges = more
      ? relatedPosts.nodes.slice(
          currentRelatedPostsLength,
          currentRelatedPostsLength + 1
        )
      : [];
    setMore(more);
    addToList([...currentRelatedPosts, ...nextEdges]);
  };

  return (
    <Main>
      <SEO
        title={data.title}
        excerpt={data.excerpt}
        canonical={data.slug}
        datetime={data.datetime}
        //tags={data.tags}
        slug={data.slug}
        image={data.image ? data.image[0].url : undefined}
      />
      <Row className="full__height">
        <Col md={3} className="left__sidebar d-none d-md-block">
          <Tags tags={allPosts.group} />
          <FeaturedPosts posts={featuredPosts.nodes} />
        </Col>
        <Col md={6} className="main__section">
          <Single
            title={data.title}
            date={data.date}
            author={data.author}
            photo={data.image}
            excerpt={data.excerpt}
            body={data.body}
            share={share}
            url={data.url}
            cat={data.categorisation}
          />
          <Row>
            <Col>
              {/* <div className="post-navigation">
                {prevLink}
                {nextLink}
              </div> */}
              <div className="clearfix"></div>
              <div className="post-related">
                <Related posts={currentRelatedPosts} share={share}/>
              </div>
            </Col>
          </Row>
        </Col>
        <Col md={3} className="right__sidebar d-none d-md-block">
          <Latest posts={latestPosts.nodes} />
        </Col>
      </Row>
    </Main>
  );
}

export default Post;

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        description
        image
        title
        twitterHandle
        siteUrl
      }
    }
    featuredPosts: allAirtable(
      limit: 99
      sort: { order: DESC, fields: data___date }
      filter: {
        data: {
          tags: { in: ["中文"] }
        }
      }
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
          categorisation
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
      sort: { order: DESC, fields: data___date }
      filter: { data: { tags: { in: ["singapore", "malaysia", "china"] } } }
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
    relatedPosts: allAirtable(
      sort: { fields: [data___date], order: DESC }
      filter: { data: { tags: { in: ["digest"] }, slug: { ne: $slug } } }
    ) {
      nodes {
        data {
          title
          excerpt
          body
          date(formatString: "MMM DD, YYYY")
          datetime
          author
          url
          categorisation
          tags
          slug
          image {
            url
          }
        }
      }
    }
    airtable(data: { slug: { eq: $slug } }) {
      data {
        title
        excerpt
        body
        date(formatString: "MMM DD, YYYY")
        datetime
        author
        url
        categorisation
        tags
        slug
        image {
          url
        }
      }
    }
  }
`;
