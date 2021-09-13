import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SummaryForm from '../SummaryForm';

describe(`SummaryForm`, () => {
  it(`Should render the checkbox unchecked and the confirmation button disabled initially`, () => {
    render(<SummaryForm />);

    const checkbox = screen.getByRole(`checkbox`, {
      name: /Terms and Conditions/i,
    });
    const confirmationButton = screen.getByRole(`button`, {
      name: /Confirm Order/i,
    });

    expect(checkbox).not.toBeChecked();
    expect(confirmationButton).toBeDisabled();
  });

  it(`Should enable the confirmation button on check the checkbox and disable on uncheck the checkbox`, () => {
    render(<SummaryForm />);

    const checkbox = screen.getByRole(`checkbox`, {
      name: /Terms and Conditions/i,
    });
    const confirmationButton = screen.getByRole(`button`, {
      name: /Confirm Order/i,
    });

    userEvent.click(checkbox);
    expect(confirmationButton).toBeEnabled();

    userEvent.click(checkbox);
    expect(confirmationButton).toBeDisabled();
  });
});
