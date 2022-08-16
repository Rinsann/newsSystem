import Child from './Child'
import style from './App.module.css'

function App() {
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
