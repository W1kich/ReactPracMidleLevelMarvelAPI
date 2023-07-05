import {useState} from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";
import SingleComic from "../singleComic/SingleComic";

import decoration from '../../resources/img/vision.png';

const App = () => {

	const [selectedChar, setChar] = useState(null);
	const [selectedComics, setComics] = useState(1003);


	function onCharSelected(id) {
		setChar(id);
	}

	function onComicsSelected(id) {
		setComics(id);
	}

	return (
		<div className="app">
			<AppHeader/>
			<main>
					{/* <ErrorBoundary>
						<RandomChar/>
					</ErrorBoundary>
					<div className="char__content">
						<ErrorBoundary>
							<CharList onCharSelected = {onCharSelected}/>
						</ErrorBoundary>
						<ErrorBoundary>
							<CharInfo charId = {selectedChar}/>
						</ErrorBoundary>
					</div>
					<img className="bg-decoration" src={decoration} alt="vision"/> */}
					<ErrorBoundary>
						<AppBanner/>
					</ErrorBoundary>
					<ErrorBoundary>
						<SingleComic
						comicsId = {selectedComics}/>
					</ErrorBoundary>
				
					{/* <ErrorBoundary>
						<ComicsList
						onComicsSelected ={onComicsSelected}/>
					</ErrorBoundary> */}
			</main>
		</div>
		)
}

export default App;