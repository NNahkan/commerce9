import React from 'react';
import './GoBack.css'

// unnecessary.. I tried something on here :(

const GoBack = ({previousFunc}) => (

	<button onClick={previousFunc} className='previousPageBtn'> &lt; Previous Page</button>

)

export default GoBack;