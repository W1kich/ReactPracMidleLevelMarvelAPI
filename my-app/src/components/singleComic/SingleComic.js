import './singleComic.scss';
import Spinner from '../spinner/Spinner';
import ErrorMasage from '../errorMasage/ErrorMasage';
import useMarvelService from '../../services/MarvelServices';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const SingleComic = () => {

	const {loading, error, getComics, clearError} = useMarvelService();
	const [comic, setComic] = useState();
	const {comicId} = useParams();
	
	useEffect(() =>{
		updateComic();
	}, [comicId])


	const	onComicLoaded = (comic) => {
		setComic(comic);
	}
	
	const updateComic = () =>{
		clearError();
		getComics(comicId)
		.then(onComicLoaded);
	}

	const errorMasage = error ? <ErrorMasage/> : null;
	const spiner = loading ? <Spinner/> : null;
	const content = !(loading || error || !comic) ? <View comics={comic}/> : null;

	return (
		<>
			{errorMasage}
			{spiner}
			{content}
		</>
			
	)
}

const View = ({comics}) =>{
	const {title,price, thumbnail,pageCount,description, language} = comics;
	return(
		<div className="single-comic">
			<Helmet>
				<meta 
						name="descriptmeta"
						content={`${title} comics book`}
				/>
				<title>{title}</title>
			</Helmet>
			<img src={thumbnail} alt={`${title}`} className="single-comic__img"/>
					<div className="single-comic__info">
							<h2 className="single-comic__name">{title}</h2>
							<p className="single-comic__descr">{description}</p>
							<p className="single-comic__descr">{ `${pageCount} pages`}</p>
							<p className="single-comic__descr">Language: {language}</p>
							<div className="single-comic__price">{price}</div>
					</div>
					<Link to={'/comics'} className="single-comic__back">Back to all</Link>
		</div>
	)
}

export default SingleComic;