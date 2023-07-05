import './singleComic.scss';
import Spinner from '../spinner/Spinner';
import ErrorMasage from '../errorMasage/ErrorMasage';
import useMarvelService from '../../services/MarvelServices';
import { useEffect, useState } from 'react';

const SingleComic = (props) => {

	const {loading, error, getComics, clearError} = useMarvelService();
	const [comics, setComics] = useState();
	const {comicsId} = props;
	// const comicsId = 1003;

	
	useEffect(() =>{
		updateComics();
	}, [comicsId])


	const	onComicsLoaded = (comics) => {
		setComics(comics);
	}
	
	const updateComics = () =>{
		clearError();
		if(!comicsId){
			return;
		}
		getComics(comicsId)		
		.then(onComicsLoaded);
	}

	const errorMasage = error ? <ErrorMasage/> : null;
	const spiner = loading ? <Spinner/> : null;
	const content = !(loading || error || !comics) ? <View comics={comics}/> : null;

	console.log(comics)
	return (
			<div className="single-comic">
				{errorMasage}
				{spiner}
				{content}
			</div>
	)
}

const View = ({comics}) =>{
	const {title,price, thumbnail,pageCount,description, language} = comics;
	return(
		<>
			<img src={thumbnail} alt={`${title}`} className="single-comic__img"/>
					<div className="single-comic__info">
							<h2 className="single-comic__name">{title}</h2>
							<p className="single-comic__descr">{description}</p>
							<p className="single-comic__descr">{ `${pageCount} pages`}</p>
							<p className="single-comic__descr">Language: {language}</p>
							<div className="single-comic__price">{price <= 0 ? `NOT AVAILABLE` : `${price}$` }</div>
					</div>
					<a href="#" className="single-comic__back">Back to all</a>
		</>
	)
}

export default SingleComic;