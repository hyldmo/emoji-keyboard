import * as React from 'react'

const Navbar: React.StatelessComponent = (props) =>  (
	<footer>
		<span>{process.env.PACKAGE_NAME} v{process.env.PACKAGE_VERSION}</span>
	</footer>
)

export default Navbar
