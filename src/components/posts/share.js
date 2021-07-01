import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'

import {
	FacebookShareButton,
	WhatsappShareButton,
	TelegramShareButton,
	RedditShareButton,
} from 'react-share';

class Share extends Component {
	render() {
		const { socialConfig } = this.props

		return (
			<div className="post-social">
				<FacebookShareButton url={socialConfig.config.url} className="button is-outlined is-rounded facebook" >
					<span className="icon">
						<FontAwesome name='facebook' />
					</span>
				</FacebookShareButton>
				<WhatsappShareButton url={socialConfig.config.url} className="button is-outlined is-rounded reddit" title={socialConfig.config.title} >
					<span className="icon">
						<FontAwesome name='whatsapp' />
					</span>
				</WhatsappShareButton>
				<TelegramShareButton url={socialConfig.config.url} className="button is-outlined is-rounded whatsapp" title={socialConfig.config.title} >
					<span className="icon">
						<FontAwesome name='telegram' />
					</span>
				</TelegramShareButton>
				<RedditShareButton url={socialConfig.config.url} className="button is-outlined is-rounded reddit" title={socialConfig.config.title} >
					<span className="icon">
						<FontAwesome name='reddit' />
					</span>
				</RedditShareButton>
			</div>
		);
	}
}

export default Share