///// Generics /////
Общая концепция

Обобщенные типы ( Generics ) – это один из мощных инструментов TypeScript, помогающих создавать код, который можно использовать повторно, сохраняя одновременно строгую типизацию.

Основная идея обобщенных типов ( Generics ) состоит в том, что они позволяют определить " обобщенный " тип , который затем может быть специализирован для работы с разными другими типами. Вместо того, чтобы определять отдельные функции для каждого возможного типа данных, можно определить одну функцию, которая работает с "любым" типом данных.

Давайте сначала постараемся разобраться в следующем: мы хотим создать массив, содержащий только строки и числа. Что мы можем сделать? Например, примерно так:

let arr: any[] = [];

Да, этот массив может содержать строки и числа, но также может содержать все, что мы туда положим, от null к объектам . Но мы хотим, чтобы он содержал только строчки или числа. Именно здесь нам на помощь приходят generics .

Мы знаем, что массив это объект Array и хотим уточнить, какие типы в него могут входить:

let arr: Array<string | number> = [];

Мы указали, что тип Array будет состоять из строк и чисел и теперь, если мы передадим туда не тот тип, получим ошибку.

let arr: Array<string | number> = [];

arr = ['str', 10, true];

export {};
Рассмотрим еще один пример, когда использование обобщенных типов становится просто необходимым. Это происходит, когда мы работаем с асинхронным кодом. Поскольку Promise может вернуть абсолютно все, без дженерика мы никогда не узнаем, что он возвращает.

Создадим Promise , указав тип.
const promise: Promise<string> = new Promise((resolve) => {
setInterval(() => {
resolve('Done!');
}, 1000);
});

promise.then((data) => {
console.log(data);
});

export {};
Внутри ' data ' имеем тип ' string '. Если мы не укажем тип, он будет обозначен как ' any '.

///// Generic function/method Общая функция/метод ////

Обобщенные функции или методы в TypeScript являются способом создания функций, которые могут работать с разными типами данных, сохраняя одновременно типизацию входящих и исходящих данных.

Давайте посмотрим на пример простой обобщенной функции:
function identity<T>(arg: T): T {
return arg;
}

В этой функции T является обобщенным типом . Это означает, что T является определенным типом, указанным при вызове функции. Функция identity воспринимает аргумент типа T и возвращает значение того же типа T .

Мы можем вызвать эту функцию для разных типов:

let output1 = identity<string>("myString");
let output2 = identity<number>(100);

Также TypeScript может автоматически выводить тип при использовании обобщенных функций, поэтому мы можем опустить явное указание типа:

let output1 = identity("myString");
let output2 = identity(100);

Generics очень полезны в работе с коллекциями, промесями и многими другими случаями, когда функция должна быть гибкой по типам данных, но одновременно сохранять строгую типизацию.

В качестве примера давайте рассмотрим функцию, принимающую массив и возвращающий его первый элемент:

function firstElement<T>(arr: T[]): T {
return arr[0];
}

let numbers = [1, 2, 3, 4, 5];
let firstNum = firstElement(numbers);

let strings = ['a', 'b', 'c', 'd'];
let firstStr = firstElement(strings);

export {};

В этом примере функция firstElement может работать с массивами любых типов и всегда возвращает элемент того же типа, что и элементы массива. То есть тип T будет заменен на number или string в зависимости от передаваемых значений.

Давайте рассмотрим хрестоматийный пример – сочетание двух объектов.
function merge(objA: object, objB: object) {
return Object.assign(objA, objB);
}

const merged = merge({ name: 'Alisa' }, { age: 28 });

merged.name;

export {};
Мы получили ошибку на merged.name , потому что TypeScript просто не знает, что содержится в объекте.

Конечно, мы можем напрямую указать через ' as ' наличие ключей в объекте:

const merged = merge({name: 'Alisa'}, {age: 28}) as {name: string, age: number};

Но мы получаем очень грязный код, который трудно читать и поддерживать. Давайте воспользуемся дженерик-типами для решения этой проблемы.

Как мы знаем, функция тоже является объектом, а значит мы можем указать для нее дженерик , так же как мы это делали с массивом или промисом.

function merge<T, U>(objA: T, objB: U) {
return Object.assign(objA, objB);
}

