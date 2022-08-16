import React from 'react';
import style from './Child.module.css'

function Child(props) {
	return (
		<div>
			Child
			<ul>
				<li className={style.item}>222222222222</li>
				<li className={style.item}>333333333333</li>
			</ul>
		</div>
	);
}

export default Child;