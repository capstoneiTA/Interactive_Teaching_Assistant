## Classes

<dl>
<dt><a href="#ClassChat">ClassChat</a></dt>
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
