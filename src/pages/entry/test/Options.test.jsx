import { render, screen } from '@testing-library/react';

import Options from '../Options';
import {
  OPTION_TYPE_SCOOPS,
  OPTION_TYPE_TOPPINGS,
  BASE_URL,
} from '../../../constants/entry';

describe(`Options`, () => {
  describe(`Scoops`, () => {
    it(`Should displays image for each option from server`, async () => {
      render(<Options optionType={OPTION_TYPE_SCOOPS} />);

      const images = await screen.findAllByRole(`img`, {
        name: /scoop$/i,
      });
      expect(images).toHaveLength(2);

      const altText = images.map((el) => el.alt);
      expect(altText).toEqual([`Chocolate scoop`, `Vanilla scoop`]);
    });

    it(`Should displays correct image src for each option from server`, async () => {
      render(<Options optionType={OPTION_TYPE_SCOOPS} />);

      const images = await screen.findAllByRole(`img`, {
        name: /scoop$/i,
      });
      expect(images).toHaveLength(2);

      const src = images.map((el) => el.src);
      expect(src).toEqual([
        `${BASE_URL}/images/chocolate.png`,
        `${BASE_URL}/images/vanilla.png`,
      ]);
    });
  });

  describe(`Toppings`, () => {
    it(`Should displays image for each option from server`, async () => {
      render(<Options optionType={OPTION_TYPE_TOPPINGS} />);

      const images = await screen.findAllByRole(`img`, {
        name: /topping$/i,
      });
      expect(images).toHaveLength(3);

      const altText = images.map((el) => el.alt);
      expect(altText).toEqual([
        `Cherries topping`,
        `M&Ms topping`,
        `Hot fudge topping`,
      ]);
    });

    it(`Should displays correct image src for each option from server`, async () => {
      render(<Options optionType={OPTION_TYPE_TOPPINGS} />);

      const images = await screen.findAllByRole(`img`, {
        name: /topping$/i,
      });
      expect(images).toHaveLength(3);

      const src = images.map((el) => el.src);
      expect(src).toEqual([
        `${BASE_URL}/images/cherries.png`,
        `${BASE_URL}/images/m-and-ms.png`,
        `${BASE_URL}/images/hot-fudge.png`,
      ]);
    });
  });
});
