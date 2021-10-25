



export class Person{
  constructor(data){
    this.name = data.name
  }

  get Template(){
    return `<li>${this.name}</li>`
  }
}