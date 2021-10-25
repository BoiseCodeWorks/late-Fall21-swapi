import { ProxyState } from "../AppState.js";
import { Person } from "../Models/Person.js";
import { api } from "./AxiosService.js";




class PeopleService{
  constructor(){
    console.log('People service loaded');
  }
  
  async getPeople(url = 'people'){
    console.log('service: getting the people');
    // NOTE using the keyword 'await' to axios' get request to go out to the internet and get the data we want tells the code to wait until that data comes back.
    const response = await api.get(url)
    // NOTE These next steps will be unique to this api, ALL APIs ARE DIFFERENT
    console.log('Swapi getPeople response', response.data);
    ProxyState.nextPage = response.data.next
    ProxyState.prevPage = response.data.previous
    // NOTE needed to update page number, page number exists at the end of URL string so grabbing last index of the string gives us the page number
    if(url != 'people'){
      ProxyState.pageNumber = url[url.length -1]
    }
    ProxyState.people = response.data.results.map(p => new Person(p))
  }

  // NOTE no longer being used
  // async pageChange(pageDirection) {
  //   switch(pageDirection){
  //     case 'next':
  //       ProxyState.pageNumber++
  //       break;
  //     case 'previous':
  //       ProxyState.pageNumber--
  //       break;
  //       }
  //     const response = await api.get(`people?page=${ProxyState.pageNumber}`)
  //     console.log('Swapi getPeople response', response.data);
  //     ProxyState.nextPage = response.data.next
  //     ProxyState.prevPage = response.data.previous
  //     ProxyState.people = response.data.results.map(p => new Person(p))
  // }

}

export const peopleService = new PeopleService()