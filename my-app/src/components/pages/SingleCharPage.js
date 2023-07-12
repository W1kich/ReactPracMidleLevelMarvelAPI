import SingleChar from '../singleCharInfo/SingleCharInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import AppBanner from '../appBanner/AppBanner';

const SingleCharPage = () =>{
	return(
		<>
			<ErrorBoundary>
					<AppBanner/>
				</ErrorBoundary>
			<ErrorBoundary>
				<SingleChar/>
			</ErrorBoundary>
		</>
	);
}

export default SingleCharPage;