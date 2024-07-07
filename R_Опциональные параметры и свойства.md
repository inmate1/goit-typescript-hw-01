/////////// Опциональные параметры и свойства ///
В TypeScript можно сделать параметр опциональным , добавив символ ? после наименования параметра. Это означает, что параметр может быть пропущен при вызове функции.

function greet(name?: string) {
if (name) {
return `Hello, ${name}!`;
} else {
return `Hello!`;
}
}

console.log(greet('Alice')); // Виводить: Hello, Alice!
console.log(greet()); // Виводить: Hello!
export {};

Аналогично в TypeScript вы можете сделать свойство интерфейса или типа опциональным , добавив символ ? после названия свойства.
type Person = {
name: string;
age?: number; // age є опціональною властивістю
};

const alice: Person = { name: 'Alice', age: 27 };
const bob: Person = { name: 'Bob' }; // age не вказано, це припустимо
export {};
В этом примере age является опциональным свойством Person . Это означает, что при создании объекта типа Person , свойство age может быть пропущено.

Какую ошибку выдаст TypeScript в следующем коде?
type Person = {
name: string;
age?: number; }
let user: Person = { name: 'Alice', };
user.age = '27';
Верно! Даже если свойство age опционально, оно все равно должно быть числом, если оно указано

////////////// Разница между Type и Interface /////////////

TypeScript предоставляет два основных способа определения типов в вашем коде: с помощью type и interface .
Type и interface во многих аспектах очень схожи, и во многих случаях вы можете использовать их взаимозаменяемо.

Давайте опишем interface:

interface Animal {
name: string;
}

Как видим, это очень похоже на описание класса: мы не ставим знак равен ( = ) после Animal , а сразу начинаем описывать тип. Если бы мы использовали тип вместо интерфейса, это выглядело бы так:

type Animal = {
name: string;
}

Interface поддерживает объединение через объявления с тем же именем. Если вы определите два interface с одним и тем же именем, они будут "вонжены" в одно.

interface Animal {
name: string;
}

interface Animal {
age: number;
}

let dog: Animal = {
name: 'Fido',
age: 5,
};

export {};
Если мы хотим расширить один интерфейс другим, у которых разные имена, нам нужно использовать оператор extends:

interface Dog extends Animal {
bark: string;
}

В случае с типом нам пришлось бы использовать intersection (&).

type AnimalName = {
name: string;
};

type AnimalAge = {
age: number;
};

type Animal = AnimalName & AnimalAge;

let dog: Animal = {
name: 'Fido',
age: 5,
};

export {};
Мы также можем миксовать Interface и type , но результат нам придется сохранить как тип.
type Cat = {
meow: () => string;
};

interface Dog {
bark: () => string;
}

type DogOrCat = Dog | Cat;
type DogAndCat = Dog & Cat;

export {};
Вы могли бы задаться вопросом, зачем нам нужен Interface , если у нас уже есть Type ? Название ' Interface ' говорит само за себя. Он представляет собой некий ' интерфейс ', который должен описывать структуру объектов, их методы и свойства. Интерфейсы предпочтительно предназначены для описания классов. Поэтому они не могут сохранять в себе примитивные значения, как это может делать Type , а также массивы и другие структуры данных, не являющиеся объектами. Мы просто не сможем их туда сохранить, поскольку за синтаксисом сразу идут фигурные скобки {} .

Давайте воспользуемся им по назначению и опишем класс:

interface Animal {
name: string;
}

interface Dog extends Animal {
bark: string;
}

class MyDog implements Dog {
name = 'Fido';
bark = 'Woof!';
}

// Error: Property 'name' is missing in type 'OtherDog'
class OtherDog implements Dog {
bark = 'Woof!';
}

export {};
С помощью ключевого слова implements мы устанавливаем обязательные свойства для класса. Если теперь в классе мы пропустим любое свойство, указанное в интерфейсе, мы получим ошибку, как это произошло в классе OtherDog .

Мы можем реализовывать несколько интерфейсов одновременно.
interface Walkable {
walk(): void;
}

interface Eatable {
eat(): void;
}

class Animal implements Walkable, Eatable {
walk() {
console.log('The animal walks...');
}

eat() {
console.log('The animal eats...');
}
}

const animal = new Animal();

export {};

В этом примере класс Animal реализует два интерфейса: Walkable и Eatable .

Еще с помощью интерфейса можно обрисовать функцию.

interface AddFunc {
(n1: number, n2: number): number;
}

let add: AddFunc;

add = (n1:number, n2: number) => {
return n1 + n2;
}

Но, это не очень удобно и сложно смотрится, лучше в таких случаях использовать type .

Подробнее мы разберем интерфейсы и как с ними работать в модуле по ООП.
