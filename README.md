# Interactive_Teaching_Assistant

## iTA Overview
The Interactive Teaching Assistant is an application that assists educators in creating a more engaging classroom experience, while also gauging student understanding of the material in real time.

The Interactive Teaching Assistant provides many features that fill gaps taken for granted in face-to-face classrooms, as well as providing new tools that augment interactivity and enjoyment in the classroom.

Ultimately, the Interactive Teaching Assistant aims to lessen the challenges that remote learning offers, while also augmenting the many advantages of teaching online. 




## Instructions to run the application
- Download and install docker here: https://docs.docker.com/get-docker/
- Download and install node here: https://nodejs.org/en/download/
- Clone the latest release version  
- From the root directory run `docker-compose up --build` (Only for first time installation)
- If the application runs successfully, it should appear on http://localhost:3000/
- To remove containers, run `docker-compose down`
- To start next time, run `docker-compose up` 

## Instructions to run mocha test suite
- Start the application with `docker-compose up`
- From the root directory run `docker-compose run test npm test`

## Site URL (Just Added. Recommended over installing and running locally)
http://ec2-52-15-164-12.us-east-2.compute.amazonaws.com:3000/

## Application Features
### Sign up/Sign in
- Upon launch, the user will be asked to sign in or sign up
- First time users will have to sign up and will then be redirected to the sign in page

### Session Create/Join
- Teachers have the ability to create class sessions, which students can join by name
- Many sessions can occur on the server at once, and each is isolated from the others

### Quiz
- Teachers can create quizzes ahead of time that they can assign to students during a class session
- Teachers see how the class is doing in real time

### Poll
- Teacher can create poll in dashboard
- Teacher can see student’s submission in real time

### Exit Ticket
- Teacher can initiate an exit ticket to students 
- Teacher can see student’s submission in real time

### Class Chat
- Users can chat in real time
- Users can reply to other users in real time

### Understanding Meter
- Each student has an understanding meter that they can use throughout a class to show the teacher how well they are understanding the material
- Teachers see an individual meter for each student as well as a class average                                                              
