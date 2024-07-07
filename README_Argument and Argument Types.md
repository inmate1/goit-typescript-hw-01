

////////////////Типы для переменных и аргументов//////////
Any
Any — это тип данных, который используется, если вы не знаете, какой тип данных может содержаться в переменной.Переменные с типом any позволяют вызывать какие - либо свойства и методы без проверок типов.Этот тип данных делает переменную аналогичной переменной в JavaScript, что позволяет передавать в нее какие - либо значения.Однако следует избегать использования типа any, поскольку это обходит преимущества строгой типизации в TypeScript.
let notSure: any = 4;
notSure = 'maybe a string instead';
notSure = false;
notSure = {};

let num: number;

num = notSure;

export { };
  
Основной проблемой использования типа any в TypeScript является отсутствие строгой типизации. Сохраняй его в переменную, где указан тип.
let num: number;
num = notSure;
В этом случае TypeScript не вызовет ошибку на этапе компиляции, ведь любой потенциально может представлять собой любой тип данных. Даже если из кода понятно, что notSure – это объект, а не число . 

Но в каких случаях он может быть полезен? Например, когда мы работаем с библиотекой JavaScript, которая может возвращать различные типы данных, или в ситуациях, когда конкретный тип данных не имеет значения в контексте нашего кода.
let data: any = fetchData();

Или возьмем другой пример, когда функция принимает аргумент, тип которого нам не известен и который вообще не важен в этом контексте.Это может быть, например, определенная колбек - функция.
function fetchUserData(id: string, callback: (data: any) => void): void {
  // Тут може бути якийсь запит, але ми його заповнимо самі
  const responseData = { name: 'Tom' };

  callback(responseData);
}

// Використання функції:
fetchUserData('123', (data) => {
  console.log(data.name); // TypeScript не викличе помилку, навіть якщо поле name не існує
});

В TypeScript ключевое слово void используется для указания того, что функция не возвращает никакого значения. Оно говорит компилятору, что функция завершится без возврата значения.

В вашем примере функция fetchUserData принимает два аргумента: id (строка) и callback (функция, принимающая параметр data типа any и не возвращающая значения, что указано через void). Сама функция fetchUserData также не возвращает значения, поэтому ее возвращаемый тип тоже указан как void.

Вот более детальное объяснение каждой части функции:

typescript
Копировать код
function fetchUserData(id: string, callback: (data: any) => void): void {
  // Имитируем ответ от сервера
  const responseData = { name: 'Tom' };

  // Вызываем колбэк-функцию с данными ответа
  callback(responseData);
}

// Использование функции:
fetchUserData('123', (data) => {
  console.log(data.name); // TypeScript не вызовет ошибку, даже если поле name не существует
});
// Объяснение:
// function fetchUserData(id: string, callback: (data: any) => void): void:

// id: string указывает, что первый аргумент должен быть строкой.
// callback: (data: any) => void указывает, что второй аргумент должен быть функцией, принимающей параметр data типа any и не возвращающей значения.
// : void после объявления функции указывает, что сама функция fetchUserData не возвращает значения.
// const responseData = { name: 'Tom' };:

// Имитирует данные ответа от сервера, которые будут переданы в колбэк.
// callback(responseData);:

// Вызывает колбэк-функцию и передает ей данные ответа.
// fetchUserData('123', (data) => { console.log(data.name); });:

// Вызывается функция fetchUserData с ID пользователя и колбэк-функцией, которая логирует имя из полученных данных.
// Использование void для функции и колбэков помогает TypeScript понять, что не стоит ожидать возврата значения, что делает код более предсказуемым и понятным.


Это позволяет нам работать с данными, не зная их точной структуры.Однако это также означает, что TypeScript не сможет предоставить нам подсказки о том, какие свойства и методы доступны для объекта data.

////Unknown///
Тип unknown в TypeScript во многом похож на any, но он обеспечивает больше безопасности при работе с переменными.Если мы попытаемся присвоить значение переменной типа unknown другой переменной с конкретным типом без явного приведения типов, TypeScript выдаст ошибку.Это помогает предотвратить случайное присвоение значений неправильного типа.
let notSure: unknown = 4;
notSure = 'maybe a string instead';
notSure = false;

