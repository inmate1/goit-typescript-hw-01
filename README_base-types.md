Базовые и сложные типы;
Типы для переменных и аргументов;
Типы лдя методов и функций;
Custom Types; Пользовательские типы;
Advanced Types; Расширенные типы;
Generics. Дженерики.


Описание простых (скалярных) типов

let isDone: boolean = false;

number : числовой тип данных для целых и действительных чисел. Пример :



let decimal: number = 6 ; // десятичные
let  float : number = 3.14 ; // вещественные или число с плавающей точкой
let hex: number = 0xf00d ; // шестнадцатеричное
let binary: number = 0b1010 ; // двоичный
let octal: number = 0o744 ; // восьмеричное

string : текстовый тип данных для символов и строк . Пример :
let color: string = "blue";

null и undefined : два специальных типа, соответствующих значениям null и undefined соответственно. Пример :
let empty: null = null;
let notParam: undefined = undefined;  //неопределенный 

Также не обязательно указывать тип данных, если вы передаете его очевидно.
const num = 10;
const str = 'Some string';
const bool = true;
const empty = null;
const notParam = undefined;



Давайте попробуем передать в аргумент функции тип данных:
function foo (num: number, str: string, bool: boolean, empty: null) {
  // Some logic
}

Также, если мы задаем значение по умолчанию в функции, тип не требуется.
function foo (num = 10, str = 'Some string', bool = true, empty = null){
  // Some logic
}

///////////////Сложные типы///////////////////////
Объект
В JavaScript, следовательно, и в TypeScript тип Object используется для хранения коллекции данных или более сложных структур. Он является структурой данных, которая может содержать данные разных типов.

Существует тип данных object :
const obj: object = {};

Это по факту пустой объект. Мы также можем написать так:
const obj: {} = {};

Как и со скалярными типами данных, мы можем не уточнять, что это Object :

let user = {
  name: "Tom",
  age: 30
};

Однако использование типа object не дает нам особого контроля за формой этого объекта.
Мы можем использовать более точную аннотацию с помощью типа объекта:
let user: { name: string; age: number } = {
  name: "Tom",
  age: 30
};
Здесь мы указываем, что объект user должен быть объектом, имеющим свойство name типа string и свойство age типа number .
//получим ошибку//
Теперь, если мы не укажем какое-либо свойство, то получим ошибку.
let user: { name: string; age: number } = {
  age: 30,
};

let userNameLikeNumber: { name: string; age: number } = {
  name: 10,
  age: 30,
};
В первом случае мы получили ошибку из-за отсутствия свойства name , а во втором, что там используется неправильный тип данных.
//

Но согласитесь, что не очень удобно дублировать типы и описывать их перед присвоением. Мы можем вынести тип отдельно с помощью ключевого слова type : 
type User = {
  name: string;
  age: number;
};

let user: User = {
  name: 'Tom',
  age: 30,
};

let userJack: User = {
  name: 'Jack',
  age: 25,
};
Здесь User – это наш собственный тип, который мы создали для представления пользователя.Мы можем использовать этот тип везде и мы использовали его для двух переменных: user и userJack.
Кроме того, мы можем использовать interface для определения объекта:
interface User {
  name: string;
  age: number;
}

let user: User = {
  name: 'Tom',
  age: 30,
};
В целом типы и интерфейсы позволяют улучшить структуру и повторное использование кода, а также помогают избежать ошибок за счет строгой типизации.
В этом случае нет существенной разницы между type и interface , в будущих блоках мы разберем их подробнее.


//////////////////Множество///////////
Массивы в TypeScript – это структуры, являющиеся упорядоченным набором элементов. Для объявления массива в TypeScript используется конструкция с квадратными скобками [] или общий тип Array .
Если мы хотим указать массив строк , мы делаем это так:
let arrString: string[];

//получим ошибку
Если мы попытаемся передать в него не строчный тип данных, мы получим ошибку.
let arrString: string[];
arrString = ['Text', 1];
export { };
  Как видим, число подсветилось как ошибка.


Давайте создадим массив чисел:
let arrNumber: number[];
Теперь он может содержать только числа, и любой другой тип данных будет вызывать ошибку.

let arrNumber: number[];
arrNumber = [1, 'Text'];
//

Кроме того, массивы в TypeScript могут быть многомерными . К примеру:
let matrix: number[][] = [[1, 2], [3, 4]];


Массивы также могут содержать элементы разных типов. К примеру:
let mixed: (number | string)[] = [1, 'two'];

Мы также можем указать тип массива через обобщение (generic) :
let numbers: Array<number> = [1, 2, 3, 4, 5];

Можно определить массив объектов в TypeScript. К примеру:
let users: {
    name: string;
    age: number;
}[] = [
    { name: 'Tom', age: 30 },
    { name: 'Jack', age: 25 },
    { name: 'Alice', age: 32 },
];

Или с использованием более удобной записи:
type User = {
    name: string;
    age: number;
};

let users: User[] = [
    { name: 'Tom', age: 30 },
    { name: 'Jack', age: 25 },
    { name: 'Alice', age: 32 },
];

//получим ошибку
Теперь, если какое - то значение объекта будет не того типа, мы получим ошибку.
type User = {
  name: string;
  age: number;
};                                      //str
let users: User[] = [{ name: 'Tom', age: '30' }];
//

Это показывает всю силу серьезной типизации. Но иногда нам это не нужно, и тогда мы можем воспользоваться типом данных any : 
let arrAny: any[];
В таком массиве можно хранить что угодно.
let arrAny: any[];
arrAny = [123, 'TEXT', { name: 'Tom' }, [1, 2, 3]];
export {};
Но не стоит злоупотреблять any , иначе TypeScript быстро превратится в JavaScript :