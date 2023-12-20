const CurrentSchedule = ({ students }) => {
  return students.map((studentData, index) => (
    <tr key={index} aria-label={studentData.name}>
      <td>
        <div className="row">
          <div className="col-md-4">
            <img
              src={
                studentData.teacher !== 'Not Assigned'
                  ? studentData.img.isPresent
                  : studentData.img.isAbsent
              }
              className="img-fluid rounded"
              alt={studentData.name}
            />
          </div>
          <div className="col-md-8">
            <i>{studentData.name}</i>
          </div>
        </div>
      </td>
      <td>{studentData.subject}</td>
      <td>{studentData.teacher}</td>
    </tr>
  ));
};

export default CurrentSchedule;