const merged = merge({ name: 'Alisa' }, { age: 28 });

merged.name;
console.log(merged.name); // Alisa
console.log(merged.age); // 28

<!-- function merge<T, U>(objA: T, objB: U): T & U {
  return Object.assign(objA, objB);
}

const merged = merge({ name: 'Alisa' }, { age: 28 });

console.log(merged.name); // Alisa
console.log(merged.age);  // 28

export {};
Здесь мы определяем функцию merge с двумя дженериками T и U. Функция принимает два аргумента objA и objB, типы которых соответствуют дженерикам T и U. Функция возвращает объект, который является объединением типов T и U, что выражается как T & U (интерсекция типов).

Функция Object.assign объединяет objA и objB, создавая новый объект, содержащий все свойства из обоих объектов. Поскольку мы указали тип возвращаемого значения как T & U, TypeScript понимает, что объединенный объект будет содержать все свойства из обоих типов.

В результате переменная merged будет иметь тип, включающий свойства name и age, и доступ к этим свойствам будет типобезопасным.
export {}; -->

Мы передали два типа T и U , которые будут применены к аргументам функции, и теперь у нас нет ошибки. Мы получаем объединенный тип .

const merged: {
name: string;
} & {
age: number;
}

Мы также можем передавать типы при вызове функции.
type Person = {
name: string;
};

type AdditionFields = {
age: number;
};

function merge<T, U>(objA: T, objB: U) {
return Object.assign(objA, objB);
}

const merged = merge<Person, AdditionFields>({ name: 'Alisa' }, { age: 28 });

merged.name;

export {};

////////////////// Extends Расширяет///////////////

В контексте обобщенных типов ключевое слово extends используется для определения ограничений на типы, которые могут использоваться с обобщенным типом. Это позволяет нам уточнить, какие типы допустимы в обобщенных функциях или классах.

Вернемся к нашей предыдущей функции ' merge '. В нем есть проблема: мы можем передавать не только объекты, но и любой другой тип данных, и это не совсем то, что мы хотели бы видеть.

const merged = merge({ name: 'Alisa' }, 'TEXT'); // {0: 'T', 1: 'E', 2: 'X', 3: 'T', name: 'Alisa'}

Мы передали вторым аргументом строку 'TEXT' и у нас получится удивительный результат. Мы можем ограничить тип, используя extends .
function merge<T extends object, U extends object>(objA: T, objB: U) {
return Object.assign(objA, objB);
}

const merged = merge({ name: 'Alisa' }, 'TEXT');

merged.name;

export {};

Мы сделали:

T extends object, U extends object

Это дает нам ограничение, что T и U должны быть объектами .

Рассмотрим еще один пример. У нас есть функция, которая будет возвращать длину или строки или массива. Мы решили использовать для этого дженерики:
type Length = {
length: number;
};

function getLength<T extends Length>(str: T) {
return str.length;
}

getLength('text');
getLength([1, 2, 3]);
getLength(100); // Errro: Argument of type 'number' is not assignable to parameter of type 'ILength'

export {};
Передавая число в getLength мы получаем ошибку, поскольку у него нет метода length .

<!-- В вашем примере используется ограничение дженериков для функции, которая принимает аргумент, обладающий свойством length. Рассмотрим этот пример подробнее:

typescript
Копировать код
type Length = {
  length: number;
};

function getLength<T extends Length>(item: T): number {
  return item.length;
}

console.log(getLength('text'));     // 4
console.log(getLength([1, 2, 3]));  // 3
// getLength(100); // Error: Argument of type 'number' is not assignable to parameter of type 'Length'

export {};
Пояснение
Ограничение дженерика:

typescript
Копировать код
function getLength<T extends Length>(item: T): number {
  return item.length;
}
Здесь мы используем дженерик T, который ограничен типом Length. Это означает, что T может быть любым типом, который имеет свойство length типа number.

Тип Length:

typescript
Копировать код
type Length = {
  length: number;
};
Мы определили тип Length как объект, который содержит свойство length типа number.

Вызов функции с различными типами:

