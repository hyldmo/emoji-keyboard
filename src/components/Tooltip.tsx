import * as React from 'react'
import { Triple, Tuple } from '../types'

type Props = {
	values: Array<Tuple<string, string> | Triple<string, string, boolean>>
}

const Tooltip: React.StatelessComponent<Props> = ({ values }) => (
	<ul className="tooltip">
		{values.map(triplet => triplet[2] !== false
			? (
				<li key={triplet[0]}>
					<strong>{triplet[0]}: </strong>
					<span>{triplet[1]}</span>
				</li>
			)
			: (
				null
			)
		)}
	</ul>
)

export default Tooltip
