import React, { useState, useEffect } from 'react'

const TimeScrubber = ( {params, setParams}) => {
    const [date, setDate] = useState(params.year)

    const setYear = (e) => {
        const year = e.currentTarget.value 
        setParams({...params, year:year})
    }

	return (
		<div id='scrubberContainer'>
	
			<form>
                <div id='tooltip'>{date}</div>
				<input
					type='range'
					id='scrubber'
                    onChange={(e) => setDate(e.currentTarget.value)}
					step='1'
					min='1894'
					max='2023'
					defaultValue={params.year}
                    onMouseUp={(e) => setYear(e)} 
                    onTouchEnd={(e) => setYear(e)}
				/>
		
			</form>
		</div>
	)
}

export default TimeScrubber
