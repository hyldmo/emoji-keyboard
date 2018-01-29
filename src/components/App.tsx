import * as React from 'react'
import { hot } from 'react-hot-loader'
import { Emoji } from '../types'

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
		const { query, emoji } = this.state
		const emojis = emoji.filter(e =>
			e.aliases.includes(query) ||
			e.category.includes(query) ||
			e.description.includes(query) ||
			e.emoji.includes(query) ||
			e.tags.includes(query)
		)
		return (
			<div>
				<h1>Emoji Keyboard</h1>
				<div>
					<input onChange={e => this.setState({ query: e.target.value })} value={query} />
				</div>
				<div className="emojis">
					{emojis.map(e =>
						<div key={e.id} className="emoji">
							{e.emoji}
						</div>
					)}
				</div>
			</div>
		)
	}
}

export default hot(module)(App)
