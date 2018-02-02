import * as React from 'react'
import { Emoji } from '../types'
import Tooltip from './Tooltip'

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
					<Tooltip values={[
						['Description', emoji.description],
						['Category', emoji.category],
						['Also known as', emoji.aliases.join(', '), emoji.aliases.length > 0],
						['Tags', emoji.tags.join(', '), emoji.tags.length > 0]
					]} />
				)}
			</div>
		)
	}

}

export default EmojiButton
