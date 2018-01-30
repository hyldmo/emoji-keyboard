import { Emoji, Save } from './types'

export function filterEmoji (emoji: Emoji, query: string) {
	query = query.toLocaleLowerCase()
	return (
		emoji.emoji.includes(query) ||
		emoji.description.toLocaleLowerCase().includes(query) ||
		emoji.category.toLocaleLowerCase().includes(query) ||
		emoji.aliases.some(alias => alias.toLocaleLowerCase().includes(query)) ||
		emoji.tags.some(tag => tag.toLocaleLowerCase().includes(query))
	)
}

const saveKey = 'favorites'
export function save (state: Save): void {
	localStorage.setItem(saveKey, JSON.stringify(state))
}

export function load (): Save {
	const saveState = localStorage.getItem(saveKey)
	return saveState !== null
		? JSON.parse(saveState)
		: { favorites: {} }
}
