# Interactive Frontend Development Milestone project

### The aim of this Sing Page Application (SPA) is to allow users search for useful holiday information for a particular city such as tourist attractions, accommodations and restaurants. This SPA will be implemented using several APIs such as Google Maps and Geolocation.

### Change Log
#### 13/06/2018 14:46
- poi v2:
  - Poi v2 should now be functional.
  - Dynamic update of place search (see [link](#20180610)) did not work as intended with the implementation of poi v2 (markers did not update correctly). As a work-around, map will clear all markers on map when users move the slider so they will have to choose the search option again. Will need to test on master branch as well to see if this bug already exists before the implementation of poi v2.
- UI will now rest when users map center has been changed.

#### 13/06/2018
- Important: poi v2!
  - Due to over generic results of place search using place type: point of interest for tourist attractions, a new solution will be implemented to counter that problem and the concepts are as follows:
    - Whilst tourist attraction button remains almost the same appearance from user perspective, it will now function as a drop down menu instead of a button.
    - From the drop down menu users can choose more specifically what type of tourist attraction they would like to search for.
    - Search logic will be the same as before with the difference that more place type will be used instead of using point of interest place type.
  - A new branch has been created for implementing poi v2.
- Master branch:
  - Minor bug fixes.
  - Search radius circle will now be removed if and only if no option has been selected at all.

#### <a name="20180610"></a>10/06/2018
- Added adjustable search radius functionality.
  - Previously place search radius is a constant but in order to give user more control over search criteria, search radius can now be controlled by user in the form of a slider.
  - To give user a better understanding over this new feature, a circle will now show on map as a visualization to search radius. The circle will change size dynamically when user move the slider.
  - Place search result will also update accordingly whenever user changes search radius.

#### 05/06/2018
- Adding comments to scripts for better readability.

#### 03/06/2018
- Info window has been added to the markers so now when user click on the markers a info window will pop up and provide them with additional information about the marked place such as name and address.

#### 02/06/2018
- Different marker icon for different place type has been implemented. They are basically the same shape but with different colours. In order to adapt to this design, buttons in toolbar has their colours changed according to their related icon.

#### 01/06/2018
- Nearby search code abstraction completed. The flow are as follows:
  - In the first implementation, each button in the button group is linked to their individual set of codes (i.e. xxxxSearch and returnXXXX), however they are basically the same code with different parameters (i.e. different place types) so this calls for code abstraction.
  - All 3 buttons now share the same function placeSearch for a starter. This function has 2 parameters: searchID and placeType. serachID is for identifying which button has been clicked and placeType is an array of place type related to the button clicked. placeType has been declared as a constant at the beginning of map.js
  - The actual nearby search will only takes place when a button has been checked, otherwise the function will remove all the markers related to the button being unchecked (i.e. if tourist attractions button has been unchecked, all markers related to tourist attractions will be removed from the map).
  - The call-back function for nearby search - returnSearch, checks which button has been clicked which button has been checked and calls addMarkers with corresponding parameters in order to display markers on the map.
- Code has been written in a way such that more than 1 button can be checked at the same time and markers will reflect that by overlapping search results.
- However, currently all markers used in nearby search are in default style. In order to avoid confusion a different icon will be used for each place type.

#### 30/05/2018
- Implemented nearby search. No abstraction has been done yet so there is a lot of repetitive code. Will look into it further.
- Toolbar will be reset to default whenever new search for city occurs.

#### 23/05/2018
- Code for option toolbar has been improved for a more elegant implementation - JavaScript was used to adjust the layout of the toolbar (horizontal/ vertical) depending on screen size instead of having two separate pieces of code for each layout. This also prevents possible bug further in development when implementing actions to the toolbar.
- Fall-back solution for geolocation (using London as centre point when page loads) has been fixed so it should work properly now.

#### 19/05/2018
- When page is loaded, the default centre of the map is now set to user's geolocation, provided users permit (a greater zoom will also be applied); otherwise the centre is set to London.
- Place search functionality has been implemented with auto complete capability.


#### 16/05/2018
- User Interface implemented.
- Map's default centre has been set to London; this will be changed to user's geolocation when corresponding code has been implemented.
