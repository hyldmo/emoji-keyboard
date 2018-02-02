import * as React from 'react'

const GitHub = require('../../static/GitHub-Mark.svg').default as React.ComponentClass<React.SVGProps<SVGSVGElement>>

const Navbar: React.StatelessComponent = (props) =>  (
	<footer>
		<span>{process.env.PACKAGE_NAME} v{process.env.PACKAGE_VERSION}</span>
		<a href={process.env.REPO_URL}>
			<GitHub width={32} height={32}/>
		</a>
	</footer>
)

export default Navbar
