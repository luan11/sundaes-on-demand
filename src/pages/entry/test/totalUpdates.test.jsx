import { render, screen } from '../../../test-utils';
import userEvent from '@testing-library/user-event';

import {
  OPTION_TYPE_SCOOPS,
  OPTION_TYPE_TOPPINGS,
} from '../../../constants/entry';
import Options from '../Options';

describe(`totalUpdates`, () => {
  it(`Should update scoop subtotal when scoops change`, async () => {
    render(<Options optionType={OPTION_TYPE_SCOOPS} />);

    const scoopsSubtotal = screen.getByText(`Scoops total: $`, {
      exact: false,
    });
    expect(scoopsSubtotal).toHaveTextContent(`0.00`);

    const vanillaInput = await screen.findByRole(`spinbutton`, {
      name: `Vanilla`,
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, `1`);
    expect(scoopsSubtotal).toHaveTextContent(`2.00`);
  });

  it(`Should update topping subtotal when toppings change`, async () => {
    render(<Options optionType={OPTION_TYPE_TOPPINGS} />);

    const toppingsSubtotal = screen.getByText(`Toppings total: $`, {
      exact: false,
    });
    expect(toppingsSubtotal).toHaveTextContent(`0.00`);

    const mAndMsCheckbox = await screen.findByRole(`checkbox`, {
      name: `M&Ms`,
    });
    userEvent.click(mAndMsCheckbox);
    expect(toppingsSubtotal).toHaveTextContent(`1.50`);

    const hotFudgeCheckbox = screen.getByRole(`checkbox`, {
      name: `Hot fudge`,
    });
    userEvent.click(hotFudgeCheckbox);
    expect(toppingsSubtotal).toHaveTextContent(`3.00`);

    userEvent.click(hotFudgeCheckbox);
    expect(toppingsSubtotal).toHaveTextContent(`1.50`);
  });
});
