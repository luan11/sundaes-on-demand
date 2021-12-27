import { render, screen } from '@testing-library/react';

import Options from '../Options';

describe(`Options`, () => {
  it(`Should displays image for each scoop option from server`, async () => {
    render(<Options optionType="scoops" />);

    const scoopImages = await screen.findAllByRole(`img`, {
      name: /scoop$/i,
    });
    expect(scoopImages).toHaveLength(2);

    const altText = scoopImages.map((el) => el.alt);
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
  });
});