let num: number;
//error
num = notSure;
Как видим, нам не удалось сохранить значение переменной notSure в переменную num .

Тип unknown подходит для сценариев, когда вы не знаете точного типа данных, но все же хотите поддерживать строгую проверку типов.Переменные этого типа следует проверять перед их использованием.
  
Возьмем, например, следующую ситуацию: Вы получаете данные из API и не знаете их точного формата. В этом случае вам нужно будет произвести уточнение типов.

function fetchUserData() {
  return 'Tom';
}

let userData: unknown = fetchUserData(); // fetchUserData повертає невідомі дані
if (typeof userData === 'string') {
  console.log(userData.toUpperCase()); // OK, тепер ми знаємо, що це рядок
}
Следовательно, мы можем быть уверены, что мы обрабатываем данные правильного типа.
Ваш пример демонстрирует использование типа unknown в TypeScript. Тип unknown используется, когда мы не знаем точного типа данных, который будет возвращен или передан. Это более безопасная альтернатива any, поскольку требует уточнения типа перед выполнением операций, специфичных для данного типа.

// Вот как это работает в вашем примере:

// Функция fetchUserData:

// function fetchUserData() {
//   return 'Tom';
// }
// Эта функция возвращает строку 'Tom'.

// Использование типа unknown:


// let userData: unknown = fetchUserData();
// Переменной userData присваивается значение, возвращаемое функцией fetchUserData, и тип unknown указывает, что тип данных неизвестен.

// Проверка типа и выполнение операций:


// if (typeof userData === 'string') {
//   console.log(userData.toUpperCase()); // OK, теперь мы знаем, что это строка
// }
// Проверка типа с помощью typeof позволяет убедиться, что userData является строкой, и после этого безопасно вызвать метод toUpperCase.

// Зачем использовать unknown?
// Безопасность типов: В отличие от any, использование unknown требует явного уточнения типа перед выполнением операций, специфичных для данного типа, что помогает избежать ошибок.
// Явное уточнение типов: Принуждает разработчика явно уточнять тип, что делает код более предсказуемым и легким для чтения.
// Пример с реальным API:
// Допустим, у нас есть функция, которая получает данные из API и тип данных неизвестен заранее:

// async function fetchUserDataFromAPI(): Promise<unknown> {
//   const response = await fetch('https://api.example.com/user');
//   return await response.json();
// }

// async function main() {
//   let userData: unknown = await fetchUserDataFromAPI();

//   if (typeof userData === 'object' && userData !== null && 'name' in userData) {
//     const user = userData as { name: string }; // Уточнение типа
//     console.log(user.name.toUpperCase());
//   } else {
//     console.error('Invalid user data');
//   }
// }

// main();
// В этом примере:
// Функция fetchUserDataFromAPI выполняет запрос к API и возвращает данные, тип которых неизвестен заранее (unknown).
// Функция main:
// Получает данные от fetchUserDataFromAPI.
// Проверяет, что userData является объектом и содержит поле name.
// Использует оператор as для уточнения типа, чтобы TypeScript знал, что userData теперь имеет структуру { name: string }.
// Таким образом, использование unknown и последующее уточнение типов помогает обеспечить безопасность и предсказуемость кода при работе с данными неизвестного типа.

/////////////////Tuple/////////

Кортеж , особенно популярный в языках программирования как Python, это неизменный массив . В TypeScript это тип данных, позволяющий определить массив с фиксированным количеством элементов, типы которых известны, но не обязательно должны быть одинаковыми.

Он создается как массив, но вместо значений мы передаем типы данных, например[string, number].
let tupleType: [string, boolean];
tupleType = ['hello', true]; // OK
tupleType = [true, 'hello']; // Error. Неправильні типи
tupleType = ['hello', true, true]; // Error. Більше значень ніж у tuple

