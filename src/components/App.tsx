import * as React from 'react'
import { hot } from 'react-hot-loader'
import { Emoji } from '../types'
import Footer from './Footer'

const copy: (s: string) => void = require('copy-text-to-clipboard')

import '../styles/app.css'

type State = {
	query: string
	emoji: Emoji[]
}

class App extends React.Component<{}, State> {
	constructor (props) {
		super(props)

		this.state = {
			query: '',
			emoji: []
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

	render () {
		const { query } = this.state
		const emojis = this.state.emoji.filter(e =>
			e.emoji.includes(query) ||
			e.description.includes(query) ||
			e.category.includes(query) ||
			e.aliases.some(alias => alias.includes(query)) ||
			e.tags.some(tag => tag.includes(query))
		)
		return (
			<div id="app">
				<main>
					<h1 className="title">Emoji Keyboard</h1>
					<div>
						<input onChange={e => this.setState({ query: e.target.value })} value={query} placeholder="Search emojis" />
					</div>
					<br />
					<div className="emojis">
						{emojis.map(e =>
							<button key={e.id} className="emoji" onClick={() => copy(e.emoji)}>
								{e.emoji}
							</button>
						)}
					</div>
				</main>
				<Footer/>
			</div>
		)
	}
}

export default hot(module)(App)
