## Classes

<dl>
<dt><a href="#ClassChat">ClassChat</a></dt>
<dd></dd>
<dt><a href="#FillInTheBlankQuestion">FillInTheBlankQuestion</a></dt>
<dd><p>Class representing an individual FillInTheBlankQuestion</p>
</dd>
<dt><a href="#Message">Message</a></dt>
<dd><p>The Message class defines any message sent in the class chat.
Messages can be sent, replied to, edited, and deleted</p>
</dd>
<dt><a href="#MultipleChoiceQuestion">MultipleChoiceQuestion</a></dt>
<dd><p>Class representing an individual MultipleChoiceQuestion</p>
</dd>
<dt><a href="#OpenEndedQuestion">OpenEndedQuestion</a></dt>
<dd><p>The OpenEndedQuestion class defines the prompts (question) that will be received
 and set from the database</p>
</dd>
<dt><a href="#Poll">Poll</a></dt>
<dd><p>Class representing an individual poll</p>
</dd>
<dt><a href="#Quiz">Quiz</a></dt>
<dd></dd>
<dt><a href="#Report">Report</a></dt>
<dd></dd>
<dt><a href="#Session">Session</a></dt>
<dd><p>Class representing an individual class session</p>
</dd>
<dt><a href="#UnderstandingMeter">UnderstandingMeter</a></dt>
<dd></dd>
</dl>

<a name="ClassChat"></a>

## ClassChat
**Kind**: global class  

