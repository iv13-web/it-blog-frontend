import {FC} from 'react'
import {useParams} from 'react-router-dom'

export const Top: FC = () => {
	const {period}: any = useParams()

	return (
		<div>
			<h1>Top - {period}</h1>
		</div>
	)
}
