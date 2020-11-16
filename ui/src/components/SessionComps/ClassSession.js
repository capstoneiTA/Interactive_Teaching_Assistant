import React, { Component } from "react";
import TeacherUnderstandingMeter from "../uMeters/uMeter_UI_Teacher";
import StudentUnderstandingMeter from "../uMeters/uMeter_UI_Student";
import TeacherClassSessionMenu from "./TeacherClassSessionMenu";
import QuizAccordionList from "../ActivityInit/QuizAcordionList";

import Chat from "../Messaging/Chat";
import ChatDrawer from "../Messaging/ChatDrawer";
import { ChatContextProvider } from "../Messaging/ChatContext";

import axios from "axios";
import StudentActivityContainer from "../ActivityRun/StudentActivityContainer";
import { ActivityMonitorContextProvider } from "../ActivityMonitor/ActivityMonitorContext";
import TeacherActivityMonitorContainer from "../ActivityMonitor/TeacherActivityMonitorContainer";
import StudentExitActivity from "../ActivityRun/StudentExitActivity";
import TicketList from "../ActivityInit/TicketList";

import PageHeader from "../Header/PageHeader";

class ClassSession extends Component {
  constructor(props) {
    super(props);

    if (this.props.location.state !== undefined) {
      this.user = this.props.location.state.user;
      console.log(this.user);
      this.sessionName = this.props.location.state.sessionName;
      this.sessionId = this.props.location.state.sessionId;
    } else {
      this.user = "";
      this.sessionName = "";
      this.sessionId = "";
    }
  }

  //   render() {
  //     if (this.user.type === "Student") {
  //       return (
  //         <div>
  //           <h1>Class Session</h1>
  //           <StudentUnderstandingMeter
  //             value={5}
  //             user={this.user}
  //             sessionName={this.sessionName}
  //             sessionId={this.sessionId}
  //           />

  //           <ChatContextProvider>
  //             <Chat
  //               user={this.user}
  //               sessionName={this.sessionName}
  //               sessionId={this.sessionId}
  //             />
  //           </ChatContextProvider>

  // <<<<<<< messaging-ui-db
  //           <StudentActivityContainer
  //             user={this.user}
  //             sessionName={this.sessionName}
  //           />
  //         </div>
  //       );
  //     } else {
  //       return (
  //         <div>
  //           <h1>Class Session</h1>
  //           <TeacherClassSessionMenu
  //             item1={
  //               <TeacherUnderstandingMeter
  //                 user={this.user}
  //                 sessionName={this.sessionName}
  //                 sessionId={this.sessionId}
  //               />
  //             }
  //             item2={
  //               <QuizAccordionList
  //                 sessionName={this.sessionName}
  //                 user={this.user}
  //               />
  //             }
  //           />
  // =======
  render() {
    if (this.user.type === "Student") {
      return (
        <div>
          <PageHeader
            user={this.user}
            sessionName={this.sessionName}
            designation="STUDENT SESSION"
            history={this.props.history}
          />

          <div style={leftScreen}>
            <div style={uMeterContainer}>
              <div style={uMeterHeader}>Understanding Meter</div>
              <hr style={hrStyle} />
              <div style={uMeterStyle}>
                <StudentUnderstandingMeter
                  value={5}
                  user={this.user}
                  sessionName={this.sessionName}
                  sessionId={this.sessionId}
                />
              </div>
            </div>
            <div style={activityContainer}>
              <StudentExitActivity
                user={this.user}
                sessionName={this.sessionName}
                sessionId={this.sessionId}
              />
              <StudentActivityContainer
                user={this.user}
                sessionName={this.sessionName}
                sessionId={this.sessionId}
              />
            </div>
          </div>

          <div style={rightScreen}>
            <ChatContextProvider>
              <Chat
                user={this.user}
                sessionName={this.sessionName}
                sessionId={this.sessionId}
              />
            </ChatContextProvider>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <PageHeader
            user={this.user}
            sessionName={this.sessionName}
            designation="TEACHER SESSION"
            history={this.props.history}
          />
          <div style={leftScreen}>
            <div style={leftTeacherContainer}>
              <div style={teacherUMeterContainer}>
                <div style={uMeterHeader}>Understanding Meters</div>
                <hr style={teacherHrStyle} />
                <div style={teacherUMeters}>
                  <TeacherUnderstandingMeter
                    user={this.user}
                    sessionName={this.sessionName}
                    sessionId={this.sessionId}
                  />
                </div>
              </div>
              <div style={teacherActivityContainer}>
                <div style={teacherActivityHeader}>Activities</div>
                <hr style={teacherHrStyle} />
                <div style={teacherActivities}>
                  <ActivityMonitorContextProvider>
                    <TeacherClassSessionMenu
                      // item1={<TeacherUnderstandingMeter user={this.user} sessionName = {this.sessionName} sessionId = {this.sessionId}/>}
                      item1={
                        <QuizAccordionList
                          sessionName={this.sessionName}
                          user={this.user}
                        />
                      }
                      item2={
                        <TicketList
                          sessionName={this.sessionName}
                          user={this.user}
                        />
                      }
                    />
                    <TeacherActivityMonitorContainer
                      sessionName={this.sessionName}
                    />
                  </ActivityMonitorContextProvider>
                </div>
              </div>
            </div>
          </div>

          <div style={rightScreen}>
            <ChatContextProvider>
              <Chat
                user={this.user}
                sessionName={this.sessionName}
                sessionId={this.sessionId}
              />
            </ChatContextProvider>
          </div>
        </div>
      );
    }
  }
}
export default ClassSession;
// >>>>>>> feature

