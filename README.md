# @@time(at a time)

## Idea
On a Wednesday night traveling by cab, I felt how many people would be doing the same activity as me at the same time. That's when I started implementing @@time(at a time). 

@@time is a simple application that lets users mark their current activity and then check the list of
other users doing the same activity at that time around the world.

> Check the final working version [here](https://atatime-wmqjt.mongodbstitch.com/)
> Check the react-native version [here](https://github.com/pdhruv93/atatime-react-native-final)

## Tech Stack used
- **Frontend:** React(18.1.0) and TypeScipt, [React MUI(Material UI)](https://mui.com/)
- **Backend:** MongoDB Atlas DB and MongoDB Atlas App Services(Serverless functions, Triggers)
- **Other:** Google OAuth2, Google Maps, Formik+Yup


## Sample Screenshots
### Home Screen
![](screenshots/home_screen.PNG)

### One Tap Google Login
![](screenshots/on_tap_login.PNG)

### Modal showing App instructions
![](screenshots/about_modal.PNG)

### Activities list coming from MongoDB
![](screenshots/activities_list.PNG)

### User Profile Modal and update sections
![](screenshots/profile_section.PNG)

### Modal showing other users who are doing same activity whenever user marks any activity alongwith their markers on the map
![](screenshots/other_users.PNG)

### Google Cloud Platform used for Google Maps and OAuth2
![](screenshots/gcp.PNG)

### MongoDB Atlas screenshot showing serverless functions. There is a lot happening as serverless architecture
![](screenshots/mongodb_functions.PNG)


## Dev related Info
### Create react app
npx create-react-app my-app --template typescript

### Linting and Prettier
https://blog.devgenius.io/eslint-prettier-typescript-and-react-in-2022-e5021ebca2b1

### Old Dependency issues
npm install modulename --legacy-peer-deps