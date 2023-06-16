import { Component } from "react";
import ErrorMasage from "../errorMasage/ErrorMasage";
class ErrorBoundary extends Component {
	state = {
		error: false
	}

	// static getDerivedStateFromError(error){
	// 	return {error: true};
	// }

	componentDidCatch(error, errorInfo){
		console.log(error, errorInfo);
		this.setState({error: true});
	}

	render(){
		if(this.state.error){
			return <ErrorMasage/>;
		}
		
		return this.props.children;
	}
}

export default ErrorBoundary;