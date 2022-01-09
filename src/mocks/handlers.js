import { rest } from 'msw';

import {
  BASE_URL,
  OPTION_TYPE_SCOOPS,
  OPTION_TYPE_TOPPINGS,
} from '../constants/entry';

export const handlers = [
  rest.get(`${BASE_URL}/${OPTION_TYPE_SCOOPS}`, (req, res, ctx) =>
    res(
      ctx.json([
        {
          name: `Chocolate`,
          imagePath: `/images/chocolate.png`,
        },
        {
          name: `Vanilla`,
          imagePath: `/images/vanilla.png`,
        },
      ])
    )
  ),
  rest.get(`${BASE_URL}/${OPTION_TYPE_TOPPINGS}`, (req, res, ctx) =>
    res(
      ctx.json([
        {
          name: `Cherries`,
          imagePath: `/images/cherries.png`,
        },
        {
          name: `M&Ms`,
          imagePath: `/images/m-and-ms.png`,
        },
        {
          name: `Hot fudge`,
          imagePath: `/images/hot-fudge.png`,
        },
      ])
    )
  ),
];
