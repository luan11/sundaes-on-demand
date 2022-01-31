import { render, screen } from '../../../test-utils';
import userEvent from '@testing-library/user-event';

import {
  OPTION_TYPE_SCOOPS,
  OPTION_TYPE_TOPPINGS,
} from '../../../constants/entry';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

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

  describe(`Grand Total`, () => {
    it(`Should be initially $0.00`, () => {
      render(<OrderEntry />);

      const grandTotal = screen.getByRole(`heading`, {
        name: /grand total: \$/i,
      });
      expect(grandTotal).toHaveTextContent(`0.00`);
    });

    it(`Should update properly if scoop is added first`, async () => {
      render(<OrderEntry />);

      const grandTotal = screen.getByRole(`heading`, {
        name: /grand total: \$/i,
      });

      const vanillaInput = await screen.findByRole(`spinbutton`, {
        name: `Vanilla`,
      });
      userEvent.clear(vanillaInput);
      userEvent.type(vanillaInput, `2`);
      expect(grandTotal).toHaveTextContent(`4.00`);

      const cherriesCheckbox = await screen.findByRole(`checkbox`, {
        name: `Cherries`,
      });
      userEvent.click(cherriesCheckbox);
      expect(grandTotal).toHaveTextContent(`5.50`);
    });

    it(`Should update properly if topping is added first`, async () => {
      render(<OrderEntry />);

      const grandTotal = screen.getByRole(`heading`, {
        name: /grand total: \$/i,
      });

      const cherriesCheckbox = await screen.findByRole(`checkbox`, {
        name: `Cherries`,
      });
      userEvent.click(cherriesCheckbox);
      expect(grandTotal).toHaveTextContent(`1.50`);

      const vanillaInput = await screen.findByRole(`spinbutton`, {
        name: `Vanilla`,
      });
      userEvent.clear(vanillaInput);
      userEvent.type(vanillaInput, `2`);
      expect(grandTotal).toHaveTextContent(`5.50`);
    });

    it(`Should update properly if an item is removed`, async () => {
      render(<OrderEntry />);

      const cherriesCheckbox = await screen.findByRole(`checkbox`, {
        name: `Cherries`,
      });
      userEvent.click(cherriesCheckbox);

      const vanillaInput = await screen.findByRole(`spinbutton`, {
        name: `Vanilla`,
      });
      userEvent.clear(vanillaInput);
      userEvent.type(vanillaInput, `2`);

      userEvent.clear(vanillaInput);
      userEvent.type(vanillaInput, `1`);

      const grandTotal = screen.getByRole(`heading`, {
        name: /grand total: \$/i,
      });
      expect(grandTotal).toHaveTextContent(`3.50`);

      userEvent.click(cherriesCheckbox);
      expect(grandTotal).toHaveTextContent(`2.00`);
    });
  });
});
