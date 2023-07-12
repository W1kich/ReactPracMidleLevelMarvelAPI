import {useState} from "react";
import {Helmet} from 'react-helmet';

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import CharForm from "../charForm/CharForm";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import decoration from '../../resources/img/vision.png';

const MainPage = () =>{
	
	const [selectedChar, setChar] = useState(null);

	function onCharSelected(id) {
		setChar(id);
	}

	return(
		<>
		<Helmet>
			<meta 
				name="descriptmeta"
				content="Marvel information portal"
			/>
			<title>Marvel information portal</title>
		</Helmet>
			<ErrorBoundary>
				<RandomChar/>
			</ErrorBoundary>
			<div className="char__content">
			<ErrorBoundary>
				<CharList onCharSelected = {onCharSelected}/>
			</ErrorBoundary>
			<div className="char__infoandform">
				<ErrorBoundary>
					<CharInfo charId = {selectedChar}/>
				</ErrorBoundary>
				<ErrorBoundary>
					<CharForm/>
				</ErrorBoundary>
			</div>
			</div>
			<img className="bg-decoration" src={decoration} alt="vision"/>
	
		</>
	);
}

export default MainPage;