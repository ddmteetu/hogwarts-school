import { render, screen, within } from '@testing-library/react';
import TeacherAttendance from './TeacherAttendance';

const AvailableSubjects = ['Potions Master', 'Defense Against the Dark Arts'];
const HierarchyTree = [
  {
    name: 'Professor Dumbledore',
    subject: AvailableSubjects,
    isPresent: true,
    isStandby: false,
    img: {
      isPresent: '/images/professor-dumbledore.jpg',
      isAbsent: '/images/professor-dumbledore-absent.jpg',
    },
    subordinate: [
      {
        name: 'Minerva McGonagall',
        subject: AvailableSubjects,
        isPresent: true,
        isStandby: false,
        img: {
          isPresent: '/images/minerva-mcgonagall.jpg',
          isAbsent: '/images/minerva-mcgonagall-absent.jpg',
        },
        subordinate: [
          {
            name: 'Rubeus Hagrid',
            subject: [AvailableSubjects[0]],
            isPresent: true,
            isStandby: true,
            img: {
              isPresent: '/images/rubeus-hagrid.jpg',
              isAbsent: '/images/rubeus-hagrid-absent.jpg',
            },
            subordinate: [
              {
                name: 'Horace Slughorn',
                subject: [AvailableSubjects[0]],
                isPresent: true,
                isStandby: false,
                img: {
                  isPresent: '/images/horace-slughorn.jpg',
                  isAbsent: '/images/horace-slughorn-absent.jpg',
                },
                subordinate: [],
              },
              {
                name: 'Severus Snape',
                subject: [AvailableSubjects[0]],
                isPresent: true,
                isStandby: false,
                img: {
                  isPresent: '/images/severus-snape.jpg',
                  isAbsent: '/images/severus-snape-absent.jpg',
                },
                subordinate: [],
              },
            ],
          },
          {
            name: 'Alastor Moody',
            subject: [AvailableSubjects[1]],
            isPresent: true,
            isStandby: true,
            img: {
              isPresent: '/images/alastor-moody.jpg',
              isAbsent: '/images/alastor-moody-absent.jpg',
            },
            subordinate: [
              {
                name: 'Remus Lupin',
                subject: [AvailableSubjects[1]],
                isPresent: true,
                isStandby: false,
                img: {
                  isPresent: '/images/remus-lupin.jpg',
                  isAbsent: '/images/remus-lupin-absent.jpg',
                },
                subordinate: [],
              },
              {
                name: 'Gilderoy Lockhart',
                subject: [AvailableSubjects[1]],
                isPresent: true,
                isStandby: false,
                img: {
                  isPresent: '/images/gilderoy-lockhart.jpg',
                  isAbsent: '/images/gilderoy-lockhart-absent.jpg',
                },
                subordinate: [],
              },
            ],
          },
        ],
      },
    ],
  },
];

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

test('receives a teacher tree and renders all the teachers on the document', () => {
  render(
    <table>
      <tbody>
        <TeacherAttendance
          teachers={giveTeachers(HierarchyTree)}
          attendanceChange={() => {}}
        />
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
        <TeacherAttendance
          teachers={giveTeachers(HierarchyTree)}
          attendanceChange={() => {}}
        />
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
        <TeacherAttendance
          teachers={giveTeachers(HierarchyTree)}
          attendanceChange={() => {}}
        />
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
        <TeacherAttendance
          teachers={giveTeachers(HierarchyTree)}
          attendanceChange={() => {}}
        />
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
