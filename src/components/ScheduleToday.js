import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ScheduleToday.css';
import { HierarchyTree, StudentSubjectTeacherAllocation } from '../store/data';
import CurrentSchedule from './CurrentSchedule';
import TeacherAttendance from './TeacherAttendance';

const ScheduleToday = () => {
  // make teachers hierarchy tree, a flat array of teachers
  const giveTeachers = (teacherTree) => {
    let teachers = [];
    const treeToPlainArray = (teacherTree, teacherIndex) => {
      teacherTree.forEach((element, index) => {
        const tIndex =
          teacherIndex !== undefined ? `${teacherIndex}.${index}` : `${index}`;
        const elementObj = {};
        for (const prop in element) {
          if (prop !== 'subordinate') {
            elementObj[prop] = element[prop];
          }
        }
        teachers.push({
          ...elementObj,
          teacherIndex: tIndex,
        });
        if (element.subordinate.length > 0) {
          treeToPlainArray(element.subordinate, tIndex);
        }
      });
    };

    treeToPlainArray(teacherTree);
    return teachers;
  };

  const [teacherAttendance, setTeacherAttendance] = useState(
    giveTeachers(HierarchyTree)
  );
  const [teacherAllocation, setTeacherAllocation] = useState(
    StudentSubjectTeacherAllocation
  );

  const findStandbyTeacher = (teachers, subject) => {
    let teacherName;
    for (let i = 0; i < teachers.length; i++) {
      if (teachers[i].subject.includes(subject)) {
        if (teachers[i].isStandby) {
          teacherName = teachers[i].name;
          break;
        }
      }
    }
    return teacherName;
  };

  const getStandbyTeacher = (subject) => {
    return findStandbyTeacher(teacherAttendance, subject);
  };

  const getUpdatedTeacher = (newIndex) => {
    let updatedIndex = newIndex;
    let newIndexArr = updatedIndex.split('.');
    let currentAccessor = teacherAttendance.find(
      (teacher) => teacher.teacherIndex === updatedIndex
    );
    let updatedTeacherValue;
    if (currentAccessor.isPresent) {
      updatedTeacherValue = currentAccessor.name;
    } else {
      if (newIndexArr.length > 1) {
        newIndexArr.pop();
        updatedTeacherValue = getUpdatedTeacher(newIndexArr.join('.'));
      } else {
        updatedTeacherValue = 'Not Assigned';
      }
    }
    return updatedTeacherValue;
  };

  const teacherAttendanceChangeHandler = (event, teacherIndex) => {
    const teacherAvailability = event.target.value;

    setTeacherAttendance((prevState) => {
      prevState.forEach((teacher) => {
        if (teacher.teacherIndex === teacherIndex) {
          teacher.isPresent = teacherAvailability === 'true' && true;
        }
      });
      return [...prevState];
    });

    setTeacherAllocation((prevState) => {
      const indexArr = teacherIndex.split('.');
      const updatedTeacher = teacherAttendance.find(
        (teacher) => teacher.teacherIndex === teacherIndex
      );
      prevState.forEach((studentData) => {
        if (updatedTeacher.subject.includes(studentData.subject)) {
          if (!updatedTeacher.isPresent) {
            if (studentData.teacher === updatedTeacher.name) {
              if (indexArr.length > 1) {
                const parentIndexArr = [...indexArr];
                parentIndexArr.pop();
                const updatedTeacherValue = getUpdatedTeacher(
                  parentIndexArr.join('.')
                );
                studentData.teacher = updatedTeacherValue;
              } else {
                studentData.teacher = 'Not Assigned';
              }
            }
          } else if (updatedTeacher.isPresent) {
            const currentTeacher = teacherAttendance.find(
              (teacher) => teacher.name === studentData.teacher
            );
            if (currentTeacher === undefined) {
              studentData.teacher = updatedTeacher.name;
            } else {
              const currentTeacherIndexArr =
                currentTeacher.teacherIndex.split('.');
              if (currentTeacherIndexArr.length < indexArr.length) {
                studentData.teacher = updatedTeacher.name;
              }
            }
          }
        }
      });
      return [...prevState];
    });
  };

  useEffect(() => {
    // fill not allocated teacher with teacher higher up in the hierarchy tree
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
                  <TeacherAttendance
                    teachers={teacherAttendance}
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