export {};
Кортежи удобны, когда нам нужно сохранить в массиве фиксированные значения, например, день, месяц и год.
let date: [number, number, number];
date = [7, 11, 2023]; // OK

Но есть нюанс: если мы добавим элемент в кортеж через метод push , то TypeScript не будет предупреждать, он не отслеживает реальное содержание массива.
let fixed: [string, number];
fixed = ['Text', 10];
fixed.push('Add this text');
Как видим, компилятор не смог разобраться и выдать ошибку.
Однако TypeScript предоставляет гибкие возможности для работы с кортежами , включая использование оператора расширения  (...) для создания кортежей переменной длины.

let tuple: [string, ...number[]];

tuple = ['hello', 42, 100, 200]; // OK
В этом случае первый элемент кортежа должен быть строчкой, однако все последующие — числами.

////////Enum////////Перечисление
Эта структура так обширно употребляется, что в TypeScript решили добавить ее как тип данных. Этот тип называется enum и, согласно хорошим практикам программирования, имена переменных этого типа должны начинаться с большой буквы .
enum Role {ADMIN, USER};
Рассмотрим применение на примере пользователя, обладающего определенными правами.

enum Role {
  ADMIN,
  USER,
}

const person = {
  role: Role.ADMIN,
};

if (person.role === Role.ADMIN) {
  console.log('Role: ', Role.ADMIN);
}

export = {};
Давайте посмотрим на скомпилированный код JavaScript.
var Role;
(function (Role) {
 Role[(Role['ADMIN'] = 0)] = 'ADMIN';
 Role[(Role['USER'] = 1)] = 'USER';
})(Role || (Role = {}));
var person = {
 role: Role.ADMIN,
};
if (person.role === Role.ADMIN) {
 console.log('Role: ', Role.ADMIN);
}
В консоли будет:
Role:  0

Мы также можем получить значение enum , хотя это редко используется.
enum Role {
 ADMIN,
 USER,
}
// Ваш пример демонстрирует, как TypeScript компилирует перечисления (enum) в JavaScript. При этом он преобразует перечисления в объект, где ключи и значения являются взаимно обратными. Давайте подробнее разберем это.

// TypeScript код
// typescript
// Копировать код
// enum Role {
//   ADMIN,
//   USER,
// }

// const person = {
//   role: Role.ADMIN,
// };

// if (person.role === Role.ADMIN) {
//   console.log('Role: ', Role.ADMIN);
// }

// export = {};
// Скомпилированный JavaScript код
// javascript
// Копировать код
// var Role;
// (function (Role) {
//   Role[(Role['ADMIN'] = 0)] = 'ADMIN';
//   Role[(Role['USER'] = 1)] = 'USER';
// })(Role || (Role = {}));
// var person = {
//   role: Role.ADMIN,
// };
// if (person.role === Role.ADMIN) {
//   console.log('Role: ', Role.ADMIN);
// }
// Объяснение скомпилированного JavaScript кода
// Определение перечисления Role:

// javascript
// Копировать код
// var Role;
// (function (Role) {
//   Role[(Role['ADMIN'] = 0)] = 'ADMIN';
//   Role[(Role['USER'] = 1)] = 'USER';
// })(Role || (Role = {}));
// В этом блоке кода создается объект Role, который имеет два свойства:

// Role.ADMIN = 0
// Role.USER = 1
// Кроме того, создаются обратные связи:

// Role[0] = 'ADMIN'
// Role[1] = 'USER'
// Создание объекта person:

// javascript
// Копировать код
// var person = {
//   role: Role.ADMIN,
// };
// Создается объект person с полем role, которому присваивается значение Role.ADMIN (т.е. 0).

// Проверка и вывод в консоль:

// javascript
// Копировать код
// if (person.role === Role.ADMIN) {
//   console.log('Role: ', Role.ADMIN);
// }
// Если значение role у объекта person равно Role.ADMIN (т.е. 0), то выводится сообщение в консоль.

// Вывод в консоль
// Поскольку Role.ADMIN компилируется в 0, вывод будет:

