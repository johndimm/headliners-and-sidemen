import React, { useState, useEffect } from 'react'

const TimeScrubber = ( {params, setParams}) => {
    const [date, setDate] = useState(params.year)

    const setYear = (e) => {
        const year = e.currentTarget.value 
        setParams({...params, year:year})
    }

	const showTooltip = (e) => {
		let scrubber = document.getElementById('scrubber')
		let w = scrubber.clientWidth
		let x = e.nativeEvent.offsetX
		let percent = x / w
        let date = parseInt(1894 + (percent * (2023 - 1894)))
        if (date != 0 && date != null)
          setDate(date)
	}

	return (
		<div id='scrubberContainer'>
	
			<form>
                <div id='tooltip'>{date}</div>
				<input
					type='range'
					id='scrubber'
					onMouseMove={showTooltip}
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
