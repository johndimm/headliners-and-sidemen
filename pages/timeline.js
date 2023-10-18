import React, { useState, useEffect } from 'react'

const Timeline = ({ setSelectedYear, display_year, num_years }) => {
  const timeline = []
  const yearInt = parseInt(display_year)
  const left = Math.floor(yearInt - (num_years / 2))
  const right = Math.ceil(yearInt + ( num_years - (num_years / 2)))
  //console.log(`display_year: ${display_year}, left: ${left}, right: ${right}`)

	for (let year = 1894; year <= 2023; year += 1) {
		const style =
			year >= left && year <= right
				? { color: 'blue' }
				: { color: 'darkgray' }


		if (year % 10 === 0) {
			timeline.push((<wbr />))
			timeline.push(
				<a
					key={year}
					style={style}
					href=''
					onClick={(e) => {
						e.preventDefault()
						setSelectedYear(year)
					}}
					title={year}
				> {year} </a>
			)
		} else {
			timeline.push(
				<a
					key={year}
					className="timeline_tick"
					style={style}
					href=''
					onClick={(e) => {
						e.preventDefault()
						setSelectedYear(year)
					}}
					title={year}
				> | </a>
			)
		}
	}
	return <div className='timeline'>{timeline}</div>
}
export default Timeline
