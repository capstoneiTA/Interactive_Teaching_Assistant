# Interactive_Teaching_Assistant

## iTA Overview
The Interactive Teaching Assistant is an application that assists educators in creating a more engaging classroom experience, while also gauging student understanding of the material in real time.

The Interactive Teaching Assistant provides many features that fill gaps taken for granted in face-to-face classrooms, as well as providing new tools that augment interactivity and enjoyment in the classroom.

Ultimately, the Interactive Teaching Assistant aims to lessen the challenges that remote learning offers, while also augmenting the many advantages of teaching online. 




## Instructions to run the application
- Download and install docker here: https://docs.docker.com/get-docker/
- Download and install node here: https://nodejs.org/en/download/
- From the root directory run `docker-compose up --build`
- If the application runs successfully, it should appear on http://localhost:3000/
- To remove containers, run `docker-compose down`


## Instructions to run mocha test suite
- From the root directory run `docker-compose run test npm test`
- After changes to the code, run `docker-compose down` before running a new test run


## Site URL (Just Added. Recommended over installing and running locally)
http://ec2-52-15-164-12.us-east-2.compute.amazonaws.com:3000/

## Usage and Testing Instructions
Thank you for testing the Interactive teaching assistant! For best results, complete the tests in the order listed below.
### How to sign-up / sign-in  

**Sign-up**  
- Click sign-up on launch screen
- Enter first & last name, email, and password, select whether you are a teacher or student, and click sign-up
- Upon success, you will be redirected to the sign-in page where you will put in the email and password you used to sign up  

**Sign-in**  
- Click sign-in on launch screen
- Enter email and password and click sign-in

### Session creation
| Steps                                                     | Expected                                                    |
|-----------------------------------------------------------|-------------------------------------------------------------|
| 1. Sign in as a teacher                                   | Dashboard should have the option to create session          |
| 2. Click on “New Session Name” box under “Create Session” | The box should focus and ask for input                      |
| 3. Enter the name for the new session                     | The name should appear in the box                           |
| 4. Click the arrow icon to create                         | A message will appear to notify that the session is created |

### Session Join (with form fill-in)
| Steps                                               | Expected                                                  |
|-----------------------------------------------------|-----------------------------------------------------------|
| 1. Sign in either as teacher or student             | Dashboard should have the option to join a session        |
| 2. Click on “Session Name” box under “Join Session” | The box should focus and ask for input                    |
| 3. Enter the name of the session                    | The name should appear in the box                         |
| 4. Click the arrow icon to join                     | User should be taken to the session if the session exists |

### Session Join (with enrollment list)
| Steps                                   | Expected                                                                                                                          |
|-----------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| 1. Sign in either as teacher or student | Dashboard should have “Enrollment List” available at the bottom                                                                   |
| 2. Click on “Enrollment List” to open   | A list of sessions that you have joined in the past should appear(i.e. You have joined using the join session method once before) |
| 3. Click on a session name to join      | User should be taken to the selected session                                                                                      |

### Quiz Creation
| Step                                                                 | Expected                                           |
|----------------------------------------------------------------------|----------------------------------------------------|
| 1. Sign in to teacher account                                        | User navigates to teacher dashboard                |
| 2. Click the “Create Activity” button                                | Activity Creation modal appears with three options |
| 3. Choose “Quiz”                                                     | Quiz Creation menu appears                         |
| 4. Fill in the quiz name, prompt, and options for the first question | Nothing happens                                    |
| 5. Press the + button                                                | Another blank quiz question form appears           |
| 6. Press the “Create!” button                                        | Nothing visually happens, but quiz is created      |
| 7. Click away from Modal to close                                    | Modal disappears                                   |


### View Quizzes
| Step                                                                                                                              | Expected                                                                                   |
|-----------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| 1. Sign into teacher account and create a quiz                                                                                    | User is currently on Dashboard page                                                        |
| 2. Join a session either by typing a name into the “Join Session” form, or by choosing a past enrollment from the Enrollment List | User is navigated to the class session                                                     |
| 3. Select “Quizzes” from the left menu                                                                                            | List of created quizzes appears in the middle menu, including the recently created quiz    |
| 4. Select the “V” symbol on the left of a quizz accordion                                                                         | The quiz expands to show all questions, with correct answers in green and incorrect in red |

### Start Quiz
| Step                                                                                                                   | Expected                                                                                                             |
|------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------|
| 1. In two different chrome browsers (one normal, one incognito mode), log into a student account and a teacher account | Both browsers open to the dashboard                                                                                  |
| 2. In both browsers, enter the session “test”                                                                          | Both navigate to the class session, the teacher view should see the student’s understanding meter                    |
| 3. In the teacher browser, open the “Quizzes” menu on the left                                                         | A list of created quizzes should appear in the middle menu                                                           |
| 4. In the teacher browser, click the “Start” button for any quiz                                                       | The student browser should have the quiz text appear on their screen. The Teacher’s screen should toggle open/closed |

### Classroom chat
| Steps                                                                                                                           | Expected                                                                                                                                                                     |
|---------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1. In two different chrome browsers (one normal, one incognito mode), log into two seperate accounts and join the same session. | The Session name should be the same for both accounts.                                                                                                                       |
| 2. Click on the text box inside of the chat box then type a message and click the send message button.                          | The message you just sent along with the accounts username should appear in the chat box.                                                                                    |
| 3. Go to the other account and view the chat box.                                                                               | The message from the other account should appear in this windows chat box as well. (If a message does not appear, click the send message button and the chat should show up) |                                                                             |
