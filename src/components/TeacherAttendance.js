const TeacherAttendance = ({ teachers, attendanceChange }) => {
  return teachers.map((teacher, index) => (
    <tr key={index} data-index={teacher.teacherIndex} aria-label={teacher.name}>
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
          onChange={(event) => attendanceChange(event, teacher.teacherIndex)}
        >
          <option value="true">Present</option>
          <option value="false">Absent</option>
        </select>
      </td>
    </tr>
  ));
};

export default TeacherAttendance;
