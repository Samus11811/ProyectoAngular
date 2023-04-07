export class Usuario{
  id?:number;
  nombre!:String;
  email!:String;
  contra!:String;
  rol!:String;
  imagen!:String;

constructor(id: number, nombre: String, email: String){
  this.id = id;
  this.nombre = nombre;
  this.email = email;
}

}