getLength('text'): строка 'text' имеет свойство length, поэтому этот вызов допустим и вернет 4.
getLength([1, 2, 3]): массив [1, 2, 3] также имеет свойство length, поэтому этот вызов допустим и вернет 3.
getLength(100): число 100 не имеет свойства length, поэтому TypeScript выдаст ошибку на этапе компиляции: Argument of type 'number' is not assignable to parameter of type 'Length'.
Заключение
Таким образом, с использованием ограничения дженериков <T extends Length> вы можете создать функцию, которая принимает аргументы, содержащие свойство length, и возвращает его значение. Это позволяет использовать один и тот же код для работы с разными типами данных, имеющими общее свойство. -->

<!-- Переменная дженерик T — это параметр типа, используемый в TypeScript для создания обобщённых (дженерик) функций, классов или интерфейсов. Она позволяет вам писать код, который может работать с разными типами, сохраняя при этом типобезопасность. Переменная дженерик T представляет собой заполнитель для типа, который будет определён во время вызова функции, создания экземпляра класса или реализации интерфейса.

Пример с функцией merge
Рассмотрим ваш первый пример с функцией merge:

typescript
function merge<T, U>(objA: T, objB: U): T & U {
  return Object.assign({}, objA, objB);
}

const merged = merge({ name: 'Alisa' }, { age: 28 });

console.log(merged.name); // Alisa
console.log(merged.age);  // 28
Пояснение
Объявление функции:

typescript

function merge<T, U>(objA: T, objB: U): T & U {
  return Object.assign({}, objA, objB);
}
merge<T, U>: Здесь <T, U> — это параметры типа (дженерики). T и U представляют типы объектов, которые будут переданы в функцию.
objA: T: Аргумент objA имеет тип T.
objB: U: Аргумент objB имеет тип U.
: T & U: Функция возвращает тип, который является пересечением типов T и U.
Вызов функции:

typescript

const merged = merge({ name: 'Alisa' }, { age: 28 });
При вызове функции merge, TypeScript автоматически определяет типы T и U на основе переданных аргументов:

T становится { name: string }
U становится { age: number }
Пример с функцией getLength
Теперь рассмотрим ваш второй пример:

typescript

type Length = {
  length: number;
};

function getLength<T extends Length>(item: T): number {
  return item.length;
}

console.log(getLength('text'));     // 4
console.log(getLength([1, 2, 3]));  // 3
// getLength(100); // Error: Argument of type 'number' is not assignable to parameter of type 'Length'

export {};
Пояснение
Объявление типа Length:

typescript

type Length = {
  length: number;
};
Этот тип определяет объект с свойством length типа number.

Объявление функции:

typescript

function getLength<T extends Length>(item: T): number {
  return item.length;
}
getLength<T extends Length>: Здесь <T extends Length> означает, что T может быть любым типом, который реализует интерфейс Length (то есть имеет свойство length).
item: T: Аргумент item имеет тип T, который должен соответствовать типу Length.
: number: Функция возвращает значение типа number.
Вызов функции:

typescript
Копировать код
console.log(getLength('text'));     // 4
console.log(getLength([1, 2, 3]));  // 3
// getLength(100); // Error: Argument of type 'number' is not assignable to parameter of type 'Length'
При вызове функции getLength:

getLength('text'): Строка имеет свойство length, поэтому вызов допустим и возвращает 4.
getLength([1, 2, 3]): Массив имеет свойство length, поэтому вызов допустим и возвращает 3.
getLength(100): Число не имеет свойства length, поэтому TypeScript выдаёт ошибку на этапе компиляции.
Заключение
Переменная дженерик T позволяет вам создавать обобщённые компоненты, которые могут работать с различными типами, обеспечивая при этом проверку типов на этапе компиляции. Это делает ваш код более гибким и безопасным. -->

Еще одним примером использования extends может быть функция, принимающая массив элементов определенного типа:

function arrayLogger<T extends Array<string>>(array: T): void {
array.forEach((item) => console.log(item));
}

arrayLogger(['Hello', 'World']); // Ok
arrayLogger([1, 2, 3]); // Error

export {};

В этом случае T extends Array означает, что параметр функции должен быть массивом строк.

///////////// keyof клавиша ////////////////////////////

Ключове слово, що повертає всі можливі ключі для заданого типу.

