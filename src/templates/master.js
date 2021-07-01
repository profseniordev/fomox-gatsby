import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import Header from './partials/header'
import Footer from './partials/footer'
import SEO from './seo/seo'

import '../styles/app.scss'

class Master extends Component {
    render() {
        return (
            <section>
                <SEO title="Fathership.co — News, simplified 🚀" />
                <Container className="main__content">
                    <Header/>
                        {this.props.children}
                    <Footer/>
                </Container>
            </section>
        );
    }
}

export default Master;
