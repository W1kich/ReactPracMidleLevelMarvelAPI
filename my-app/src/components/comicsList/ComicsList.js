import './comicsList.scss';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMasage from '../errorMasage/ErrorMasage';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ComicsList = () =>{
	
	const {loading, error, getAllComics} = useMarvelService();
	
	const [comicsList, setComicsList] = useState([]);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [offset, setOffset] = useState(0);
	const [comicsEnded, setComicsEnded] = useState(false);


	useEffect(() =>{
		onRequest(offset, true);
	}, [])
	
	const onRequest = (offset, initial) =>{
		initial ? setNewItemLoading(false) : setNewItemLoading(true);
		getAllComics(offset)
		.then(onComicsLoaded);
	}
	

	const onComicsLoaded = (newComics) => {
		let ended = false;
		if(newComics.length < 8){
			ended = true;
		}

		setComicsList(comicsList => [...comicsList, ...newComics]);
		setNewItemLoading(false);
		setOffset(offset => offset + 8);
		setComicsEnded(ended);
	}

	const itemsList = (arr) =>{
		const elements = arr.map((item, i)=> {
			let imgFit = 'cover';
			if(item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' || item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif'){
				imgFit = 'unset';
			}
			return (
				<CSSTransition key = {i} classNames={"comicslist__item"} timeout={700}>
					<li className="comicslist__item">
						<Link to={`/comics/${item.id}`}>
						<div className="comicslist__item__img">
							<img src={item.thumbnail} style={{ objectFit: `${imgFit}`}} alt={item.title} />
						</div>
						<div className="comicslist__item__title">
							{item.title}
						</div>
						<div className="comicslist__item__price">
							{item.price}
						</div>
						</Link>
					</li>
				</CSSTransition>
			);
		});

		return(
			<ul className="comicslist__grid">
			<TransitionGroup component={null}>
				{elements}
			</TransitionGroup>
			</ul>
		)
	} 
	
	const errorMasage = error ? <ErrorMasage/> : null;
	const spiner = loading && !newItemLoading ? <Spinner/> : null;
	const item = itemsList(comicsList);

	return(
		<div className="comicslist">
			{spiner}
			{errorMasage}
			{item}
			<button 
			disabled={newItemLoading}
			style={{'display': comicsEnded ? 'none' : 'block'}}
			onClick={() => onRequest(offset)}
			className="button button__main button__long">
					<div className="inner">load more</div>
			</button>
		</div>
	)
}

export default ComicsList;