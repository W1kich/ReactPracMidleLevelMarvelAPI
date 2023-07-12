import './charList.scss';

import { useState, useEffect, useRef } from 'react';
import useMarvelService from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMasage from '../errorMasage/ErrorMasage';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const CharList = (props) => {

	const refArr = useRef([]);

	const setClass = (id) =>{
		refArr.current.forEach(item => item.classList.remove("char__item_selected"));
		refArr.current[id].classList.add("char__item_selected");
		refArr.current[id].focus();
	}

	const [chars, setChars] = useState([]);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [offset, setOffset] = useState(0);
	const [charEnded, setCharEnded] = useState(false);

	const {loading, error, getAllCharacters} = useMarvelService();

	useEffect(() =>{
		onRequest(offset, true);
	}, [])
	
	const onRequest = (offset, initial) =>{
		initial ? setNewItemLoading(false) : setNewItemLoading(true);
		getAllCharacters(offset)
		.then(onCharLoaded);
	}
	

	const onCharLoaded = (newChars) => {
		let ended = false;
		if(newChars.length < 9){
			ended = true;
		}

		setChars(chars => [...chars, ...newChars]);
		setNewItemLoading(newItemLoading => false);
		setOffset(offset => offset + 9);
		setCharEnded(charEnded => ended)
	}
	
	function ListItems(){
		const elements = chars.map((item, i)=> {
			let imgFit = 'cover';
			if(item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' || item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif'){
				imgFit = 'unset';
			}
			return (
				<CSSTransition
					key={i} timeout={700} classNames="char__item"
				>
					<li className="char__item"
					tabindex="0"
					ref={(el => refArr.current[i] = el)}
					onClick={() => {
						props.onCharSelected(item.id);
						setClass(i);
						}}
					onKeyPress={(e) =>{
						if (e.key === ' ' || e.key === "Enter") {
							props.onCharSelected(item.id);
							setClass(i);
					}
					}
						
					}
					>
						<img src={item.thumbnail} alt={item.name} style={{ objectFit: `${imgFit}`}}/>
						<div className="char__name">{item.name}</div>
					</li>
				</CSSTransition>
			);
		});

		return (
			<ul className="char__grid">
				<TransitionGroup component={null}>
					{elements}
				</TransitionGroup>
			</ul> 
		)
	}
	
	const errorMasage = error ? <ErrorMasage/> : null;
	const spiner = loading && !newItemLoading ? <Spinner/> : null;
	const content = ListItems(chars);

	return (
		<div className="char__list">
			{spiner}
			{errorMasage}	
		 	{content}
			<button 
			disabled={newItemLoading}
			style={{'display': charEnded ? 'none' : 'block'}}
			onClick={() => onRequest(offset)}
			className="button button__main button__long">
					<div className="inner">load more</div>
			</button>
			</div>
	);
}

export default CharList;