import React from "react";
import "./burger-constructor.css";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerConstructor() {
  return (
    <div className="constructor pt-25 pl-4 ">
      <div className="constructorMenu">
        <div className="constructorItemTop">
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
          />
        </div>
        <div className="constructorItemFlex">
          <div className="constructorItem">
            <DragIcon type="primary" className="dragIcon" />
            <ConstructorElement
              text="Биокотлета из марсианской Магнолии"
              price={50}
              thumbnail="https://code.s3.yandex.net/react/code/meat-01-mobile.png"
            />
          </div>
          <div className="constructorItem">
            <DragIcon type="primary" className="dragIcon" />
            <ConstructorElement
              text="Говяжий метеорит (отбивная)"
              price={50}
              thumbnail="https://code.s3.yandex.net/react/code/meat-04-mobile.png"
            />
          </div>
          <div className="constructorItem">
            <DragIcon type="primary" className="dragIcon" />
            <ConstructorElement
              text="Соус Spicy-X"
              price={50}
              thumbnail="https://code.s3.yandex.net/react/code/sauce-02-mobile.png"
            />
          </div>
          <div className="constructorItem">
            <DragIcon type="primary" className="dragIcon" />
            <ConstructorElement
              text="Краторная булка N-200i (верх)"
              price={50}
              thumbnail="https://code.s3.yandex.net/react/code/meat-01-mobile.png"
            />
          </div>
          <div className="constructorItem">
            <DragIcon type="primary" className="dragIcon" />
            <ConstructorElement
              text="Плоды Фалленианского дерева"
              price={50}
              thumbnail="https://code.s3.yandex.net/react/code/sp_1-mobile.png"
            />
          </div>
        </div>

        <div className="constructorItemBottom">
          {" "}
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Флюоресцентная булка R2-D3"
            price={200}
            thumbnail="https://code.s3.yandex.net/react/code/bun-01-mobile.png"
          />
        </div>
      </div>
      <div className="constructorPrice pb-10 pr-4">
        <span className="constructorelementPrice mr-10">
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
