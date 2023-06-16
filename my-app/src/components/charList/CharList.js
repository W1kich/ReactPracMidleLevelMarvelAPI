import './charList.scss';

import { Component } from 'react';
import MarvelService from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMasage from '../errorMasage/ErrorMasage';

class CharList extends Component {

	refArr = [];

	setRef = elem =>{
		this.refArr.push(elem);
	}

	setClass = (id) =>{

		this.refArr.forEach(item => item.classList.remove("char__item_selected"));
		this.refArr[id].classList.add("char__item_selected");
		this.refArr[id].focus();
	}

	state = {
		chars: [],
		loading: true,
		error: false,
		newItemLoading: false,
		offset: 0,
		charEnded: false,
	}

	marvelService = new MarvelService();


	componentDidMount() {
		this.onRequest();
	}


	componentDidUpdate(){	

	}
	
	onError = () =>{
		this.setState({error: true, loading: false});
	}

	onRequest = (offset) =>{
		this.onCharListLoading();
		this.marvelService
			.getAllCharacters(offset)
			.then(this.onCharLoaded)
			.catch(this.onError)
			
	}
	
	onCharListLoading = () =>{
		this.setState({newItemLoading: true});
	}


	onCharLoaded = (newChars) => {
		let ended = false;
		if(newChars.length < 9){
			ended = true;
		}

		this.setState(({offset, chars}) =>({
			chars: [...chars, ...newChars], 
			loading: false, 
			newItemLoading: false,
			offset: offset + 9,
			charEnded: ended
		}))
	}
	
	render(){
		const {chars,loading, error, newItemLoading, offset, charEnded} = this.state;
		
		const elements = chars.map((item, i)=> {
			let imgFit = 'cover';
			if(item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' || item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif'){
				imgFit = 'unset';
			}
			return (
				<li className="char__item"
				key = {item.id}
				tabindex="0"
				ref={this.setRef}
				onClick={() => {
					this.props.onCharSelected(item.id);
					this.setClass(i);
					}}
				onKeyPress={(e) =>{
					if (e.key === ' ' || e.key === "Enter") {
						this.props.onCharSelected(item.id);
						this.setClass(i);
				}
				}
					
				}
				>
					<img src={item.thumbnail} alt={item.name} style={{ objectFit: `${imgFit}`}}/>
					<div className="char__name">{item.name}</div>
				</li>
			);
		});
		
		const errorMasage = error ? <ErrorMasage/> : null;
		const spiner = loading ? <Spinner/> : null;
		const content = !(loading || error) ? elements: null;
		console.log(this.refArr);

		return (
			<div className="char__list">
				<ul className="char__grid">
					{errorMasage}
					{spiner}
					{content}
				</ul>
				<button 
				disabled={newItemLoading}
				style={{'display': charEnded ? 'none' : 'block'}}
				onClick={() => this.onRequest(offset)}
				className="button button__main button__long">
						<div className="inner">load more</div>
				</button>
				</div>
		);
				
	}
}


export default CharList;