import SingleComics from  '../singleComic/SingleComic';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import AppBanner from '../appBanner/AppBanner';

const SingleComicsPage = () =>{
	return(
		<>
			<ErrorBoundary>
					<AppBanner/>
				</ErrorBoundary>
			<ErrorBoundary>
				<SingleComics/>
			</ErrorBoundary>
		</>
	);
}

export default SingleComicsPage;