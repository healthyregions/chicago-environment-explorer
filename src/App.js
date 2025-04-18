import React, { Suspense } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { Home, LoadingMessage, ErrorPage } from "./components/";
import {
	ThemeProvider,
	StyledEngineProvider,
	createTheme,
} from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";

const theme = createTheme();

// const useStyles = makeStyles((theme) => {
//   root: {
//     // some CSS that access to theme
//   }
// });

const Map = React.lazy(() => import('./components/Pages/Map'));
const About = React.lazy(() => import('./components/Pages/About'));
const Team = React.lazy(() => import('./components/Pages/Team'));
const Guide = React.lazy(() => import('./components/Pages/Guide'));
const Contact = React.lazy(() => import('./components/Pages/Contact'));
const Community = React.lazy(() => import('./components/Pages/Community'));
const Data = React.lazy(() => import('./components/Pages/Data'));
const Explore = React.lazy(() => import('./components/Pages/Explore'));
const IndexBuilder = React.lazy(() => import('./components/Pages/IndexBuilder'));
const Learn = React.lazy(() => import('./components/Pages/Learn'));


const LearnHistogramFilter = React.lazy(() => import('./components/Pages/LearnHistogramFilter'));
const LearnMapping101 = React.lazy(() => import('./components/Pages/LearnMapping101'));
const LearnIndexBuilder = React.lazy(() => import('./components/Pages/LearnIndexBuilder'));
const Posts = React.lazy(() => import('./components/Pages/Posts'));
const PRN = React.lazy(() => import('./components/Pages/PRN'));
const Instituto = React.lazy(() => import('./components/Pages/Instituto'));


/** Google Translation Widget */
const googleTranslateElementInit = () => {
	new window.google.translate.TranslateElement(
		{
			pageLanguage: "en",
			autoDisplay: false,
		},
		"google_translate_element"
	);
};
const useStyles = makeStyles((theme) => ({
	googleTranslateElement: {
		position: "fixed",
		left: "0.5em", //same left margin as the Nav Menu
		zIndex: "1000",
		backgroundColor: "rgba(255,255,255,0.75)",
		padding: "15px", //same padding as the Nav Menu
	},
}));

export default function App() {
	const classes = useStyles();
	React.useEffect(() => {
		var addScript = document.createElement("script");
		addScript.setAttribute(
			"src",
			"//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
		);
		document.body.appendChild(addScript);
		window.googleTranslateElementInit = googleTranslateElementInit;
	}, []);

	const location = useLocation();
	return (
		<div>
			<div
				id="google_translate_element"
				className={classes.googleTranslateElement}
				style={
					location.pathname.indexOf("map") > -1
						? { bottom: "4em" } //if on map page, move up to avoid overlapping with map controls
						: { bottom: "0.5em" }
				}
			></div>
			<StyledEngineProvider injectFirst>
				<ThemeProvider theme={theme}>
					<Suspense fallback={<LoadingMessage />}>
						<Switch>
							<Route path="/" component={Home} exact />
							<Route path="/map" component={Map} />
							<Route path="/map.html" component={Map} />
							<Route path="/about" component={About} />
							<Route path="/about.html" component={About} />
							<Route exact path="/team" component={Team} />
							<Route path="/explore" component={Explore} />
							<Route path="/explore.html" component={Explore} />
							<Route exact path="/team.html" component={Team} />
							<Route path="/guide" component={Guide} />
							<Route path="/guide.html" component={Guide} />
							<Route path="/posts/:slug?" component={Posts} />
							<Route path="/contact" component={Contact} />
							<Route path="/contact.html" component={Contact} />
							<Route exact path="/community" component={Community} />
							<Route exact
								path="/community.html"
								component={Community}
							/>
							<Route path="/data" component={Data} />
							<Route path="/data.html" component={Data} />
							<Route path="/builder" component={IndexBuilder} />
							<Route path="/builder.html" component={IndexBuilder} />
							<Route exact path="/learn" component={Learn} />
							<Route exact path="/learn.html" component={Learn} />
							<Route path="/learn/mapping101" component={LearnMapping101} />
							<Route path="/learn/mapping101.html" component={LearnMapping101} />
							<Route path="/learn/histogram" component={LearnHistogramFilter} />
							<Route path="/learn/histogram.html" component={LearnHistogramFilter} />
							<Route path="/learn/indexBuilder" component={LearnIndexBuilder} />
							<Route path="/learn/indexBuilder.html" component={LearnIndexBuilder} />

							{/* <Route path="/community/instituto" component={Instituto} />
							<Route path="/community/instituto.html" component={Instituto} />
							<Route path="/community/prn" component={PRN} />
							<Route path="/community/prn.html" component={PRN} />
							<Route path="/community/peoplesresponse" component={PRN} />
							<Route path="/community/peoplesresponse.html" component={PRN} />
							<Route path="/community/peoplesresponsenetwork" component={PRN} />
							<Route path="/community/peoplesresponsenetwork.html" component={PRN} /> */}
							<Route component={ErrorPage} />
							<Route />
						</Switch>
					</Suspense>
				</ThemeProvider>
			</StyledEngineProvider>
		</div>
	);
}
