import { Component } from 'react';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMasage from '../errorMasage/ErrorMasage';

class RandomChar extends Component {

	constructor(props){
		super(props);
		this.updateChar();
	}

	state = {
		char: {},
		loading: true,
		error: false
	}

	marvelService = new MarvelService();

	onCharLoaded = (char) => {
		this.setState({char, loading: false})
	}

	onTryDesc = (desc) =>{
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

	onError = () =>{
		this.setState({error: true, loading: false});
	}

	updateChar = () =>{
		const id = Math.floor(Math.random() *(1011400 - 1011000) + 1011000);
		this.marvelService
			.getCharacter(id)
			.then(this.onCharLoaded)
			.catch(this.onError)
			
	}

	render(){
		const {char, loading, error} = this.state;
		const errorMasage = error ? <ErrorMasage/> : null;
		const spiner = loading ? <Spinner/> : null;
		const content = !(loading || error) ? <View char={char} onTryDesc = {this.onTryDesc}/> : null;

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
							<button className="button button__main">
									<div className="inner">try it</div>
							</button>
							<img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
					</div>
			</div>
	)
	}
	
}

const View = ({char, onTryDesc}) =>{
	const {name, description, thumbnail, homepage, wiki} = char;	
	const desc = onTryDesc(description);

	return(
		<div className="randomchar__block">
				<img src={thumbnail} alt="Random character" className="randomchar__img"/>
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