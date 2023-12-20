import { render, screen, within } from '@testing-library/react';
import TeacherTree from './TeacherTree';

const AvailableSubjects = ['Potions Master', 'Defense Against the Dark Arts'];
const HierarchyTree = [
  {
    name: 'Professor Dumbledore',
    subject: AvailableSubjects,
    isPresent: true,
    isStandby: false,
    subordinate: [
      {
        name: 'Minerva McGonagall',
        subject: AvailableSubjects,
        isPresent: true,
        isStandby: false,
        subordinate: [
          {
            name: 'Rubeus Hagrid',
            subject: [AvailableSubjects[0]],
            isPresent: false,
            isStandby: true,
            subordinate: [
              {
                name: 'Horace Slughorn',
                subject: [AvailableSubjects[0]],
                isPresent: true,
                isStandby: false,
                subordinate: [],
              },
              {
                name: 'Severus Snape',
                subject: [AvailableSubjects[0]],
                isPresent: true,
                isStandby: false,
                subordinate: [],
              },
            ],
          },
          {
            name: 'Alastor Moody',
            subject: [AvailableSubjects[1]],
            isPresent: true,
            isStandby: true,
            subordinate: [
              {
                name: 'Remus Lupin',
                subject: [AvailableSubjects[1]],
                isPresent: true,
                isStandby: false,
                subordinate: [],
              },
              {
                name: 'Gilderoy Lockhart',
                subject: [AvailableSubjects[1]],
                isPresent: true,
                isStandby: false,
                subordinate: [],
              },
            ],
          },
        ],
      },
    ],
  },
];

const giveTeachers = (teacherTree) => {
  let teachers = [];
  const treeToPlainArray = (teacherTree) => {
    teacherTree.forEach((element) => {
      if (element.subordinate.length > 0) {
        teachers.push(element);
        treeToPlainArray(element.subordinate);
      } else {
        teachers.push(element);
      }
    });
  };

  treeToPlainArray(teacherTree);
  return teachers;
};

test('receives a teacher tree and renders all the teachers on the document', () => {
  render(
    <table>
      <tbody>
        <TeacherTree teacherTree={HierarchyTree} attendanceChange={() => {}} />
      </tbody>
    </table>
  );

  const teacherRows = screen.getAllByRole('row');

  expect(teacherRows).toHaveLength(8);
});

test('every teacher row on the document has 2 columns', () => {
  render(
    <table>
      <tbody>
        <TeacherTree teacherTree={HierarchyTree} attendanceChange={() => {}} />
      </tbody>
    </table>
  );

  const allColumnsInTheDocument = screen.getAllByRole('cell');

  expect(allColumnsInTheDocument).toHaveLength(16);
});

test('if teacher is present in the teacher tree then attendance dropdown has present value selected', () => {
  render(
    <table>
      <tbody>
        <TeacherTree teacherTree={HierarchyTree} attendanceChange={() => {}} />
      </tbody>
    </table>
  );

  const teachers = giveTeachers(HierarchyTree);
  for (let teacher of teachers) {
    if (teacher.isPresent) {
      const teacherRow = screen.getByRole('row', {
        name: new RegExp(teacher.name),
      });
      const dropdownCol = within(teacherRow).getByRole('cell', {
        name: /present/i,
      });

      // eslint-disable-next-line
      expect(dropdownCol).toBeInTheDocument();
    }
  }
});

test('if teacher is not present in the teacher tree then attendance dropdown has absent value selected', () => {
  render(
    <table>
      <tbody>
        <TeacherTree teacherTree={HierarchyTree} attendanceChange={() => {}} />
      </tbody>
    </table>
  );

  const teachers = giveTeachers(HierarchyTree);
  for (let teacher of teachers) {
    if (!teacher.isPresent) {
      const teacherRow = screen.getByRole('row', {
        name: new RegExp(teacher.name),
      });
      const dropdownCol = within(teacherRow).getByRole('cell', {
        name: /absent/i,
      });

      // eslint-disable-next-line
      expect(dropdownCol).toBeInTheDocument();
    }
  }
});
