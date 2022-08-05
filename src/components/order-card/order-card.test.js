import React from "react";
import renderer from "react-test-renderer";

import OrderCard from "./order-card";
import { dataFeed } from "../../utils/data";

it("Карточка создается", () => {
  const tree = renderer
    .create(
      <OrderCard
        number={dataFeed.number}
        name={dataFeed.name}
        ingredients={dataFeed.ingredients}
        createdAt={dataFeed.createdAt}
        status={dataFeed.status}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
