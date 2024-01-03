# Development Documentation

This application is build from [WebGeoDa](https://docs.webgeoda.org/).

## Required Environment Variables
The below are required environmnent variables. These should be available in `.env` or `.env.local` in your repo root. Don't commit them to Github. You can copy `.env.example` to `.env` and fill in the blank values.

```
# mapbox token for map
REACT_APP_MAPBOX_TOKEN=pk...

# air quality endpoint
REACT_APP_AQ_ENDPOINT=https:...

# submission url for google form
REACT_APP_EMAIL_FORM_URL=
```

## Installing and Running the App

```
yarn install
yarn build:data
yarn start
```

#### `yarn build:data`

Fetch and build relevant data. You must run this prior to development. 

This builds 4 main things:
- Main data for the application
- Map variable specification
- Documentation for the docs / about page
- Resource page entries

This process is shown in context in the following diagram.

![](./chives-build-data.png "Data diagram")

Data is pulled from the data management spreadsheets which contains the following sheets/columns:

*Data Sheets*
- Name: name of data
- Manager: Owner of data
- Data Sheet Link: CORS accessible CSV endpoint or file URL
- Meta Data Link

*Columns*
- Column: column name in data
- Description: Text description of data

*Variables*
- Variable Name
- Column: accessor column
- units: suffix, eg %
- Description: HTML description for in-map description of variable
- Data Year: data year
- Data Source(s): data sources
- Original Scale: origin geospatial unit
- Metadata Doc: link to full metadata
- Bins: If specifying bin scale, otherwise quantile
- colorScale: rgb[] | rgba[] repeated bins
- Added By: data attribution
- listGroup: grouping on the variable drop down
- custom: if custom layer, indicated an ID here and integrate that on the frontend

*Basemap Layers*
- Variable Name: name of variable
- Data Year: data year
- Data Source(s): data sources
- Original Scale: origin geospatial unit
- Metadata Doc: link to full metadata
- Added By: data attribution

*Resources*
- title: title of resource
- link: link to resource
- text: text description of resource
- logo: logo of resource - path relative to chives repo > public folder
- image: image of resource - path relative to chives repo > public folder
- logoAltText: alt text for logo
- imageAltText: alt text for image
- dateAdded: date added to resource guide
- verified: if verified by chives team

*Contributor Logos*
- Contributor: name of contributor
- Link: link to contributor's website
- ImagePath: path to contributor's logo - path relative to chives repo > public folder
- AltText: alt text for logo

#### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