// makefile
// Копировать код
// Role:  0
// Как улучшить читаемость вывода
// Если вы хотите, чтобы в консоли отображалось название роли, а не ее числовое значение, вы можете сделать это следующим образом:

// typescript
// Копировать код
// enum Role {
//   ADMIN,
//   USER,
// }

// const person = {
//   role: Role.ADMIN,
// };

// if (person.role === Role.ADMIN) {
//   console.log('Role: ', Role[person.role]); // Это выведет 'Role: ADMIN'
// }

// export = {};
// Скомпилированный JavaScript код будет следующим:

// javascript
// Копировать код
// var Role;
// (function (Role) {
//   Role[(Role['ADMIN'] = 0)] = 'ADMIN';
//   Role[(Role['USER'] = 1)] = 'USER';
// })(Role || (Role = {}));
// var person = {
//   role: Role.ADMIN,
// };
// if (person.role === Role.ADMIN) {
//   console.log('Role: ', Role[person.role]);
// }
// Теперь в консоли будет выведено:

// makefile
// Копировать код
// Role:  ADMIN
// Использование Role[person.role] позволяет получить строковое представление роли по ее числовому значению.


Enum представляет собой набор констант , делающий код более понятным. Как мы видели в прошлом примере, значения enum обычно являются числа, однако мы можем задать свои значения.
enum UserStatus {
 Active = 'ACTIVE',
 Inactive = 'INACTIVE',
 Banned = 'BANNED',
}
let status: UserStatus = UserStatus.Active;

Кроме того, вы можете использовать enum для группировки взаимосвязанных значений, что может быть полезно для упрощения кода и улучшения читаемости:

enum HttpCodes {
  OK = 200,
  BadRequest = 400,
  Unauthorized = 401,
}
function respond(status: HttpCodes) {
  // handle response
}
respond(HttpCodes.OK);
Когда мы будем создавать свои типы, подробнее разберем, как enum может помочь нам в этом процессе.

Существует еще такая конструкция, как const enum . В отличие от обычного enum, const enum удаляется при транспиляции и не создает дополнительного объекта в JavaScript.

Значения const enum вставляются в место использования в виде литералов. Это может помочь улучшить производительность.
const enum HttpCodes {
  OK = 200,
  BadRequest = 400,
  Unauthorized = 401,
}

const status = HttpCodes.OK;

После компиляции в JavaScript получим следующий код:
const status = 200;

Как видно из примера, const enum удаляется из скомпилированного кода и его значение прямо вставляется в код. В этом случае HttpCodes.OK заменился на 200 . Это и является ключевым отличием const enum от обычного enum .

Однако существует одно ограничение использования const enum: их нельзя использовать в выражениях, требующих выполнения во время выполнения.Это связано с тем, что они заменяются их значением во время компиляции.
const enum Test {
  A = 1,
  B = 2,
}

for (let item in Test) {
  console.log(item);
}

export { };
  Подобные операции возможны только с обычными enum .


///////////////Union Type////////////////
Тип Союза
 Union Type в TypeScript позволяет указать, что значение может быть одним из нескольких типов. Это очень удобно, когда хотим определить переменную, которая может принимать разные типы данных. Типы перечисляются по вертикальной черте |
let mixedType: string | number | boolean;

 Давайте посмотрим, как это работает:

let mixedType: string | number | boolean;

mixedType = 'string'; // OK
mixedType = 10; // OK
mixedType = true; // OK
mixedType = {}; // Error: Type '{}' is not assignable to type 'string | number | boolean'.
export { };
 Union Type также можно использовать для аргументов функций.Давайте создадим функцию, которая объединяет строки или составляет числа.
function combine(param1: number | string, param2: number | string) {
return param1 + param2;
}

Мы получаем ошибку, потому что TypeScript просто не знает, строка там или число.

Давайте проверим типы в функции.
function combine(param1: number | string, param2: number | string) {
  if (typeof param1 === 'number' && typeof param2 === 'number') {
    return param1 + param2;
  } else {
    return param1.toString() + param2.toString();
  }
}

