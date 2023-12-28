import { render, screen, within } from '@testing-library/react';
import user from '@testing-library/user-event';
import ScheduleToday from './ScheduleToday';

test('renders two 50-50 columns, one for each table', () => {
  const { container } = render(<ScheduleToday />);

  // eslint-disable-next-line
  const tableColumns = container.querySelectorAll(
    'section > .container > .row > .col-md-6'
  );

  expect(tableColumns).toHaveLength(2);
});

test('for every student row renders a non-empty teacher cell', () => {
  const { container } = render(<ScheduleToday />);

  // eslint-disable-next-line
  const studentRows = container.querySelectorAll(
    'table[aria-label="Current Schedule Section"] > tbody > tr'
  );
  for (let studentRow of studentRows) {
    const studentCols = within(studentRow).getAllByRole('cell');

    expect(studentCols[2].textContent).not.toBe('');
  }
});

test('when attendance for teacher is changed to absent, it no longer renders in the teacher cell of the current schedule table', async () => {
  const { container } = render(<ScheduleToday />);

  // eslint-disable-next-line
  const studentRows = container.querySelectorAll(
    'table[aria-label="Current Schedule Section"] > tbody > tr'
  );
  const foundTeachers = [];
  const teachersAfterAttendanceChange = [];
  for (let studentRow of studentRows) {
    const studentCols = within(studentRow).getAllByRole('cell');
    if (!foundTeachers.includes(studentCols[2].textContent)) {
      foundTeachers.push(studentCols[2].textContent);
    }
  }
  for (let teacher of foundTeachers) {
    const teacherRow = screen.getByRole('row', { name: teacher });
    const selectBox = within(teacherRow).getByRole('combobox');

    await user.selectOptions(selectBox, 'false');

    for (let studentRow of studentRows) {
      const teacherCol = within(studentRow).queryByRole('cell', {
        name: teacher,
      });
      if (
        teacherCol &&
        !teachersAfterAttendanceChange.includes(teacherCol.textContent)
      ) {
        teachersAfterAttendanceChange.push(teacherCol.textContent);
      }
    }
  }

  expect(teachersAfterAttendanceChange).toHaveLength(0);
});
