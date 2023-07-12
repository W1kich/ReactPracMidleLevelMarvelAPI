import './singleCharInfo.scss';
import Spinner from '../spinner/Spinner';
import ErrorMasage from '../errorMasage/ErrorMasage';
import useMarvelService from '../../services/MarvelServices';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const SingleChar = () => {

	const {loading, error, getCharacter, clearError} = useMarvelService();
	const [char, setChar] = useState();
	const {CharId} = useParams();
	
	useEffect(() =>{
		updateChar();
	}, [CharId])


	const	onCharLoaded = (char) => {
		setChar(char);
	}
	
	const updateChar = () =>{
		clearError();
		getCharacter(CharId)
		.then(onCharLoaded);
	}

	const errorMasage = error ? <ErrorMasage/> : null;
	const spiner = loading ? <Spinner/> : null;
	const content = !(loading || error || !char) ? <View char={char}/> : null;
	console.log(char);
	return (
		<>
			{errorMasage}
			{spiner}
			{content}
		</>
			
	)
}

const View = ({char}) =>{
	const {name, thumbnail,description} = char;
	return(
		<div className="single-comic">
			<img src={thumbnail} alt={`${name}`} className="single-comic__img"/>
					<div className="single-comic__info">
							<h2 className="single-comic__name">{name}</h2>
							<p className="single-comic__descr">{description}</p>
					</div>
					<Link to={'/'} className="single-comic__back">Back to all</Link>
		</div>
	)
}

export default SingleChar;