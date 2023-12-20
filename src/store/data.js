const AvailableSubjects = ['Potions Master', 'Defense Against the Dark Arts'];

export const HierarchyTree = [
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

export const StudentSubjectTeacherAllocation = [
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
    teacher: 'Severus Snape',
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
