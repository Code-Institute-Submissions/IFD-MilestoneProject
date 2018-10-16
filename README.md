# Interactive Frontend Development Milestone project
The aim of this project is to create a Single Page Application (SPA) that allows users to search for useful holiday information for a particular city such as tourist attractions, accommodations and restaurants. This SPA will be implemented using several APIs such as Google Maps and Geolocation.

## UX
Product of this project (i.e. the SPA mentioned above) is aimed for users who might be planning for a short holiday and would like to do some brief research regarding their destination and in some scenarios they might want to this the SPA whilst travelling. As such, UX focuses on usability of mobiles devices and simplicity for any users with any level of computer literacy. The two main user scenarios would be:
1. User would like to search for points of interests (POI) of a place they are going to travel to soon. As such, they would enter the name of the said location in a search bar to search for the location on map first. They would then choose what kind of POI they would like to know more about, for example hotels or restaurants. Once they have chosen, those POIs will be revealed on the map as markers, at which point users can check out details of those markers such as address by tapping on them.
2. Another use case is where users would like to search for POIs of their surroundings. In such case the flow is very similar to that of case 1, except users will have to click on a 'Use Current Location' button first to tell the application to search for users' current geolocation.

## Features
Since the end product of this project has only a single feature so instead of describing that one feature this section will go deeper in describing the building block that made up this one feature. Most features mentioned below is part of [Google Maps API](https://developers.google.com/maps/documentation/).
- Google Maps: the backbone of this SPA. The map used in this SPA is a simplified version of that in [Google Maps](https://www.google.com/maps) so a lot of features found in Google Maps is not available here. That said, basic map operations are still available such as zooming and panning.
- Location Search: allows users to search for a location by typing the name in search bar. [Place Search Box](https://developers.google.com/maps/documentation/javascript/examples/places-searchbox) is used in particular to help user complete their inputs.
- Current Location: using [Google Maps Geolocation API](https://developers.google.com/maps/documentation/javascript/examples/map-geolocation), users can re-centre the map using their current location.
- Search Radius Adjustment: by combining basic html slide bar component map draw tool users are able to adjust and visualise the search radius.
- POIs Search: another major building block of the SPA. It is represented as a toolbar above the map on the page. Users can pick and mix different options from the toolbar to search for different kinds of POIs available near the current centre of the map, whilst using search radius mention above to limit number of results returned.

## Technologies Used
- [HTML](https://www.w3.org/html/), [CSS](https://www.w3.org/Style/CSS/), [JavaScript](https://www.javascript.com/)
	- Languages used for this project.
	- In particular JavaScript has been used exclusively for most of the logic in this project (i.e. consuming APIs).
- [JQuery](https://jquery.com/)
	- Simplifying DOM manipulation. In the scope of this project, it is required for some of the Bootstrap components to function properly.
- [Bootstraps](https://getbootstrap.com/)
    - Used in conjunction with custom CSS code to provide styling of html pages.
    - [Cerulean](https://bootswatch.com/cerulean/) theme from Bootswatch has been used for this project.
- [Google Maps API](https://developers.google.com/maps/documentation/)
    - Most feature mentioned in section above comes from this API.

## Testing
Since this SPA mainly consumes API in terms of how it functions, elements that need testing are few in numbers. In other words, all tests needed are contained within user scenarios mentioned above, which are:
- Location search:
	- Users enter a location in the search, click on one of the candidate result and the map will re-centre to users' choice.
	- Users enter a non-existent location and map will re-centre to a location closest to what users have entered in terms of name.
- Place search:
	- Users click on different options of POIs from toolbar and all results should be displayed at the same time.
	- Users should be able to remove currently displayed results by toggling buttons from toolbar.
	- A warning message should appear if no result is returned for a particular type of POI within search radius.
- Adjusting search radius:
	- When users move the slider a circle should appear on the map reflecting the search radius.
	- No place search results should exist outside of the circle.
Details of tests can be found in documentations stored in testing folder of this project.

### Responsive Design
As mentioned in UX section, focus has been set on usability with mobile device and as such it is necessary to make sure the SPA is as responsive as possible.
- Using a mobile-first approach design, the SPA has different layout depending on screen size. To be specific:
    - The SPA uses a single column layout on mobile devices whilst component are laid out more evenly on large screens. For example, toolbar for selecting options for POIs is displayed vertically on mobile devices and horizontally on large screens.
- Another thing to note is that since this is a single page application it would be a good idea to limit the scrolling needed. As such, height of the map will adjust automatically depending on screen size to maximise space available whilst keeping scrolling needed to a minimum.

## Deployment
The SPA has been hosted on [GitHub Pages](https://comacoma.github.io/IFD-MilestoneProject/). As far as this project is concerned, deployment model and development model are one and the same.
