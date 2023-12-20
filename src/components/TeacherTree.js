import TeacherAttendance from './TeacherAttendance';

const TeacherTree = ({ teacherTree, teacherIndex, attendanceChange }) => {
  return (
    <>
      {teacherTree.map((teacher, index) => (
        <TeacherAttendance
          key={index}
          teacher={teacher}
          teacherIndex={
            teacherIndex !== undefined ? `${teacherIndex}.${index}` : `${index}`
          }
          attendanceChange={attendanceChange}
        />
      ))}
    </>
  );
};

export default TeacherTree;
