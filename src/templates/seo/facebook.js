import PropTypes from 'prop-types'
import React from 'react'
import { Helmet } from 'react-helmet'

const Facebook = ({ url, name, type, title, slug, description, image }) => (
  <Helmet>
    {name && <meta property="og:site_name" content={name} />}
    <meta property="og:locale" content="en_SG" />
    <meta property="og:url" content={slug} />
    <meta property="og:type" content={type} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
  </Helmet>
)

export default Facebook

Facebook.propTypes = {
  // url: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  // locale: PropTypes.string.isRequired,
  type: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  name: PropTypes.string,
}

Facebook.defaultProps = {
  type: 'article',
  name: null,
}
