import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ScheduleToday.css';
import { HierarchyTree, StudentSubjectTeacherAllocation } from '../store/data';
import TeacherTree from './TeacherTree';
import CurrentSchedule from './CurrentSchedule';

const ScheduleToday = () => {
  const [teacherAttendance, setTeacherAttendance] = useState(HierarchyTree);
  const [teacherAllocation, setTeacherAllocation] = useState(
    StudentSubjectTeacherAllocation
  );

  const findStandbyTeacher = (teacherTree, subject) => {
    let teacherName;
    for (let i = 0; i < teacherTree.length; i++) {
      if (teacherTree[i].subject.includes(subject)) {
        if (teacherTree[i].isStandby) {
          teacherName = teacherTree[i].name;
          break;
        } else {
          teacherName = findStandbyTeacher(teacherTree[i].subordinate, subject);
        }
      }
    }
    return teacherName;
  };

  const getStandbyTeacher = (subject) => {
    return findStandbyTeacher(teacherAttendance, subject);
  };

  const getTeacherAccessor = (currentAccessor, nextIndex) => {
    return currentAccessor.subordinate[nextIndex];
  };

  const getNewIndex = (indexArr) => {
    let newIndex;
    for (let i = 0; i < indexArr.length - 1; i++) {
      if (newIndex) {
        newIndex = `${newIndex}.${indexArr[i]}`;
      } else {
        newIndex = `${indexArr[i]}`;
      }
    }
    return newIndex;
  };

  const getUpdatedTeacher = (newIndex) => {
    let updatedIndex = newIndex;
    let newIndexArr = updatedIndex.split('.');
    let currentAccessor = teacherAttendance[newIndexArr[0]];
    let updatedTeacherValue;
    if (newIndexArr.length > 1) {
      for (let i = 1; i < newIndexArr.length; i++) {
        currentAccessor = getTeacherAccessor(currentAccessor, newIndexArr[i]);
      }
      if (currentAccessor.isPresent) {
        updatedTeacherValue = currentAccessor.name;
      } else {
        updatedIndex = getNewIndex(newIndexArr);
        updatedTeacherValue = getUpdatedTeacher(updatedIndex);
      }
    } else {
      if (currentAccessor.isPresent) {
        updatedTeacherValue = currentAccessor.name;
      } else {
        updatedTeacherValue = 'Not Assigned';
      }
    }
    return updatedTeacherValue;
  };

  const teacherAttendanceChangeHandler = (event, teacherIndex) => {
    const teacherAvailability = event.target.value;

    setTeacherAttendance((prevState) => {
      const indexArr = teacherIndex.split('.');
      if (indexArr.length > 1) {
        let currentAccessor = prevState[indexArr[0]];
        for (let i = 1; i < indexArr.length; i++) {
          currentAccessor = getTeacherAccessor(currentAccessor, indexArr[i]);
        }
        currentAccessor.isPresent = teacherAvailability === 'true' && true;
      } else {
        prevState[indexArr[0]].isPresent =
          teacherAvailability === 'true' && true;
      }
      return [...prevState];
    });

    setTeacherAllocation((prevState) => {
      const indexArr = teacherIndex.split('.');
      let updatedTeacher;
      if (indexArr.length > 1) {
        let currentAccessor = teacherAttendance[indexArr[0]];
        for (let i = 1; i < indexArr.length; i++) {
          currentAccessor = getTeacherAccessor(currentAccessor, indexArr[i]);
        }
        updatedTeacher = currentAccessor;
      } else {
        updatedTeacher = teacherAttendance[indexArr[0]];
      }
      prevState.forEach((studentData) => {
        if (
          studentData.teacher === updatedTeacher.name &&
          updatedTeacher.subject.includes(studentData.subject) &&
          !updatedTeacher.isPresent
        ) {
          if (indexArr.length > 1) {
            let newIndex = getNewIndex(indexArr);
            const updatedTeacherValue = getUpdatedTeacher(newIndex);
            studentData.teacher = updatedTeacherValue;
          } else {
            studentData.teacher = 'Not Assigned';
          }
        }
      });
      return [...prevState];
    });
  };

  useEffect(() => {
    setTeacherAllocation((prevState) => {
      prevState.forEach((studentData) => {
        if (studentData.teacher.trim() === '') {
          studentData.teacher = getStandbyTeacher(studentData.subject);
        }
      });
      return [...prevState];
    });
  }, []);

  return (
    <section className="page-holder">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="bg-body text-center">
              Hogwarts School of Witchcraft and Wizardry
            </h1>
            <h2 className="bg-body text-center">Today's Schedule</h2>
          </div>
          <div className="col-md-6 bordered-col">
            <table className="table" aria-label="Attendance Section">
              <thead>
                <tr>
                  <th>Teacher</th>
                  <th>Attendance</th>
                </tr>
              </thead>
              <tbody>
                {teacherAttendance && teacherAttendance.length > 0 && (
                  <TeacherTree
                    teacherTree={teacherAttendance}
                    attendanceChange={teacherAttendanceChangeHandler}
                  />
                )}
              </tbody>
            </table>
          </div>
          <div className="col-md-6">
            <table className="table" aria-label="Current Schedule Section">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Subject</th>
                  <th>Teacher</th>
                </tr>
              </thead>
              <tbody>
                {teacherAllocation && teacherAllocation.length > 0 && (
                  <CurrentSchedule students={teacherAllocation} />
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleToday;