keyof — это оператор TypeScript, который возвращает типизированный набор ключей для данного типа. Другими словами, он возвращает тип, представляющий все возможные ключи этого типа.
keyof у TypeScript повертає тип string | symbol, що відповідає типам ключів в об'єктах JavaScript.
Возьмем, например, следующий тип:

type Person = {
name: string;
age: number;
location: string;
};

Если мы используем keyof с этим типом, то получим тип, представляющий все возможные ключи этого типа:

type PersonKeys = keyof Person; // 'name' | 'age' | 'location''

Теперь PersonKeys представляет любой ключ из Person . Это может быть полезно в функциях, принимающих объект типа Person и ключ этого объекта:
type Person = {
name: string;
age: number;
location: string;
};

type PersonKeys = keyof Person; // 'name' | 'age' | 'location'

function getPersonInfo(person: Person, key: PersonKeys) {
return person[key];
}

const john: Person = {
name: 'John',
age: 25,
location: 'NY',
};

console.log(getPersonInfo(john, 'age')); // 25
console.log(getPersonInfo(john, 'name')); // 'John'
console.log(getPersonInfo(john, 'job')); // Error: Argument of type '"job"' is not assignable to parameter of type 'PersonKeys'.

export {};
В этом примере getPersonInfo может принимать только ключи, допустимые для Person . Если бы мы попытались передать ключ, которого нет в Person , TypeScript выдал бы ошибку.

А теперь давайте применим дженерики к этой концепции с использованием ' keyof '. В нашей практике, вероятно, возникнет необходимость возвращать значение из объекта. Но даже если вы используете дженерики , вы можете натолкнуться на ошибку.

function extractValue<T extends object, U>(obj: T, key: U) {
return obj[key]; // Type 'U' cannot be used to index type 'T'
}

extractValue({ name: 'John' }, 'name');

export {};
Это происходит, поскольку TypeScript не может гарантировать, что указанный ключ действительно имеется в объекте. И здесь мы можем воспользоваться оператором ' keyof '. Он позволяет уточнить, что определенный тип существует как ключ в объекте.
function extractValue<T extends object, U extends keyof T>(obj: T, key: U) {
return obj[key];
}

extractValue({ name: 'John' }, 'name');

export {};
Здесь мы написали:

T extends object, U extends keyof T

То есть мы воспользовались ' extends ' для ограничения значений ' U ' ключами из объекта ' T '.

///////////// Generic Classes Общие классы ////////
Обобщенные классы в TypeScript разрешают найти класс с типами, которые могут быть установлены при разработке экземпляра класса. Это позволяет создавать классы, которые могут работать с разными типами данных, сохраняя одновременно строгую типизацию.
Як створити узагальнений клас? Правильно! class GenericClass<T> { ... }

