import './charInfo.scss';

import { Component } from 'react';
import MarvelService from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMasage from '../errorMasage/ErrorMasage';
import Skeleton from '../skeleton/Skeleton';


class CharInfo extends Component {
	
	state = {
		char: null,
		loading: false,
		error: false
	}

	marvelService = new MarvelService();

	componentDidMount(){
		this.updateChar();
	}

	componentDidUpdate(prevProps){
		if(this.props.charId !== prevProps.charId){
			this.updateChar();
		}
	}

	onError = () =>{
		this.setState({error: true, loading: false});
	}
	
	onCharLoaded = (char) => {
		this.setState({char, loading: false})
	}
	onCharLoading = () =>{
		this.setState({loading: true});
	}

	updateChar = (id) =>{
		const {charId} = this.props;
		if(!charId){
			return;
		}		

		this.onCharLoading();

		this.marvelService
		.getCharacter(charId)
		.then(this.onCharLoaded)
		.catch(this.onError);
		

	}

	render(){
		const {char, loading, error} = this.state;
		const skeleton = char || loading || error ? null: <Skeleton/>;
		const errorMasage = error ? <ErrorMasage/> : null;
		const spiner = loading ? <Spinner/> : null;
		const content = !(loading || error || !char) ? <View char={char} onTryDesc = {this.onTryDesc}/> : null;
		
		return (
			<div className="char__info">
				{skeleton}
				{errorMasage}
				{spiner}
				{content}
			</div>
	)
	}
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