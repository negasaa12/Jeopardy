// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [];


/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */


/*async function getCategoryIds() {
    const res = await axios.get('http://jservice.io/api/category?id=150')
    console.log(res, res.data.clues);
        let idArray = res.data.clues;

        for(let ids of idArray){
       
        
            let x = ids.id
            categories.push(x);
     
         }
         console.log(categories)
         return categories;
    
    
}*/

async function getCategoryIds() {
    const res = await axios.get('http://jservice.io/api/categories?count=10')
    
        let idArray = res.data;

        for(let ids of idArray){
       
        
            let x = ids.id
            categories.push(x);
     
         }
         console.log(categories)
         return categories;
    
    
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */



async function getCategory(catId) {
    
    const res = await axios.get(`http://jservice.io/api/category?id=${catId}`);
    //console.log( res.data.title)
    let title = res.data.title;
    let clues = res.data.clues;
    
    const result = clues.map(({question, answer}) =>{
        return {question, answer};
    });

    
    let caterogyObject = { 'title': title,
'clues': result};

console.log(caterogyObject)
return caterogyObject
}

//getCategoryIds()



async function getCategories(catIds) {
    const returnArray = [];
    for (let id of catIds) {
       const categoryDetails = await getCategory(id)
       returnArray.push(categoryDetails)
    }
     return returnArray;
 }
/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {
    let catIds = await getCategoryIds();
    let objectArray = await getCategories(catIds);
  
    let head = $('thead');
    let body = $('tbody');
  
    const row = document.createElement('tr');
    head.append(row);
  
    // THEAD
    for (let x = 0; x < 6; x++) {
      const cell = document.createElement('td');
      cell.classList.add('categories');
      cell.innerText = objectArray[x].title;
      row.append(cell);
    }
  
    // TBODY
    for (let a = 0; a < 5; a++) {
      const bodyRow = document.createElement('tr');
      body.append(bodyRow);
  
      for (let y = 0; y < 6; y++) {
        const cell = document.createElement('td');
        const randomIndex = Math.floor(Math.random() * objectArray[y].clues.length);
  
        cell.classList.add('questions');
        cell.innerText = '?';
        cell.dataset.question = objectArray[y].clues[randomIndex].question;
        //console.log(cell.dataset.question)
        cell.dataset.answer = objectArray[y].clues[randomIndex].answer;
        
        cell.dataset.showing = 'question';
  
        bodyRow.append(cell);
        
         
      }
    }
    
    


  }
  
 
    
  
  /** Handle clicking on a clue: show the question or answer.
   *
   * Uses .showing property on clue to determine what to show:
   * - if currently null, show question & set .showing to "question"
   * - if currently "question", show answer & set .showing to "answer"
   * - if currently "answer", ignore click
   */
  
  function handleClick(event) {
    const cell = event.target;
    const showing = cell.dataset.showing;
   
     
    if (showing === 'question') {
      
      cell.innerText = cell.dataset.question;
      cell.dataset.showing = 'answer';
    } else if (showing === 'answer') {
      // Show the question
      cell.innerText = cell.dataset.answer;
      cell.dataset.showing = 'question';
    }

    
  }
  
  const tablebody = document.querySelector('tbody');
  tablebody.addEventListener('click', handleClick);
  

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
 $('#jeopardy').remove()
 
 $('#spin-container').show()
}




/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
  $('#spin-container').hide()
 
  
  let reset = document.createElement('button')
  reset.innerText = 'Remove Game';
  reset.classList.add('reset');
  let board = document.querySelector('#jeopardy');
  board.parentElement.appendChild(reset);

  reset.addEventListener('click', function() {
   
    board.remove();
    reset.remove()
    showLoadingView()
    
    
  });
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
 
$('#start').on('click',function(){
  fillTable();
  setTimeout(hideLoadingView,3000);
  
  
})


}

setupAndStart()




/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO





