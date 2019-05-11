// Classes 

class Budget{
  constructor(budget){
    this.budget = Number(budget);
    this.budgetLeft = this.budget;
  }

  // Substact from the budget
  substractFromBudget(amount){
    return this.budgetLeft -= amount;
  }
}

// Everything related to the html
class HTML{
    // Inset the Budget when the user submit it
    insertBudget(amount){
      // insert to the html
      budgetTotal.innerHTML = `${amount}`;
      budgetLeft.innerHTML = `${amount}`;
    }
    // Displays message of (Invalid , or  Correct).
    printMessage(message , className){
      const messageWrapper = document.createElement('div');
      messageWrapper.classList.add('text-center' , 'alert',  className);
      messageWrapper.appendChild(document.createTextNode(message));
      
      // Insert into HTML
      document.querySelector('.primary').insertBefore(messageWrapper,addExpenseForm );

      // Clear the error message after 3 minutes
      setTimeout(function(){
        document.querySelector('.alert').remove();
        addExpenseForm.reset();
      },3000);

    }

    // Displays the values from the form into the list
    addExpenseToList(name , amount){
      const expenseList = document.querySelector('#expenses ul');

      // Create a li
        const li = document.createElement('li');
        li.classList = "list-group-item d-flex justify-content-between align-items-center ";

      // add the Template
       li.innerHTML = `
          ${name}
          <span class = "badge badge-primary badge-pill"> $ ${amount} </p>

       `;

      // insert into the html list 
      expenseList.appendChild(li);
    }

    // Substract expense from the budget
    trackBudget(amount){
      const budgetLeftDollars = budget.substractFromBudget(amount);
      budgetLeft.innerHTML = ` ${budgetLeftDollars}`;

      // Check when the 25% is left & 50% also.
     if((budget.budget / 4 ) > budgetLeftDollars){
       budgetLeft.parentElement.parentElement.clasList.remove('alert-success',
       'alert-warning');
       budgetLeft.parentElement.parentElement.classList.add('alert-danger');
     }else if((budget.budget / 2 ) > budgetLeftDollars ){
      budgetLeft.parentElement.parentElement.classList.remove('alert-success');
      budgetLeft.parentElement.parentElement.classList.add('alert-warning');
     }
      
    }

}



// Variables
const addExpenseForm = document.querySelector('#add-expense'),
      budgetTotal = document.querySelector('span#total'),
      budgetLeft = document.querySelector('span#left');


let budget , userBudget;

// Instanciate the html
 const html = new HTML();


// Event Listeners
eventListener();
function eventListener(){

  // App Init
  document.addEventListener('DOMContentLoaded', function(){
      // Ask the user the Weekly Budget
      userBudget = prompt('What\'s Your Budget for this week ?');

      // Validate the user Budget
      if(userBudget === null || userBudget === '' || userBudget === '0' ){
        window.location.reload();
      }else{
        // after the Budget is valid then instanciate the class
         budget = new Budget(userBudget);

        //  Instanciate the HTML
        html.insertBudget(budget.budget);

      }

  });

  // When a new Expense is added
  addExpenseForm.addEventListener('submit', function(e){
       e.preventDefault();
      //  Read the values from inputs
      const expenseName = document.querySelector('#expense').value;
      const amount = document.querySelector('#amount').value;

      // Check the values from inputs fields
      if(expenseName === '' || amount === ''){
         html.printMessage('There was an error , all the fields are mandatory' , 'alert-danger');
      }else{
        html.addExpenseToList(expenseName , amount);
        html.trackBudget(amount);
        html.printMessage('Added (:' , 'alert-success');
      }
  });
}