import { mdiClose, mdiDivision, mdiMinus, mdiPercentOutline, mdiPlusMinusVariant } from '@mdi/js';
import clsx from 'clsx';
import { useReducer } from 'react';
import {AppIcon} from "../../utils/AppIcon";
import css from './Calculator.module.scss';
import {
  calculatorReducer,
  initialState,
} from './calculatorReducer';

const Calculator = () => {
  const [state, dispatch] = useReducer(
    calculatorReducer,
    initialState,
  );

  const { result } = state;

  function handlePress(key) {
    dispatch({ type: 'Press', payload: key });
  }

  return (
    <section className={css.container}>
      <header className={clsx('app-window-drag-handle', css.header)} />
      <section className={css.showArea}>{result}</section>
      <section className={css.buttonsContainer}>
        <button className={css.topRowButton} onClick={() => handlePress('AC')}>
          {Number(result) > 0 ? 'C' : 'AC'}
        </button>
        <button className={css.topRowButton} onClick={() => handlePress('+/-')}>
          <AppIcon path={mdiPlusMinusVariant} />
        </button>
        <button className={css.topRowButton} onClick={() => handlePress('%')}>
          <AppIcon path={mdiPercentOutline} />
        </button>
        <button className={css.operationButton} onClick={() => handlePress('/')}>
          <AppIcon path={mdiDivision} />
        </button>
        <button className={css.numberButton} onClick={() => handlePress(7)}>
          7
        </button>
        <button className={css.numberButton} onClick={() => handlePress(8)}>
          8
        </button>
        <button className={css.numberButton} onClick={() => handlePress(9)}>
          9
        </button>
        <button className={css.operationButton} onClick={() => handlePress('*')}>
          <AppIcon path={mdiClose} />
        </button>
        <button className={css.numberButton} onClick={() => handlePress(4)}>
          4
        </button>
        <button className={css.numberButton} onClick={() => handlePress(5)}>
          5
        </button>
        <button className={css.numberButton} onClick={() => handlePress(6)}>
          6
        </button>
        <button className={css.operationButton} onClick={() => handlePress('-')}>
          <AppIcon path={mdiMinus} size={24} />
        </button>
        <button className={css.numberButton} onClick={() => handlePress(1)}>
          1
        </button>
        <button className={css.numberButton} onClick={() => handlePress(2)}>
          2
        </button>
        <button className={css.numberButton} onClick={() => handlePress(3)}>
          3
        </button>
        <button className={css.operationButton} onClick={() => handlePress('+')}>
          +
        </button>
        <button
          className={clsx(css.numberButton, css.curvedBottomLeftButton)}
          style={{ gridColumn: '1 / span 2' }}
          onClick={() => handlePress(0)}
        >
          0
        </button>
        <button className={css.numberButton} onClick={() => handlePress('.')}>
          .
        </button>
        <button
          className={clsx(css.operationButton, css.curvedBottomRightButton)}
          onClick={() => handlePress('=')}
        >
          =
        </button>
      </section>
    </section>
  );
};

export default Calculator;
