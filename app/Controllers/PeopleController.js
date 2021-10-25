import { ProxyState } from "../AppState.js";
import { peopleService } from "../Services/PeopleService.js";


function _draw(){
  let people = ProxyState.people
  let template = ''
  people.forEach(p => template += p.Template)
  document.getElementById('app').innerHTML = template
  // NOTE redraws buttons after people are got from swapi
  _drawButtons()
}

function _drawButtons(){
  let pageNumber = ProxyState.pageNumber
  let nextPage = ProxyState.nextPage
  let prevPage = ProxyState.prevPage
  document.getElementById('buttons').innerHTML = `
  <button class="btn btn-success" ${prevPage ? '': 'disabled'} onclick="app.peopleController.getPeople('${prevPage}')">Previous</button>
  <div class="px-3">${pageNumber}</div>
  <button class="btn btn-success" ${nextPage ? '': 'disabled'} onclick="app.peopleController.getPeople('${nextPage}')">Next</button>
  `
  // document.getElementById('buttons').innerHTML = `
  // <button class="btn btn-success" ${prevPage ? '': 'disabled'} onclick="app.peopleController.pageChange('previous')">Previous</button>
  // <div class="px-3">${pageNumber}</div>
  // <button class="btn btn-success" ${nextPage ? '': 'disabled'} onclick="app.peopleController.pageChange('next')">Next</button>
  // `
}


export class PeopleController{
  constructor(){
    console.log("people Controller loaded");
    // NOTE Always register Listeners before you go to get data
    ProxyState.on('people', _draw)
    // NOTE ProxyState.on('people', _drawButtons) this would also work to draw the buttons on people get
    // this gets the data on load
    this.getPeople()
  }


  async getPeople(url){
    try {
      await peopleService.getPeople(url)
      console.log('controller: get people finished');
    } catch (error) {
      console.error('beep beep whahaw',error)
    }
  }

  // NOTE not being used any more

  // async pageChange(pageDirection){
  //   try {
  //     await peopleService.pageChange(pageDirection)
  //   } catch (error) {
  //     console.error('beep beep whahaw',error)
  //   }
  // }
}