export {};
Теперь мы можем передавать в функцию либо числа, либо строчки.

Union Type работает не только с базовыми типами, но и с объектами
type Dog = { 
  legs: 4;
  bark: () => void;
}

type Fish = {
  fins: 2;
  swim: () => void;
}

let pet: Dog | Fish;



В этом примере переменная pet может быть либо объектом типа Dog , либо объектом типа Fish .



Однако существует важное ограничение: когда мы работаем с переменной Union Type , мы можем использовать только те свойства и методы, которые существуют у всех типов этого объединения. В примере выше мы не можем вызвать pet.bark() , если pet является типом Fish . Нам придется проверять, существует ли этот метод.

type Dog = {
  legs: 4;
  bark: () => void;
};

type Fish = {
  fins: 2;
  swim: () => void;
};

let pet: Dog | Fish;

// type guard function
function isDog(pet: Dog | Fish): pet is Dog {
  return 'bark' in pet;
}

// Перевіряємо, чи є наш вихованець собакою перед тим, як використовувати метод bark
if (isDog(pet)) {
  pet.bark(); // OK, тепер TypeScript знає, що pet - це Dog
} else {
  pet.swim(); // TypeScript знає, що якщо pet не Dog, то це має бути Fish
}

export {};
Очень часто разработчики предпочитают использовать Union Type вместо enum для перечисления всех допустимых значений. Это особенно удобно делать в связке с Literal Typ

////////////////Intersection Type/////////////////
Тип пересечения
Intersection type является методом объединения нескольких типов в один.Это позволяет создавать сложные типы, комбинируя простые.В TypeScript можно использовать символ & для создания типа intersection.
type Employee = {
  name: string;
  id: number;
};

type Manager = {
  employees: Employee[];
};

type CEO = Employee & Manager;

const ceo: CEO = {
  name: 'Alice',
  id: 1,
  employees: [
    {
      name: 'Bob',
      id: 2,
    },
  ],
};

export { };
В этом примере CEO представляет собой intersection тип Employee и Manager.Это означает, что объект типа CEO должен содержать все свойства, определенные в Employee и Manager.

////////////Literal Type/////Литеральный тип
Literal Type – это тип, приобретающий конкретное значение.С ним вы можете определить тип переменной так, чтобы он приобретал только определенные значения.  
type OneOrTwo = 1 | 2;
let value: OneOrTwo;
value = 1; // OK
value = 2; // OK
value = 3; // Error: Type '3' is not assignable to type 'OneOrTwo'.

type YesOrNo = 'yes' | 'no';
let answer: YesOrNo;
answer = 'yes'; // OK
answer = 'no'; // OK
answer = 'maybe'; // Error: Type '"maybe"' is not assignable to type 'YesOrNo'.

export { };
Здесь OneOrTwo может принимать только значение 1 или 2 , YesOrNo может принимать только значение " yes " или " no ".



Но давайте рассмотрим какой - нибудь боевой пример.Предположим, мы имеем функцию, принимающую строку в качестве аргумента и возвращающую стили для кнопки в зависимости от переданного значения.
type ButtonSize = 'small' | 'medium' | 'large';

function getButtonStyle(size: ButtonSize) {
  switch (size) {
    case 'small':
      return { fontSize: '10px', padding: '5px' };
    case 'medium':
      return { fontSize: '14px', padding: '10px' };
    case 'large':
      return { fontSize: '18px', padding: '15px' };
    default:
      return { fontSize: '14px', padding: '10px' };
  }
}

let myButtonStyle = getButtonStyle('medium'); // OK
myButtonStyle = getButtonStyle('extra-large'); // Error: Argument of type '"extra-large"' is not assignable to parameter of type 'ButtonSize'.

export {};
Здесь, если мы попытаемся вызвать функцию getButtonStyle с аргументом extra - large, TypeScript выдаст ошибку на этапе компиляции, поскольку extra - large не является допустимым значением для ButtonSize.