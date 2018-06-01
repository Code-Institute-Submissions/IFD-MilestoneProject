# Interactive Frontend Development Milestone project

### The aim of this Sing Page Application (SPA) is to allow users search for useful holiday information for a particular city such as tourist attractions, accommodations and restaurants. This SPA will be implemented using several APIs such as Google Maps and Geolocation.

### Update Log
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
