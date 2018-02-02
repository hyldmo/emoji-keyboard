export type Emoji = {
	id: number
	emoji: string
	description: string
	category: string
	aliases: string[]
	tags: string[]
	unicode_version: string
	ios_version: string
}

export type Favorite = Emoji & { used: number }

export type Save = {
	favorites: { [key: number]: Favorite | undefined }
}

export type Tuple<T1, T2> = [T1, T2]
export type Triple<T1, T2, T3> = [T1, T2, T3]

