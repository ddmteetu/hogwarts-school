import { render, screen, within } from '@testing-library/react';
import CurrentSchedule from './CurrentSchedule';

const AvailableSubjects = ['Potions Master', 'Defense Against the Dark Arts'];
const StudentSubjectTeacherAllocation = [
  {
    name: 'Harry Potter',
    img: {
      isPresent: '/images/harry-potter.jpg',
      isAbsent: '/images/harry-potter-absent.jpg',
    },
    subject: AvailableSubjects[0],
    teacher: 'Horace Slughorn',
  },
  {
    name: 'Hermione Granger',
    img: {
      isPresent: '/images/hermione-granger.jpg',
      isAbsent: '/images/hermione-granger-absent.jpg',
    },
    subject: AvailableSubjects[0],
    teacher: '',
  },
  {
    name: 'Ron Weasley',
    img: {
      isPresent: '/images/ron-weasley.jpg',
      isAbsent: '/images/ron-weasley-absent.jpg',
    },
    subject: AvailableSubjects[0],
    teacher: '',
  },
  {
    name: 'Draco Malfoy',
    img: {
      isPresent: '/images/draco-malfoy.jpg',
      isAbsent: '/images/draco-malfoy-absent.jpg',
    },
    subject: AvailableSubjects[0],
    teacher: 'Horace Slughorn',
  },
  {
    name: 'Padma Patil',
    img: {
      isPresent: '/images/padma-patil.jpg',
      isAbsent: '/images/padma-patil-absent.jpg',
    },
    subject: AvailableSubjects[0],
    teacher: '',
  },
  {
    name: 'Luna Lovegood',
    img: {
      isPresent: '/images/luna-lovegood.jpg',
      isAbsent: '/images/luna-lovegood-absent.jpg',
    },
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
