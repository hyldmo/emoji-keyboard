import * as React from 'react'
import { Emoji } from '../types'

import '../styles/emoji.css'

type Props = {
	emoji: Emoji
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

type State = {
	hover: boolean
}

class EmojiButton extends React.Component<Props, State> {
	state = {
		hover: false
	}

	render () {
		const { emoji, onClick } = this.props
		const { hover } = this.state
		return (
			<div className="emojicontainer">
				<button className="emoji" onClick={onClick}
					onMouseOver={() => this.setState({ hover: true })}
					onMouseLeave={() => this.setState({ hover: false })}
				>
					{emoji.emoji}
				</button>
				{hover && (
					<ul className="tooltip">
						<li>
							<strong>Category: </strong><span>{emoji.category}</span>
						</li>
						<li>
							<strong>Description: </strong><span>{emoji.description}</span>
						</li>
						{emoji.aliases.length > 0 &&
						<li>
							<strong>Also known as: </strong><span>{emoji.aliases.join(', ')}</span>
						</li>
						}
						{emoji.tags.length > 0 &&
						<li>
							<strong>Tags: </strong><span>{emoji.tags.join(', ')}</span>
						</li>
						}
					</ul>
				)}
			</div>
		)
	}

}

export default EmojiButton
