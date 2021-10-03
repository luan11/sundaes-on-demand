import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
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

  describe(`Popover`, () => {
    it(`Should responds to hover`, async () => {
      render(<SummaryForm />);

      const nullPopover = screen.queryByText(
        /no ice cream will actually be delivered/i
      );
      expect(nullPopover).not.toBeInTheDocument();

      const termsAndConditions = screen.getByText(/terms and conditions/i);
      userEvent.hover(termsAndConditions);

      const popover = screen.getByText(
        /no ice cream will actually be delivered/i
      );
      expect(popover).toBeInTheDocument();

      userEvent.unhover(termsAndConditions);

      await waitForElementToBeRemoved(() =>
        screen.queryByText(/no ice cream will actually be delivered/i)
      );
    });
  });
});
