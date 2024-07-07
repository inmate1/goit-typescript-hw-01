///////////// Advanced Types///////

//Type Casting//
Type Casting (или Type Conversion ) используется для преобразования объекта одного типа в объект другого типа.

TypeScript использует два синтаксических подхода для типичного приведения: угловые скобки <> и оператор as .  

let someValue: unknown = 'this is a string';

let strLength1: number = (<string>someValue).length;
// or
let strLength2: number = (someValue as string).length;

let strLength3: number = someValue.length;

export {};
В этом примере мы имеем переменную someValue типа unknown и мы хотим обработать ее как строку. Мы знаем, что это строчка, но TypeScript этого не знает. Поэтому мы используем Type Casting для уточнения типа someValue . Если мы этого не сделаем, то получим ошибку как в переменной strLength3 . 

При работе с HTML-элементами мы можем получить проблемы.
const input = document.getElementById('inputEmail');

input.value = 'test@test.ts';

export {};
Первоначально TypeScript интерпретирует его как HTMLElement, в котором отсутствует свойство value . Но теперь нам нужно указать правильный тип. Для этого у нас есть два варианта.
const input = <HTMLInputElement>document.getElementById('inputEmail');

input.value = 'test@test.ts';

export {};

И есть второй, более универсальный через as
const input = document.getElementById('inputEmail') as HTMLInputElement;

input.value = 'test@test.ts';

export {};
Таким образом, вы можете изменять или назначать тип в процессе выполнения кода. Попробуем удалить его сейчас и назначить позже.
const input = document.getElementById('inputEmail');

if (input) {
  (input as HTMLInputElement).value = 'test@test.ts';
}

export {};
Однако, когда используется JSX (React) , только оператор as можно использовать, поскольку синтаксис <Type> может быть неправильно интерпретирован как JSX . 

/////// Index Properties Свойства индекса ///////
Бывают ситуации, когда мы знаем какие поля явно, но некоторые поля нам неизвестны, а мы точно знаем, какого типа они должны быть. Для этого можно воспользоваться такой конструкцией:

type IndexType = {
  [prop: string]: string;
}

В этом определении типа , prop: string указывает, что ключи должны быть строками, а string после двоеточия указывает, что значения должны быть строками.
type Person = {
  name: string;
  [x: string]: string;
};

const user: Person = {
  name: 'Alex',
  gender: 'MAN',
  country: 'Ukraine',
};

export {};
И сейчас это будет работать. Обязательно нужно указать name и любое количество других полей.

Использование индексных свойств позволяет создавать словари или карты, где ключи и значения имеют определенный тип.

type User = {
  id: string;
  name: string;
  email: string;
};

type Users = {
  [id: string]: User;
};

let users: Users = {};

let user: User = {
  id: '1',
  name: 'Alex',
  email: 'alex@example.com',
};

users[user.id] = user;

export {};
В этом примере мы определили тип Users , содержащий объекты типа User . Затем мы создали объект users , который может содержать неизвестное количество пользователей, каждый из которых может быть доступен по его ID .   
