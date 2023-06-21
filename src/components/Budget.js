import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

//Budget maximal fixé à 20 000
const BUDGET_MAX_VALUE = 20000;


const Budget = () => {
  
  //get global state from redux state
  const { budget, expenses ,currency, dispatch } = useContext(AppContext);

  //get total expenses
  const totalExpenses = expenses.reduce((total, item) => {
    return (total += item.cost);
  }, 0);

  //Augmentation diminution du budget
  const onChangeBudgetHandler = (event) => {

    const enteredValue = Number(event.target.value);

    // controle des variables -  valeur vide
    if (Number.isNaN(enteredValue)) {
      alert('Please enter a valid number.');
      return;
    }
    // controle des variables -  valeur non numérique
    if (!Number.isInteger(enteredValue)) {
      alert('The value must be an integer.');
      return;
    }
    // controle du budget
    if (enteredValue < totalExpenses) {
      alert(
        "The buget can't be lower than the spending " +
          currency +
          totalExpenses
      );
    } else {
      if (enteredValue > BUDGET_MAX_VALUE) {
        alert('The budget cannot exceed the max budget of ' + BUDGET_MAX_VALUE);
        return;
      }
      //action dispatch function, sent type and payload to reducer
      dispatch({
        type: 'SET_BUDGET',
        payload: enteredValue,
      });
    }
  };

  return (
    <div
      className="alert alert-secondary"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
    >
      <div>
        <label htmlFor="budget"> Budget:</label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span>{currency}</span>
        <input
          required="required"
          type="number"
          id="budget"
          value={budget}
          step="10"
          onChange={onChangeBudgetHandler}
        ></input>
      </div>
    </div>
  );
};

export default Budget;