import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { data } from "../../utils/data.js";

const Element = (props) => {
  return (
    <li className={`${styles.constructorItem} pl-4`}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={`${props.name}`}
        price={props.price}
        thumbnail={props.image_mobile}
      />
    </li>
  );
};

Element.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  image_mobile: PropTypes.string,
};

function BurgerConstructor() {
  return (
    <div className={`${styles.constructor} pt-25 pl-4 pb-10`}>
      <div className={styles.constructorMenu}>
        <div
          className={`${styles.constructorItemTop} pl-8`}
          id="constructorItemTop"
        >
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i(верх)"
            price={200}
            thumbnail="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
          />
        </div>
        <ul className={styles.constructorItemFlex}>
          {data.map((obj) => {
            if (obj.type !== "bun") {
              return (
                <Element
                  key={obj._id}
                  image_mobile={obj.image_mobile}
                  price={obj.price}
                  name={obj.name}
                />
              );
            }
          })}
        </ul>

        <div
          className={`${styles.constructorItemBottom} pl-8`}
          id="constructorItemBottom"
        >
          {" "}
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i(низ)"
            price={200}
            thumbnail="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
          />
        </div>
      </div>
      <div className={`${styles.constructorPrice} pt-10 pr-4`}>
        <span className={`${styles.constructorelementPrice} mr-10`}>
          1000 <CurrencyIcon type="primary" />
        </span>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

export default BurgerConstructor;