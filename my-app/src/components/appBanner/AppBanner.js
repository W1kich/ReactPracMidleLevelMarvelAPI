import './appBanner.scss';
import avengers from '../../resources/img/Avengers.png';
import avengerslogo from '../../resources/img/Avengers_logo.png';

const AppBanner = () =>{
	return(
		<div className="comicstop">
			<div className="comicstop__avengers">
				<img src={avengers} alt="avengers" />
			</div>
			<div className="comicstop__content">
				New comics every week!<br />
				Stay tuned!
			</div>
			<div className="comicstop__avengerslogo">
				<img src={avengerslogo} alt="avengerslogo"/>
			</div>
		</div>
	)
}

export default AppBanner;