import TeacherTree from './TeacherTree';

const TeacherAttendance = ({ teacher, teacherIndex, attendanceChange }) => {
  const output = (
    <tr data-index={teacherIndex} aria-label={teacher.name}>
      <td>
        <div className="row">
          <div className="col-md-4">
            <img
              src={
                teacher.isPresent ? teacher.img.isPresent : teacher.img.isAbsent
              }
              className="img-fluid rounded"
              alt={teacher.name}
            />
          </div>
          <div className="col-md-8">
            <i>{teacher.name}</i>
          </div>
        </div>
      </td>
      <td>
        <select
          value={teacher.isPresent}
          onChange={(event) => attendanceChange(event, teacherIndex)}
        >
          <option value="true">Present</option>
          <option value="false">Absent</option>
        </select>
      </td>
    </tr>
  );

  if (teacher.subordinate.length > 0) {
    return (
      <>
        {output}
        <TeacherTree
          teacherTree={teacher.subordinate}
          teacherIndex={teacherIndex}
          attendanceChange={attendanceChange}
        />
      </>
    );
  } else {
    return output;
  }
};

export default TeacherAttendance;
