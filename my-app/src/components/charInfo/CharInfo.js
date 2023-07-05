import './charInfo.scss';

import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMasage from '../errorMasage/ErrorMasage';
import Skeleton from '../skeleton/Skeleton';

const CharInfo = (props) => {

	const [char, setChar] = useState(null);
	const {charId} = props;
	const {loading, error, getCharacter, clearError} = useMarvelService();

	useEffect(() =>{
		updateChar();
	}, [charId])


	const	onCharLoaded = (char) => {
		setChar(char);
	}
	
	const updateChar = () =>{
		clearError();
		if(!charId){
			return;
		}
		getCharacter(charId)
		.then(onCharLoaded);
	}

	const skeleton = char || loading || error ? null: <Skeleton/>;
	const errorMasage = error ? <ErrorMasage/> : null;
	const spiner = loading ? <Spinner/> : null;
	const content = !(loading || error || !char) ? <View char={char}/> : null;
	
	return (
		<div className="char__info">
			{skeleton}
			{errorMasage}
			{spiner}
			{content}
		</div>
	)	
}

const View = ({char}) =>{
	const {name, description, thumbnail, homepage, wiki, comics} = char;
	let imgFit = 'cover';

	if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' || thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif'){
		imgFit = 'contain';
	}
	
	return(
		<>
			<div className="char__basics">
				<img src={thumbnail} alt={name} style={{ objectFit: `${imgFit}`}}/>
					<div>
							<div className="char__info-name">{name}</div>
							<div className="char__btns">
									<a href={homepage} className="button button__main">
											<div className="inner">homepage</div>
									</a>
									<a href={wiki} className="button button__secondary">
											<div className="inner">Wiki</div>
									</a>
							</div>
					</div>
			</div>
			<div className="char__descr">
				{description ? description : 'This character does not have a description'}
			</div>
			<div className="char__comics">Comics:</div>
			<ul className="char__comics-list">
					{comics.length > 0 ? null : 'This character does not have a comic'}
					{
						comics.map((item, i) =>{
							if(i>9) return null;
							
							return(
								<li key = {i} className="char__comics-item">
									{item.name} 
								</li>
							)
						})
					}
			</ul>
		</>
	)
}

export default CharInfo;