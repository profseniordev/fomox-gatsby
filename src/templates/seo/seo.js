import React from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import Facebook from "./facebook";
import Twitter from "./twitter";

const SEO = ({ title, excerpt, image, author, slug, tags, datetime }) => {
  const { site } = useStaticQuery(query);

  const {
    siteMetadata: {
      siteUrl,
      defaultTitle,
      description,
      publisher,
      siteLanguage,
      twitterHandle,
      facebook,
    },
  } = site;
  const seo = {
    title: title || defaultTitle,
    description: excerpt || description,
    publisher: publisher,
    author: author || publisher,
    tags: tags,
    datetime: datetime,
    slug: slug || "",
    image: image || siteUrl+site.siteMetadata.image, // when it is loading first time, siteMetaData will be used as default image
  };

  return (
    <>
      <Helmet title={seo.title} >
        <html lang={siteLanguage} />
        <meta name="description" content={seo.description} />
        <meta name="publisher" content={publisher} />
        <meta name="robots" content="index, follow" />
        <meta property="article:published_time" content={seo.datetime} />
        <meta property="article:author" content={publisher} />
        <meta property="article:tags" content={seo.tags} />
      </Helmet>
      <Facebook
        description={seo.description}
        title={seo.title}
        slug={`${siteUrl}${seo.slug}`}
        date={seo.datetime}
        name={facebook}
        image={seo.image}
      />
      <Twitter
        title={seo.title}
        image={seo.image}
        description={seo.description}
        username={twitterHandle}
      />
    </>
  );
};

export default SEO;

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

SEO.defaultProps = {
  title: null,
  description: null,
};

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        title
        description
        image
        twitterHandle
        siteUrl
        publisher
        siteLanguage
      }
    }
    allAirtable {
      nodes {
        data {
          author
          excerpt
          slug
          datetime
          title
        }
      }
    }
  }
`;
