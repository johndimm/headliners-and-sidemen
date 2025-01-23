import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Years() {
	const [data, setData] = useState([])

	const release_group = 'tt0084777'

	const addRecords = (records) => {
		setData((oldArray) => [...oldArray, records])
	}

	useEffect(() => {
		const url = `/api/release_group/${release_group}`
		axios
			.get(url)
			.then(function (response) {
				// console.log("Center, data", response.data)
				addRecords(response.data)
			})
			.catch((err) => err)

		document.body.style.cursor = 'progress'
		let before_after = 'last_before'
		const url_left = `/api/${before_after}/${release_group}`
		// console.log(url)
		axios
			.get(url_left)
			.then(function (response) {
				addRecords(response.data)
			})
			.catch((err) => err)

		before_after = 'first_after'
		const url_right = `/api/${before_after}/${release_group}`
		// console.log(url)
		axios
			.get(url_right)
			.then(function (response) {
				addRecords(response.data)
			})
			.catch((err) => err)
	}, [release_group])

	const str = JSON.stringify(data)
	return <pre>{str}</pre>
}
