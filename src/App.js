import Child from './Child'
import style from './App.css'
import { useEffect } from 'react'
import axios from 'axios'

function App() {

	useEffect(() => {
		axios.get('/ajax/movieOnInfoList?token=&optimus_uuid=74B5F0A032A711EB82DD6B9282E93C676D27D7B9731D4E608D7612C3E708C120&optimus_risk_level=71&optimus_code=10')
			.then(res => {
				console.log(res.data)
			})
	}, [])

	return <div>
		App
		<ul>
			<li className={style.li}>aaaaaaaaaa</li>
			<li className={style.li}>bbbbbbbbbb</li>
		</ul>
		<Child />
	</div>
}

export default App
