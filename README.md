# Interactive Frontend Development Milestone project

### The aim of this Sing Page Application (SPA) is to allow users search for useful holiday information for a particular city such as tourist attractions, accommodations and restaurants. This SPA will be implemented using several APIs such as Google Maps and Geolocation.

### Update Log
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
