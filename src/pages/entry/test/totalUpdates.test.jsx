import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { OPTION_TYPE_SCOOPS } from '../../../constants/entry';
import Options from '../Options';

describe(`totalUpdates`, () => {
  it(`Should update scoop subtotal when scoops change`, async () => {
    render(<Options optionType={OPTION_TYPE_SCOOPS} />);

    const scoopSubtotal = screen.getByText(`Scoops total: $`, { exact: false });
    expect(scoopSubtotal).toHaveTextContent(`0.00`);

    const vanillaInput = await screen.findByRole(`spinbutton`, {
      name: `Vanilla`,
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, `1`);
    expect(scoopSubtotal).toHaveTextContent(`2.00`);
  });
});