* [ClassChat](#ClassChat)
    * [new ClassChat()](#new_ClassChat_new)
    * [.getMessage()](#ClassChat+getMessage) ⇒ <code>string</code>
    * [.setMessagesFromDb()](#ClassChat+setMessagesFromDb)
    * [.recieveMessageFromUser()](#ClassChat+recieveMessageFromUser)

<a name="new_ClassChat_new"></a>

### new ClassChat()
Creating a chat class (Will have to load messages from database)

<a name="ClassChat+getMessage"></a>

### classChat.getMessage() ⇒ <code>string</code>
Get message from db

**Kind**: instance method of [<code>ClassChat</code>](#ClassChat)  
**Returns**: <code>string</code> - messages from db  
<a name="ClassChat+setMessagesFromDb"></a>

### classChat.setMessagesFromDb()
Update message from db

**Kind**: instance method of [<code>ClassChat</code>](#ClassChat)  
<a name="ClassChat+recieveMessageFromUser"></a>

### classChat.recieveMessageFromUser()
Collect message from User

**Kind**: instance method of [<code>ClassChat</code>](#ClassChat)  
<a name="FillInTheBlankQuestion"></a>

## FillInTheBlankQuestion
Class representing an individual FillInTheBlankQuestion

**Kind**: global class  

* [FillInTheBlankQuestion](#FillInTheBlankQuestion)
    * [new FillInTheBlankQuestion(prompt, answer)](#new_FillInTheBlankQuestion_new)
    * [.getPrompt()](#FillInTheBlankQuestion+getPrompt) ⇒ <code>string</code>
    * [.setPrompt(promptText)](#FillInTheBlankQuestion+setPrompt) ⇒ <code>boolean</code>
    * [.getAnswer()](#FillInTheBlankQuestion+getAnswer) ⇒ <code>int</code>
    * [.setAnswer(answer)](#FillInTheBlankQuestion+setAnswer) ⇒ <code>boolean</code>

<a name="new_FillInTheBlankQuestion_new"></a>

### new FillInTheBlankQuestion(prompt, answer)

| Param | Type | Description |
| --- | --- | --- |
| prompt | <code>string</code> | a question prompt |
| answer | <code>int</code> | index of the correct option. Will be -1 if no answer is necessary. |

<a name="FillInTheBlankQuestion+getPrompt"></a>

### fillInTheBlankQuestion.getPrompt() ⇒ <code>string</code>
get the prompt string

**Kind**: instance method of [<code>FillInTheBlankQuestion</code>](#FillInTheBlankQuestion)  
**Returns**: <code>string</code> - prompt text  
<a name="FillInTheBlankQuestion+setPrompt"></a>

### fillInTheBlankQuestion.setPrompt(promptText) ⇒ <code>boolean</code>
set the question prompt text

**Kind**: instance method of [<code>FillInTheBlankQuestion</code>](#FillInTheBlankQuestion)  
**Returns**: <code>boolean</code> - true on success, false on failure  

| Param | Type | Description |
| --- | --- | --- |
| promptText | <code>string</code> | text for the question prompt |

<a name="FillInTheBlankQuestion+getAnswer"></a>

### fillInTheBlankQuestion.getAnswer() ⇒ <code>int</code>
get the prompt answer

**Kind**: instance method of [<code>FillInTheBlankQuestion</code>](#FillInTheBlankQuestion)  
**Returns**: <code>int</code> - answer index, corresponding to the options list  
<a name="FillInTheBlankQuestion+setAnswer"></a>

### fillInTheBlankQuestion.setAnswer(answer) ⇒ <code>boolean</code>
sets the correct option index

**Kind**: instance method of [<code>FillInTheBlankQuestion</code>](#FillInTheBlankQuestion)  
**Returns**: <code>boolean</code> - true on success, false on failure  

| Param | Type |
| --- | --- |
| answer | <code>int</code> | 

<a name="Message"></a>

## Message
The Message class defines any message sent in the class chat.
Messages can be sent, replied to, edited, and deleted

**Kind**: global class  

* [Message](#Message)
    * [new Message(id, content, replyTo, user)](#new_Message_new)
    * [.getId()](#Message+getId) ⇒ <code>number</code>
    * [.setId(content)](#Message+setId)
    * [.getContent()](#Message+getContent) ⇒ <code>string</code>
    * [.setContent(content)](#Message+setContent)
    * [.getReplyTo()](#Message+getReplyTo) ⇒ [<code>Message</code>](#Message)
    * [.getUser()](#Message+getUser) ⇒ <code>User</code>
    * [.setId(user)](#Message+setId)
    * [.getCreateTime()](#Message+getCreateTime) ⇒ <code>Date</code>
    * [.setCreateTime()](#Message+setCreateTime)

<a name="new_Message_new"></a>

### new Message(id, content, replyTo, user)
Create a message.


| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | The id value. |
| content | <code>string</code> | The content of the message. |
| replyTo | [<code>Message</code>](#Message) | The Message being replied to or Null. |
| user | <code>User</code> | The user who created the message. |

<a name="Message+getId"></a>

### message.getId() ⇒ <code>number</code>
Get the id value.

**Kind**: instance method of [<code>Message</code>](#Message)  
**Returns**: <code>number</code> - The id value.  
<a name="Message+setId"></a>

### message.setId(content)
Set the id value.
Should be used to delete a message, (id = Null), without deleting replies

**Kind**: instance method of [<code>Message</code>](#Message)  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>string</code> | The content of the message. |

<a name="Message+getContent"></a>

### message.getContent() ⇒ <code>string</code>
Get the content value.

**Kind**: instance method of [<code>Message</code>](#Message)  
**Returns**: <code>string</code> - The content of the message.  
<a name="Message+setContent"></a>

### message.setContent(content)
Set the content value.

**Kind**: instance method of [<code>Message</code>](#Message)  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>string</code> | The content of the message. |

<a name="Message+getReplyTo"></a>

### message.getReplyTo() ⇒ [<code>Message</code>](#Message)
Get the replyTo value.

**Kind**: instance method of [<code>Message</code>](#Message)  
**Returns**: [<code>Message</code>](#Message) - The message being replied to.  
<a name="Message+getUser"></a>

### message.getUser() ⇒ <code>User</code>
Get the user value.

**Kind**: instance method of [<code>Message</code>](#Message)  
**Returns**: <code>User</code> - The User who posted the message.  
<a name="Message+setId"></a>

### message.setId(user)
Set the user value.
Should be used to delete a message, (user = Null), without deleting replies

**Kind**: instance method of [<code>Message</code>](#Message)  

| Param | Type | Description |
| --- | --- | --- |
| user | <code>User</code> | The content of the message. |

<a name="Message+getCreateTime"></a>

### message.getCreateTime() ⇒ <code>Date</code>
Get the Date value.

**Kind**: instance method of [<code>Message</code>](#Message)  
**Returns**: <code>Date</code> - The date the message was created or altered.  
<a name="Message+setCreateTime"></a>

### message.setCreateTime()
Set the createTime value.

**Kind**: instance method of [<code>Message</code>](#Message)  
<a name="MultipleChoiceQuestion"></a>

## MultipleChoiceQuestion
Class representing an individual MultipleChoiceQuestion

**Kind**: global class  

* [MultipleChoiceQuestion](#MultipleChoiceQuestion)
    * [new MultipleChoiceQuestion(prompt, options, answer)](#new_MultipleChoiceQuestion_new)
    * [.getPrompt()](#MultipleChoiceQuestion+getPrompt) ⇒ <code>string</code>
    * [.setPrompt(promptText)](#MultipleChoiceQuestion+setPrompt) ⇒ <code>boolean</code>
    * [.getOptions()](#MultipleChoiceQuestion+getOptions) ⇒ <code>string</code>
    * [.setOptions(options)](#MultipleChoiceQuestion+setOptions) ⇒ <code>boolean</code>
    * [.getAnswer()](#MultipleChoiceQuestion+getAnswer) ⇒ <code>int</code>
    * [.setAnswer(answer)](#MultipleChoiceQuestion+setAnswer) ⇒ <code>boolean</code>

<a name="new_MultipleChoiceQuestion_new"></a>

### new MultipleChoiceQuestion(prompt, options, answer)

| Param | Type | Description |
| --- | --- | --- |
| prompt | <code>string</code> | a question prompt |
| options | <code>Array.&lt;string&gt;</code> | a list of options to choose from for the given prompt |
| answer | <code>int</code> | index of the correct option. Will be -1 if no answer is necessary. |

<a name="MultipleChoiceQuestion+getPrompt"></a>

### multipleChoiceQuestion.getPrompt() ⇒ <code>string</code>
get the prompt string

**Kind**: instance method of [<code>MultipleChoiceQuestion</code>](#MultipleChoiceQuestion)  
**Returns**: <code>string</code> - prompt text  
<a name="MultipleChoiceQuestion+setPrompt"></a>

### multipleChoiceQuestion.setPrompt(promptText) ⇒ <code>boolean</code>
set the question prompt text

**Kind**: instance method of [<code>MultipleChoiceQuestion</code>](#MultipleChoiceQuestion)  
**Returns**: <code>boolean</code> - true on success, false on failure  

| Param | Type | Description |
| --- | --- | --- |
| promptText | <code>string</code> | text for the question prompt |

<a name="MultipleChoiceQuestion+getOptions"></a>

### multipleChoiceQuestion.getOptions() ⇒ <code>string</code>
get the prompt string

**Kind**: instance method of [<code>MultipleChoiceQuestion</code>](#MultipleChoiceQuestion)  
**Returns**: <code>string</code> - prompt text  
<a name="MultipleChoiceQuestion+setOptions"></a>

### multipleChoiceQuestion.setOptions(options) ⇒ <code>boolean</code>
set question options

**Kind**: instance method of [<code>MultipleChoiceQuestion</code>](#MultipleChoiceQuestion)  
**Returns**: <code>boolean</code> - true on success, false on failure  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Array.&lt;string&gt;</code> | a list of question options |

<a name="MultipleChoiceQuestion+getAnswer"></a>

### multipleChoiceQuestion.getAnswer() ⇒ <code>int</code>
get the prompt answer

**Kind**: instance method of [<code>MultipleChoiceQuestion</code>](#MultipleChoiceQuestion)  
**Returns**: <code>int</code> - answer index, corresponding to the options list  
<a name="MultipleChoiceQuestion+setAnswer"></a>

### multipleChoiceQuestion.setAnswer(answer) ⇒ <code>boolean</code>
sets the correct option index

**Kind**: instance method of [<code>MultipleChoiceQuestion</code>](#MultipleChoiceQuestion)  
**Returns**: <code>boolean</code> - true on success, false on failure  

| Param | Type |
| --- | --- |
| answer | <code>int</code> | 

<a name="OpenEndedQuestion"></a>

## OpenEndedQuestion
The OpenEndedQuestion class defines the prompts (question) that will be received
 and set from the database

**Kind**: global class  

* [OpenEndedQuestion](#OpenEndedQuestion)
    * [new OpenEndedQuestion(prompt)](#new_OpenEndedQuestion_new)
    * [.getPrompt()](#OpenEndedQuestion+getPrompt) ⇒ <code>string</code>
    * [.setPrompt()](#OpenEndedQuestion+setPrompt)

<a name="new_OpenEndedQuestion_new"></a>

### new OpenEndedQuestion(prompt)
Choose and display openEnded question


| Param | Type | Description |
| --- | --- | --- |
| prompt | <code>string</code> | The question or statement that will be displayed |

<a name="OpenEndedQuestion+getPrompt"></a>

### openEndedQuestion.getPrompt() ⇒ <code>string</code>
Get the prompt string.

**Kind**: instance method of [<code>OpenEndedQuestion</code>](#OpenEndedQuestion)  
**Returns**: <code>string</code> - The question/statement that will be responsible to connect with DB.  
<a name="OpenEndedQuestion+setPrompt"></a>

### openEndedQuestion.setPrompt()
Set the question/statement.

**Kind**: instance method of [<code>OpenEndedQuestion</code>](#OpenEndedQuestion)  
<a name="Poll"></a>

## Poll
Class representing an individual poll

**Kind**: global class  

* [Poll](#Poll)
    * [new Poll(question, pollId)](#new_Poll_new)
    * [.getPollQuestion()](#Poll+getPollQuestion) ⇒ [<code>MultipleChoiceQuestion</code>](#MultipleChoiceQuestion)
    * [.setPollQuestion(question)](#Poll+setPollQuestion) ⇒ <code>boolean</code>
    * [.getPollId()](#Poll+getPollId) ⇒ <code>int</code>
    * [.setPollId(id)](#Poll+setPollId) ⇒ <code>boolean</code>
    * [.handlePollResponse(response)](#Poll+handlePollResponse) ⇒ <code>boolean</code>

<a name="new_Poll_new"></a>

### new Poll(question, pollId)

| Param | Type | Description |
| --- | --- | --- |
| question | [<code>MultipleChoiceQuestion</code>](#MultipleChoiceQuestion) | a multiple choice question object to ask for the poll |
| pollId | <code>int</code> | poll id from database |

<a name="Poll+getPollQuestion"></a>

### poll.getPollQuestion() ⇒ [<code>MultipleChoiceQuestion</code>](#MultipleChoiceQuestion)
returns the current poll question

**Kind**: instance method of [<code>Poll</code>](#Poll)  
**Returns**: [<code>MultipleChoiceQuestion</code>](#MultipleChoiceQuestion) - the current poll question  
<a name="Poll+setPollQuestion"></a>

### poll.setPollQuestion(question) ⇒ <code>boolean</code>
sets the current poll question

**Kind**: instance method of [<code>Poll</code>](#Poll)  
**Returns**: <code>boolean</code> - true on success, false on failure  

| Param | Type |
| --- | --- |
| question | [<code>MultipleChoiceQuestion</code>](#MultipleChoiceQuestion) | 

<a name="Poll+getPollId"></a>

### poll.getPollId() ⇒ <code>int</code>
returns the current poll id, which is set from the database

**Kind**: instance method of [<code>Poll</code>](#Poll)  
**Returns**: <code>int</code> - the current pollid, set from the database  
<a name="Poll+setPollId"></a>

### poll.setPollId(id) ⇒ <code>boolean</code>
sets the current poll id from the database

**Kind**: instance method of [<code>Poll</code>](#Poll)  
**Returns**: <code>boolean</code> - true on success, false on failure  

| Param | Type |
| --- | --- |
| id | <code>int</code> | 

<a name="Poll+handlePollResponse"></a>

### poll.handlePollResponse(response) ⇒ <code>boolean</code>
handles incoming poll responses from clients and stores them

**Kind**: instance method of [<code>Poll</code>](#Poll)  
**Returns**: <code>boolean</code> - true on success, false on failure  

| Param | Type | Description |
| --- | --- | --- |
| response | <code>int</code> | a response from the client, corresponding to a question option index |

<a name="Quiz"></a>

## Quiz
**Kind**: global class  

* [Quiz](#Quiz)
    * [new Quiz()](#new_Quiz_new)
    * [.randomizeQuestionOrder()](#Quiz+randomizeQuestionOrder) ⇒ <code>Array.&lt;QuizQuestion&gt;</code>
    * [.handleQuizResponse()](#Quiz+handleQuizResponse)
    * [.getMultipleChoiceQs()](#Quiz+getMultipleChoiceQs) ⇒ [<code>Array.&lt;MultipleChoiceQuestion&gt;</code>](#MultipleChoiceQuestion)
    * [.setMultipleChoiceQs()](#Quiz+setMultipleChoiceQs)
    * [.getFillInTheBlankQs()](#Quiz+getFillInTheBlankQs) ⇒ [<code>Array.&lt;FillInTheBlankQuestion&gt;</code>](#FillInTheBlankQuestion)
    * [.setFillInTheBlankQs()](#Quiz+setFillInTheBlankQs)
    * [.getOpenEndedQs()](#Quiz+getOpenEndedQs) ⇒ [<code>OpenEndedQuestion</code>](#OpenEndedQuestion)
    * [.setOpenEndedQs()](#Quiz+setOpenEndedQs)

<a name="new_Quiz_new"></a>

### new Quiz()
Represents a quiz which can hold multiple choice, fill in the blank, and open ended questions

<a name="Quiz+randomizeQuestionOrder"></a>

### quiz.randomizeQuestionOrder() ⇒ <code>Array.&lt;QuizQuestion&gt;</code>
methed compiles all questions into one list in a random order

**Kind**: instance method of [<code>Quiz</code>](#Quiz)  
**Returns**: <code>Array.&lt;QuizQuestion&gt;</code> - - a QuizQuestion is either a MultipleChoiceQuestion, FillInTheBlankQuestion, or OpenEndedQuestion  
<a name="Quiz+handleQuizResponse"></a>

### quiz.handleQuizResponse()
method handles a quiz response

**Kind**: instance method of [<code>Quiz</code>](#Quiz)  
<a name="Quiz+getMultipleChoiceQs"></a>

### quiz.getMultipleChoiceQs() ⇒ [<code>Array.&lt;MultipleChoiceQuestion&gt;</code>](#MultipleChoiceQuestion)
method returns multiple choice question array

**Kind**: instance method of [<code>Quiz</code>](#Quiz)  
<a name="Quiz+setMultipleChoiceQs"></a>

### quiz.setMultipleChoiceQs()
method sets the multiple choice question array

**Kind**: instance method of [<code>Quiz</code>](#Quiz)  
<a name="Quiz+getFillInTheBlankQs"></a>

### quiz.getFillInTheBlankQs() ⇒ [<code>Array.&lt;FillInTheBlankQuestion&gt;</code>](#FillInTheBlankQuestion)
method returns fill in the blank question array

**Kind**: instance method of [<code>Quiz</code>](#Quiz)  
<a name="Quiz+setFillInTheBlankQs"></a>

### quiz.setFillInTheBlankQs()
method sets the fill in the blank question array

**Kind**: instance method of [<code>Quiz</code>](#Quiz)  
<a name="Quiz+getOpenEndedQs"></a>

### quiz.getOpenEndedQs() ⇒ [<code>OpenEndedQuestion</code>](#OpenEndedQuestion)
method returns the open ended question array

**Kind**: instance method of [<code>Quiz</code>](#Quiz)  
<a name="Quiz+setOpenEndedQs"></a>

### quiz.setOpenEndedQs()
method sets the open ended question array

**Kind**: instance method of [<code>Quiz</code>](#Quiz)  
<a name="Report"></a>

## Report
**Kind**: global class  
**Constuctor**:   

* [Report](#Report)
    * [new Report(ClassChat)](#new_Report_new)
    * [.getUnderstandingMeters()](#Report+getUnderstandingMeters) ⇒ [<code>Array.&lt;UnderstandingMeter&gt;</code>](#UnderstandingMeter)
    * [.getPolls()](#Report+getPolls) ⇒ [<code>Array.&lt;Poll&gt;</code>](#Poll)
    * [.getQuizzes()](#Report+getQuizzes) ⇒ [<code>Array.&lt;Quiz&gt;</code>](#Quiz)
    * [.getSessionChat()](#Report+getSessionChat) ⇒ [<code>ClassChat</code>](#ClassChat)

<a name="new_Report_new"></a>

### new Report(ClassChat)
Represents a Report object that holds session info/stats


| Param | Type | Description |
| --- | --- | --- |
| ClassChat | [<code>ClassChat</code>](#ClassChat) | object containing messages |

<a name="Report+getUnderstandingMeters"></a>

### report.getUnderstandingMeters() ⇒ [<code>Array.&lt;UnderstandingMeter&gt;</code>](#UnderstandingMeter)
method to retrieve understanding meters

**Kind**: instance method of [<code>Report</code>](#Report)  
<a name="Report+getPolls"></a>

### report.getPolls() ⇒ [<code>Array.&lt;Poll&gt;</code>](#Poll)
method to retrieve polls

**Kind**: instance method of [<code>Report</code>](#Report)  
<a name="Report+getQuizzes"></a>

### report.getQuizzes() ⇒ [<code>Array.&lt;Quiz&gt;</code>](#Quiz)
method to retrieve quizzes

**Kind**: instance method of [<code>Report</code>](#Report)  
<a name="Report+getSessionChat"></a>

### report.getSessionChat() ⇒ [<code>ClassChat</code>](#ClassChat)
method to retrieve session chat

**Kind**: instance method of [<code>Report</code>](#Report)  
<a name="Session"></a>

## Session
Class representing an individual class session

**Kind**: global class  

* [Session](#Session)
    * [new Session(sessionName, owner, report)](#new_Session_new)
    * [.getUsers()](#Session+getUsers) ⇒ <code>Array.&lt;string&gt;</code>
    * [.setUsers(users)](#Session+setUsers) ⇒ <code>boolean</code>
    * [.addUser(user)](#Session+addUser) ⇒ <code>boolean</code>
    * [.getOwner()](#Session+getOwner) ⇒ <code>string</code>
    * [.setOwner(owner)](#Session+setOwner) ⇒ <code>boolean</code>
    * [.getSessionName()](#Session+getSessionName) ⇒ <code>string</code>
    * [.setSessionName(name)](#Session+setSessionName) ⇒ <code>boolean</code>
    * [.getElapsedTime()](#Session+getElapsedTime) ⇒ <code>int</code>

<a name="new_Session_new"></a>

### new Session(sessionName, owner, report)

| Param | Description |
| --- | --- |
| sessionName | the name of the session, used to join |
| owner | the name of the user who created the session |
| report | report object holding class session information |

<a name="Session+getUsers"></a>

### session.getUsers() ⇒ <code>Array.&lt;string&gt;</code>
gets a list of current users

**Kind**: instance method of [<code>Session</code>](#Session)  
**Returns**: <code>Array.&lt;string&gt;</code> - a list of users  
<a name="Session+setUsers"></a>

### session.setUsers(users) ⇒ <code>boolean</code>
sets the users list

**Kind**: instance method of [<code>Session</code>](#Session)  
**Returns**: <code>boolean</code> - true for success, false for failure  

| Param | Type |
| --- | --- |
| users | <code>Array.&lt;string&gt;</code> | 

<a name="Session+addUser"></a>

### session.addUser(user) ⇒ <code>boolean</code>
adds a user to the session as well as the users list

**Kind**: instance method of [<code>Session</code>](#Session)  
**Returns**: <code>boolean</code> - true for success, false for failure  

| Param | Type |
| --- | --- |
| user | <code>string</code> | 

<a name="Session+getOwner"></a>

### session.getOwner() ⇒ <code>string</code>
gets the name of the user who controls the session

**Kind**: instance method of [<code>Session</code>](#Session)  
**Returns**: <code>string</code> - owner name  
<a name="Session+setOwner"></a>

### session.setOwner(owner) ⇒ <code>boolean</code>
sets the name of the user who controls the session

**Kind**: instance method of [<code>Session</code>](#Session)  
**Returns**: <code>boolean</code> - true for success, false for failure  

| Param | Type |
| --- | --- |
| owner | <code>string</code> | 

<a name="Session+getSessionName"></a>

### session.getSessionName() ⇒ <code>string</code>
gets the name of the session

**Kind**: instance method of [<code>Session</code>](#Session)  
**Returns**: <code>string</code> - name of the session  
<a name="Session+setSessionName"></a>

### session.setSessionName(name) ⇒ <code>boolean</code>
sets the name of the session

**Kind**: instance method of [<code>Session</code>](#Session)  
**Returns**: <code>boolean</code> - true for success, false for failure  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

<a name="Session+getElapsedTime"></a>

### session.getElapsedTime() ⇒ <code>int</code>
calculates the time from session start to the current time in seconds

**Kind**: instance method of [<code>Session</code>](#Session)  
**Returns**: <code>int</code> - elapsed time in seconds  
<a name="UnderstandingMeter"></a>

## UnderstandingMeter
**Kind**: global class  

* [UnderstandingMeter](#UnderstandingMeter)
    * [new UnderstandingMeter(score, user, history)](#new_UnderstandingMeter_new)
    * [.getScore()](#UnderstandingMeter+getScore) ⇒ <code>Number</code>
    * [.setScore(newScore)](#UnderstandingMeter+setScore)
    * [.getUser()](#UnderstandingMeter+getUser) ⇒ <code>string</code>
    * [.recordChange()](#UnderstandingMeter+recordChange)
    * [.getTime()](#UnderstandingMeter+getTime) ⇒ <code>Date</code>

<a name="new_UnderstandingMeter_new"></a>

### new UnderstandingMeter(score, user, history)
Creating an understanding meter class


| Param | Type | Description |
| --- | --- | --- |
| score | <code>int</code> | the score from student |
| user | <code>string</code> | name of the user |
| history | <code>object</code> | record changes {K = time: V = {score:int}} |

<a name="UnderstandingMeter+getScore"></a>

### understandingMeter.getScore() ⇒ <code>Number</code>
Return the understanding score of the student

**Kind**: instance method of [<code>UnderstandingMeter</code>](#UnderstandingMeter)  
**Returns**: <code>Number</code> - student's score  
<a name="UnderstandingMeter+setScore"></a>

### understandingMeter.setScore(newScore)
Allows modification of score

**Kind**: instance method of [<code>UnderstandingMeter</code>](#UnderstandingMeter)  

| Param | Type | Description |
| --- | --- | --- |
| newScore | <code>int</code> | the new score to be updated |

<a name="UnderstandingMeter+getUser"></a>

### understandingMeter.getUser() ⇒ <code>string</code>
Return the name of the user

**Kind**: instance method of [<code>UnderstandingMeter</code>](#UnderstandingMeter)  
**Returns**: <code>string</code> - user  
<a name="UnderstandingMeter+recordChange"></a>

### understandingMeter.recordChange()
Update the history object of the user

**Kind**: instance method of [<code>UnderstandingMeter</code>](#UnderstandingMeter)  
<a name="UnderstandingMeter+getTime"></a>

### understandingMeter.getTime() ⇒ <code>Date</code>
Return the current time of session during run time

**Kind**: instance method of [<code>UnderstandingMeter</code>](#UnderstandingMeter)  
**Returns**: <code>Date</code> - currTime - the current time when the func is called  