//           <ChatContextProvider>
//             <Chat
//               user={this.user}
//               sessionName={this.sessionName}
//               sessionId={this.sessionId}
//             />
//           </ChatContextProvider>
//         </div>
//       );
//     }
//   }
// }

const leftTeacherContainer = {};

const teacherUMeterContainer = {
  // backgroundColor: '#eee',
  width: "90%",
  maxWidth: "800px",

  margin: "auto",
  marginTop: "100px",
  textAlign: "center",
};
const teacherUMeters = {
  // backgroundColor: '#eee',
  width: "max-content",
  margin: "auto",
  height: "300px",
  overflowY: "auto",
};

const teacherHrStyle = {
  marginBottom: "30px",
  borderTop: "2px solid lightgray",
};

const teacherActivityContainer = {
  // backgroundColor: '#eee',
  width: "90%",
  maxWidth: "800px",

  margin: "auto",
  marginTop: "50px",
  textAlign: "center",
};

const teacherActivityHeader = {
  fontSize: "40px",
  color: "#555",
};

const teacherActivities = {
  backgroundColor: "#eee",
  marginBottom: "100px",
};

const leftScreen = {
  height: "100%",
  width: "50%",
  position: "fixed",
  zIndex: "-1",
  top: "0",
  overflowX: "auto",
  paddingTop: "100px",

  left: "0",
};

const rightScreen = {
  height: "100%",
  width: "50%",
  position: "fixed",
  zIndex: "-1",
  top: "0",
  // overflow: 'auto',
  paddingTop: "100px",

  right: "0",
  borderLeft: "2px solid lightgray",

  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
};

const uMeterContainer = {
  // backgroundColor: '#eee',
  width: "90%",
  maxWidth: "800px",
  margin: "auto",
  marginTop: "100px",
  textAlign: "center",
};

const uMeterStyle = {
  width: "90%",
};

const uMeterHeader = {
  fontSize: "40px",
  // fontSize: '2vw',
  color: "#555",
};

const hrStyle = {
  marginBottom: "100px",
  borderTop: "2px solid lightgray",
};

const activityContainer = {
  marginTop: "400px",
  textAlign: "center",
  fontSize: "20px",
};
