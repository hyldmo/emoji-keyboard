import { Emoji, Save } from './types'

export function filterEmoji (emoji: Emoji, query: string) {
	return (
		emoji.emoji.includes(query) ||
		emoji.description.includes(query) ||
		emoji.category.includes(query) ||
		emoji.aliases.some(alias => alias.includes(query)) ||
		emoji.tags.some(tag => tag.includes(query))
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
