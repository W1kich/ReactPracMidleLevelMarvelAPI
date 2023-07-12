import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import { Helmet } from "react-helmet";

const ComicsPage = () =>{

	return(
		<>
			<Helmet>
				<meta 
					name="descriptmeta"
					content="Page with list of our comics"
				/>
				<title>Comics page</title>
			</Helmet>
			<ErrorBoundary>
				<AppBanner/>
			</ErrorBoundary>
			<ErrorBoundary>
				<ComicsList/>
			</ErrorBoundary>
		</>
	);
}

export default ComicsPage;