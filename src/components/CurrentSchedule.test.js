import { render, screen, within } from '@testing-library/react';
import CurrentSchedule from './CurrentSchedule';

const AvailableSubjects = ['Potions Master', 'Defense Against the Dark Arts'];
const StudentSubjectTeacherAllocation = [
  {
    name: 'Harry Potter',
    subject: AvailableSubjects[0],
    teacher: 'Horace Slughorn',
  },
  {
    name: 'Hermione Granger',
    subject: AvailableSubjects[0],
    teacher: '',
  },
  {
    name: 'Ron Weasley',
    subject: AvailableSubjects[0],
    teacher: '',
  },
  {
    name: 'Draco Malfoy',
    subject: AvailableSubjects[0],
    teacher: 'Horace Slughorn',
  },
  {
    name: 'Padma Patil',
    subject: AvailableSubjects[0],
    teacher: '',
  },
  {
    name: 'Luna Lovegood',
    subject: AvailableSubjects[0],
    teacher: 'Severus Snape',
  },
];

test('receives a list of students and renders all on the document', () => {
  render(
    <table>
      <tbody>
        <CurrentSchedule students={StudentSubjectTeacherAllocation} />
      </tbody>
    </table>
  );

  const studentRows = screen.getAllByRole('row');

  expect(studentRows).toHaveLength(6);
});

test('if teacher is not allocated then row renders with empty teacher column', () => {
  render(
    <table>
      <tbody>
        <CurrentSchedule students={StudentSubjectTeacherAllocation} />
      </tbody>
    </table>
  );

  for (let studentData of StudentSubjectTeacherAllocation) {
    if (studentData.teacher.trim() === '') {
      const studentRow = screen.getByRole('row', {
        name: new RegExp(studentData.name),
      });
      const studentCols = within(studentRow).getAllByRole('cell');

      // eslint-disable-next-line
      expect(studentCols[2].textContent).toBe('');
    }
  }
});
