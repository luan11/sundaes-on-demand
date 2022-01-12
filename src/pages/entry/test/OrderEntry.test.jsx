import { render, screen, waitFor } from '../../../test-utils';
import { rest } from 'msw';
import { server } from '../../../mocks/server';

import {
  BASE_URL,
  OPTION_TYPE_SCOOPS,
  OPTION_TYPE_TOPPINGS,
} from '../../../constants/entry';
import OrderEntry from '../OrderEntry';

describe(`OrderEntry`, () => {
  it(`Handle errors for scoops and toppings routes`, async () => {
    server.resetHandlers(
      rest.get(`${BASE_URL}/${OPTION_TYPE_SCOOPS}`, (req, res, ctx) =>
        res(ctx.status(500))
      ),
      rest.get(`${BASE_URL}/${OPTION_TYPE_TOPPINGS}`, (req, res, ctx) =>
        res(ctx.status(500))
      )
    );

    render(<OrderEntry />);

    await waitFor(() => {
      const alerts = screen.getAllByRole(`alert`);
      expect(alerts).toHaveLength(2);
    });
  });
});
