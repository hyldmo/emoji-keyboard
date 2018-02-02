import * as React from 'react'
import { hot } from 'react-hot-loader'
import { Emoji, Favorite, Save } from '../types'
import { filterEmoji, load, save } from '../utils'
import EmojiButton from './Emoji'
import Footer from './Footer'
const copy: (s: string) => void = require('copy-text-to-clipboard')

import '../styles/app.css'

type State = {
	query: string
	emoji: Emoji[]
	saveState: Save
}

class App extends React.Component<{}, State> {
	constructor (props: any) {
		super(props)
		const saveState = load()
		this.state = {
			query: '',
			emoji: [],
			saveState
		}
	}

	async componentDidMount () {
		const res = await fetch('https://raw.githubusercontent.com/github/gemoji/master/db/emoji.json')
		const emoji: Emoji[] = await res.json()
		this.setState({
			emoji: emoji
				.filter(e => e.emoji !== undefined)
				.map((e, i) =>  ({ ...e, id: i }))
		})
	}

	handleEmojiClick (emoji: Emoji) {
		const { saveState } = this.state
		copy(emoji.emoji)
		const fav = saveState.favorites[emoji.id]
		const newEmoji = fav || { ...emoji, used: 0 }
		newEmoji.used += 1
		saveState.favorites[emoji.id] = newEmoji
		save(saveState)
		this.setState({ saveState, query: '' })
	}

	render () {
		const { query, saveState } = this.state
		const emojis = this.state.emoji.filter(e => filterEmoji(e, query))
		const favorites = Object
			.values(saveState.favorites)
			.map(a => a as Favorite)
			.sort((a, b) => b.used - a.used)
			.slice(0, 32)

		const categories = emojis
			.map(e => e.category)
			.filter((value, index, self) => self.indexOf(value) === index)
		return (
			<>
				<main>
					<h1 className="title">Emoji Keyboard</h1>
					<div>
						<input 
							placeholder="Search emojis (and click to copy)"
							onChange={e => this.setState({ query: e.target.value })} value={query} 
						 />
					</div>
					{query.length === 0 && (
						<div>
							{favorites.length > 0 && <h2>Most used</h2>}
							<div className="emojis favorites">
								{favorites.map(e =>
									<EmojiButton key={e.id} emoji={e} onClick={() => this.handleEmojiClick(e)} />
								)}
							</div>
						</div>
					)}
					{query.length > 0
						? (
							<div className="emojis">
								{emojis.map(e =>
									<EmojiButton key={e.id} emoji={e} onClick={() => this.handleEmojiClick(e)} />
								)}
							</div>
						)
						: categories.map(category => (
						<div key={category}>
							<h2>{category}</h2>
							<div className="emojis">
								{emojis.filter(e => e.category === category).map(e =>
									<EmojiButton key={e.id} emoji={e} onClick={() => this.handleEmojiClick(e)} />
								)}
							</div>
						</div>
					))}
				</main>
				<Footer/>
			</>
		)
	}
}

export default hot(module)(App)
