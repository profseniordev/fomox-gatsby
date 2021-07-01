import React, { Component } from "react";
import { Image } from "react-bootstrap";
import { Link } from "gatsby";
import { Row, Col } from "react-bootstrap";
import defaultimg from "../../images/hjo.jpg";
import Emoji from "a11y-react-emoji";

class Related extends Component {
  render() {
    const { posts, share } = this.props;
    let relatedPosts = [];
    for (var i = 0; i <= posts.length - 1; i++) {
      let image;
      if (posts[i].data.image !== null) {
        image = posts[i].data.image[0].url;
      } else {
        image = defaultimg;
      }
      relatedPosts.push(
        <Col md={12} className="mb-3" key={i}>
          <div className="post">
            <div className="post-single post-first">
              <Row>
                <Col md={{ offset: 1, span: 10 }}>
                  <a
                    className="source"
                    href={posts[i].data.url}
                    rel="noopener noreferrer nofollow"
                    target="_blank"
                  >
                    {" "}
                    <p
                      className="badge"
                      dangerouslySetInnerHTML={{
                        __html: posts[i].data.categorisation,
                      }}
                    />{" "}
                  </a>
                  <h1 className="post-title">{posts[i].data.title}</h1>
                  <small className="post-publisher pull-left">
                    {posts[i].data.date} |{" "}
                    <Emoji symbol="🚀" label="Fathership" /> <b>Fathership</b>
                  </small>
                  {share}
                </Col>
                <Col md={12}>
                  <div className="post-image">
                    <Image fluid src={image} />
                  </div>
                </Col>
                <Col md={{ offset: 1, span: 10 }}>
                  <p>
                    <small className="post-author pull-left">
                      <a
                        href={posts[i].data.url}
                        rel="noopener noreferrer nofollow"
                        target="_blank"
                      >
                        <p
                          dangerouslySetInnerHTML={{
                            __html: posts[i].data.author,
                          }}
                        />
                      </a>
                    </small>
                  </p>
                </Col>
                <Col className="line" md={{ offset: 1, span: 10 }}>
                  <div
                    className="post-body"
                    dangerouslySetInnerHTML={{
                      __html: `<div> ${posts[i].data.body} </div>`,
                    }}
                  />
                  <a
                    className="post-footer pull-left"
                    href={posts[i].data.url}
                    rel="noopener noreferrer nofollow"
                    target="_blank"
                  ></a>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      );
    }
    return (
      <div className="related__post">
        <Row>{relatedPosts}</Row>
      </div>
    );
  }
}

export default Related;