class DataStorage<T> {
private data: T[] = [];

addItem(item: T) {
this.data.push(item);
}

getItems() {
return [...this.data];
}
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Hello');
textStorage.addItem('World');
console.log(textStorage.getItems()); // ['Hello', 'World']
textStorage.addItem(1); // Error: Argument of type 'number' is not assignable to parameter of type 'string'

const numberStorage = new DataStorage<number>();
numberStorage.addItem(1);
numberStorage.addItem(2);
console.log(numberStorage.getItems()); // [1, 2]
numberStorage.addItem('TEXT'); // Error: Argument of type 'number' is not assignable to parameter of type 'number'

export {};
В этом примере класс " DataStorage " имеет обобщенный тип " T ", который определяется при создании экземпляра класса. В результате мы получаем универсальный класс для хранения данных, который может работать со строками, числами или другими типами, которые мы определим.

Передавая туда значение не того типа, мы получаем ошибку как:

textStorage.addItem(1); // Error: Argument of type 'number' is not assignable to parameter of type 'string'

numberStorage.addItem('TEXT'); // Error: Argument of type 'number' is not assignable to parameter of type 'number'

Это также полезно для создания классов, работающих со специализированными типами. Например, мы можем определить класс " KeyValuePair ", принимающий два обобщенных типа: один для ключа и один для значения.

class KeyValuePair<TKey, TValue> {
constructor(private key: TKey, private value: TValue) {}

getKey(): TKey {
return this.key;
}

getValue(): TValue {
return this.value;
}
}

const pair1 = new KeyValuePair('name', 'Alice');
console.log(pair1.getKey()); // 'name'
console.log(pair1.getValue()); // 'Alice'

const pair2 = new KeyValuePair(1, true);
console.log(pair2.getKey()); // 1
console.log(pair2.getValue()); // true

export {};
Таким образом, мы можем использовать один и тот же класс, который будет работать с разными типами .

/////////////// Utility Types Типы утилит////////
TypeScript имеет большой набор утилитных типов , облегчающих жизнь разработчиков. Эти типы обеспечивают гибкость в работе с другими типами и обеспечивают простой и понятный способ создания новых типов на основе имеющихся. Все эти типы основаны на дженериках и предлагают дополнительные возможности для работы с типами.

Посмотреть больше типов можно в основной документации : https://www.typescriptlang.org/docs/handbook/utility-types.html

// Partial<T> Частичный<T>///

Утилитный тип Partial<T> создает новый тип на основе типа T , но делает все его свойства необязательными. Это очень полезно в ситуациях, когда вы хотите создать объект, основанный на определенном типе, но не хотите или не можете указать значение всех свойств сразу.  
type User = {
id: number;
name: string;
email: string;
registered: boolean;
};

function createUser(data: Partial<User>): User {
// Деякі значення за замовчуванням:
const defaultUser: User = {
id: Date.now(),
name: '',
email: '',
registered: false,
};

// З'єднуємо дані користувача та значення за замовчуванням
return { ...defaultUser, ...data };
}

const newUser = createUser({ name: 'Alice', email: 'alice@example.com' });

console.log(newUser);

export {};

В этом примере Partial<User> позволяет нам создавать пользователей, предоставляя только данные, известные на момент создания. Значения по умолчанию используются для других полей

// Readonly<T> Только чтение<T>//

Утилитный тип делает все свойства в типе T только для чтения. Это означает, что после того, как объект будет создан, его свойства нельзя изменить.

Давайте рассмотрим пример с типом User :
type User = {
id: number;
name: string;
email: string;
};

let alice: User = {
id: 1,
name: 'Alice',
email: 'alice@example.com',
};

alice.name = 'Bob'; // OK

let aliceReadonly: Readonly<User> = {
id: 1,
name: 'Alice',
email: 'alice@example.com',
};

user.name = 'Bob'; // Error: Cannot assign to 'name' because it is a read-only property.

export {};

В этом примере мы можем изменить имя пользователя после его создания. Но поскольку aliceReadonly имеет тип Readonly<User> , мы получим ошибку компиляции.

Помните, мы создавали тип кортежа? Но метод 'push' все равно работал. Так вот, используя Readonly , можно создать действительно неизменный массив.
const arr: Readonly<string[]> = ['One', 'Two', 'Three'];

arr.push('Four'); // Error: Property 'push' does not exist on type 'readonly string[]'.

export {};
const arr: Readonly<string[]> = ['One', 'Two', 'Three'];

arr.push('Four'); // Error: Property 'push' does not exist on type 'readonly string[]'.

export {};

Теперь этот массив нельзя модифицировать никоим образом.

// Pick<T, K> Выберите<Т, К> //

Pick — это утилитный тип в TypeScript, позволяющий выбрать набор свойств из существующего типа и создать новый тип на основе этих свойств.

Рассмотрим пример. У нас есть тип User , содержащий три свойства : id , name и email . Мы хотим создать новый тип, содержащий только id и name .

type User = {
id: number;
name: string;
email: string;
};

type UserBasicInfo = Pick<User, 'id' | 'name'>;

let userBasicInfo: UserBasicInfo = {
id: 1,
name: 'John Doe',
email: 'john@example.com', // Error: Property 'email' does not exist on type 'UserBasicInfo'
};

export {};

Pick очень полезен, когда вы хотите работать только с определенным подмножеством свойств имеющегося типа.

Он часто используется для составления типов, например, при работе с API , откуда может прийти множество полей. Обычно для всех этих полей уже существует некий базовый тип, будь то пользователь, страница или документ, и с помощью ' Pick ' мы выбираем нужные для конкретного случая поля.

type BaseEmployee = {
id: number;
firstName: string;
lastName: string;
position: string;
department: string;
startDate: Date;
// ...і багато інших полів
};

type BaseProject = {
id: number;
name: string;
budget: number;
deadline: Date;
// ...і багато інших полів
};

type Assignment = {
employee: Pick<BaseEmployee, 'id' | 'firstName' | 'lastName'>;
projects: Pick<BaseProject, 'id' | 'name' | 'deadline'>[];
shouldNotifyEmployee?: boolean;
};

export {};

В этом примере Assignment — это тип , описывающий свойства для компонента или функции, назначаемый сотрудниками ( BaseEmployee ) на проекты ( BaseProject ). Для этого используются только некоторые поля из BaseEmployee и BaseProject , а не все.

// Record<K, T> Запись<К, Т> //

Record<K, T> — это утилитный тип , позволяющий создавать типы с заранее известными свойствами. Это очень полезно, когда нужно создать объект с определенными ключами и значениями, типы которых вы заранее знаете.

Принцип работы Record следующий: вы указываете набор ключей K и тип T , который будет присвоен каждому из этих ключей.

Вот базовый пример использования Record:
type Weekdays = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';
type Weekend = 'Sat' | 'Sun';

type Day = Weekdays | Weekend;

type DayTranslations = Record<Day, string>;

const translations: DayTranslations = {
Mon: 'Понеділок',
Tue: 'Вівторок',
Wed: 'Середа',
Thu: 'Четверг',
Fri: "П'ятниця",
Sat: 'Субота',
Sun: 'Неділя',
};

export {};
В этом примере DayTranslations — тип объекта , ключами которого являются значения типа Day , а значениями — строки. Итак, вы получаете строго типизированный объект перевода, гарантирующий, что каждый день недели будет переведен.

Record часто используется для картенгов, переводов и других ситуаций, когда вам нужно создать объект с заранее известными ключами.

Мы можем использовать enum для этого. Давайте определим enum для наших ролей:

enum UserRoles {
admin = 'admin',
manager = 'manager',
employee = 'manager',
}

type UserRolesStatuses = Record<UserRoles, boolean>;

const userRoleStatuses: UserRolesStatuses = {
[UserRoles.admin]: true,
[UserRoles.manager]: false,
[UserRoles.employee]: true,
};

export {};

Здесь UserRoles – это перечисление, определяющее возможные роли пользователя. UserRolesStatuses — это тип , представляющий запись, где каждая роль пользователя сопоставлена ​​с буллевым значением, указывающим на активацию этой роли.

Рассмотрим еще один пример. Предположим, мы имеем форму с типом ' InitialFormType ', и мы хотим расширить этот тип ошибок, которые могут возникнуть.

type InitialFormType = {
name: string;
email: string;
password: string;
};

export type Form = InitialFormType & {
errors: Partial<Record<keyof InitialFormType, [string]>>;
};

export {};

Мы определяем тип Form , являющийся объединением InitialFormType и объекта, содержащего поле errors .

Keyof InitialFormType получает все ключи из InitialFormType (в этом случае, это name , email и password ), и Record создает новый тип, в котором каждый из этих ключей отображается на массив строк. Затем Partial делает каждое свойство этого нового типа необязательным.

// Omit<T, K> Опустить<T, K> //

Это Pick , но наоборот. Позволяет создать новый тип на основе типа T путем исключения набора свойств, указанных в K .
тип Person = {
имя: строка ;
возраст: номер ;
расположение: строка ;
};

Мы можем создать новый тип ' PersonWithoutLocation ', используя ' Omit ':

введите PersonWithoutLocation = Omit<Person, 'location '>;

Теперь ' PersonWithoutLocation ' является таким же типом , как и ' Person ', но без свойства ' location '. Это может быть полезно, если в некоторых контекстах мы не хотим обладать определенными свойствами в наших типах.

// ReturnType<T> Типвозврата<T>//

Позволяет получить тип возвращаемой функции. Для функций он должен использоваться с типом.

Вот простой пример:

function greeting() {
return 'Hello, world!';
}

type Greeting = ReturnType<typeof greeting>; // 'string'

function multiply(a: number, b: number) {
return a \* b;
}

type MultiplyResult = ReturnType<typeof multiply>; // 'number'

export {};
Давайте напишем обертку для функции, но возвратим тип из колбека. Здесь нам не нужен typeof , потому что TypeScript автоматически выводит типы для T.
type Callback = (...args: unknown[]) => unknown;

function createLoggedFunction<T extends Callback>(func: T) {
let funcRef = func;

const loggedFunction = (...args: Parameters<T>) => {
console.log(`Function ${func.name} was called with arguments:`, args);
const result = funcRef(...args) as ReturnType<T>;
return result;
};

return loggedFunction;
}

export {};
Теперь loggedFunction принимает функцию в качестве аргумента и возвращает новую функцию, которая внутри себя вызывает исходную функцию. Возвращаемый тип исходной функции сохраняется благодаря использованию ReturnType<T> .

// Parameters<T> Параметры<Т>//

Извлечение типов параметров типа функции T . Она возвращает кортеж, содержащий типы всех параметров функции T в том порядке, в каком они объявлены.

type MyFunctionType = (a: string, b: number, c: boolean) => void;

type MyParametersType = Parameters<MyFunctionType>;
// Результат: [string, number, boolean]

В этом примере MyFunctionType представляет тип функции с тремя параметрами: a типа string, b типа number и c типа boolean . Затем мы используем Parameters для получения типов параметров этой функции и присваиваем результат MyParametersType типа . Результатом будет тип [string, number, boolean] , представляющий кортеж из трех типов параметров функции.

Итак, утилита Parameters позволяет получить доступ к типам параметров функции в TypeScript, как мы это сделали в примере с ReturnType .

// NonNullable<T> Ноннулбле<T> //

Утилитный тип , принимающий тип T и исключающий из него null и undefined . Этот тип полезен, если вы хотите гарантировать, что значение не будет null или undefined .

Вот пример использования NonNullable :

type SomeType = string | null | undefined;

// NonNullableType будет равен 'string'
type NonNullableType = NonNullable<SomeType>;

У цьому прикладі SomeType — це тип, який може бути або рядком, або null, або undefined. Під час використання NonNullable<SomeType> ми отримуємо тип NonNullableType, який може бути тільки рядком

В этом примере SomeType – это тип, который может быть либо строкой, либо null , либо undefined . При использовании NonNullable<SomeType> мы получаем тип NonNullableType , который может быть только строкой.



Для типизации асинхронной функции fetchData с использованием дженериков (Generics), мы можем сделать следующее:

Определить параметр типа T, который будет использоваться для типизации возвращаемых данных.
Типизировать аргумент url как строку.
Использовать параметр типа T для типизации возвращаемого значения функции.
Вот как это можно сделать:

typescript
Копировать код
import axios from 'axios';

async function fetchData<T>(url: string): Promise<T> {
  try {
    const response = await axios.get<T>(url);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching from ${url}: ${error}`);
  }
}

// Пример использования
interface User {
  id: number;
  name: string;
  email: string;
}

async function getUserData() {
  const url = 'https://api.example.com/user/1';
  const userData = await fetchData<User>(url);
  console.log(userData.id, userData.name, userData.email);
}

getUserData();
Пояснение
Дженерик T:

typescript
Копировать код
async function fetchData<T>(url: string): Promise<T> {
Здесь T — это параметр типа, который позволяет функции fetchData быть обобщённой и работать с любым типом данных, который будет указан при вызове функции.

Типизация аргумента url:

typescript
Копировать код
async function fetchData<T>(url: string): Promise<T> {
Аргумент url типизирован как строка.

Типизация возвращаемого значения:

typescript
Копировать код
const response = await axios.get<T>(url);
Мы используем axios.get<T>(url), чтобы указать тип данных, который ожидается в ответе. Возвращаемое значение функции fetchData типизировано как Promise<T>, что указывает на то, что функция возвращает промис, который разрешается в значение типа T.

Пример использования:
В примере использования мы определяем интерфейс User и вызываем функцию fetchData с указанием типа User для типизации данных, полученных с сервера.

Этот подход позволяет вам типизировать данные, возвращаемые асинхронной функцией, и использовать эти типы в вашем коде, обеспечивая типобезопасность.








