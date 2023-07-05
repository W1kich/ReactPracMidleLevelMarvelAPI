import {useEffect, useState} from 'react';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import useMarvelService from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMasage from '../errorMasage/ErrorMasage';

const RandomChar = (props) =>{

	const [char, setChar] = useState({});
	const {loading, error, getCharacter, clearError} = useMarvelService();

	useEffect(() =>{
		updateChar();
		
		const timerID = setInterval(updateChar, 60000);

		return () =>{
			clearInterval(timerID);
		}
	}, [])

	const onCharLoaded = (char) => {
		setChar(char);
	}

	const onTryDesc = (desc) =>{
		if(typeof(desc) !== 'string'){
			return desc;
		}else{
			if(desc === ''){
				return "This character does't have a description";
			}else if(desc.length > 227){
				return desc.slice(0, 212) + '...';
			}
		}
		return desc;
	}

	const updateChar = () =>{
		clearError();
		const id = Math.floor(Math.random() *(1011400 - 1011000) + 1011000);
		getCharacter(id)
		.then(onCharLoaded);
	}
					
	const errorMasage = error ? <ErrorMasage/> : null;
	const spiner = loading ? <Spinner/> : null;
	const content = !(loading || error) ? <View char={char} onTryDesc = {onTryDesc}/> : null;
	return (
		<div className="randomchar">
				{errorMasage}
				{spiner}
				{content}
				<div className="randomchar__static">
						<p className="randomchar__title">
								Random character for today!<br/>
								Do you want to get to know him better?
						</p>
						<p className="randomchar__title">
								Or choose another one
						</p>
						<button onClick={updateChar} className="button button__main">
								<div className="inner">try it</div>
						</button>
						<img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
				</div>
		</div>
	)
}

const View = ({char, onTryDesc}) =>{
	const {name, description, thumbnail, homepage, wiki} = char;
	const desc = onTryDesc(description);
	let imgFit = 'cover';

	if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' || thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif'){
		imgFit = 'contain';
	}

	return(
		<div className="randomchar__block">
				<img src={thumbnail} alt="Random character" className="randomchar__img" style={{ objectFit: `${imgFit}`}}/>
				<div className="randomchar__info">
						<p className="randomchar__name">{name}</p>
						<p className="randomchar__descr">
								{desc}
						</p>
						<div className="randomchar__btns">
								<a href={homepage} className="button button__main">
										<div className="inner">homepage</div>
								</a>
								<a href={wiki} className="button button__secondary">
										<div className="inner">Wiki</div>
								</a>
						</div>
				</div>
		</div>
	)
}

export default RandomChar;