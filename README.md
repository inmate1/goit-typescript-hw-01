Для виконання домашнього завдання вам потрібно створити репозиторій goit-typescript-hw-01 та створити проект за допомогою Vite.



У папці src створіть дві папки: basic та generics. У цих папках ви будете створювати .ts файли для кожного завдання.



Базові типи

Метою цього блоку завдань є закріплення ваших навичок роботи з базовими типами TypeScript.



Завдання 1

Виконуйте це завдання у файлі src/basic/1.ts.



Є наступний JavaScript код:

const age = 50;
const username = 'Max';
const toggle = true;
const empty = null;
const callback = (a) => { return 100 + a };



Перетворіть цей код на TypeScript, вказавши відповідні типи для всіх змінних.



Завдання 2

Виконуйте це завдання у файлі src/basic/2.ts.



У вас є наступний JavaScript масив:

let person = ['Max', 21];

Як переписати його в TypeScript, використовуючи концепцію кортежів, щоб гарантувати, що перший елемент завжди буде рядком, а другий числом?



Завдання 3

Виконуйте це завдання у файлі src/basic/3.ts.



Створіть змінну, яка може містити або рядок, або число (union type)? Також, оголосіть змінну, яка може містити лише одне з двох можливих рядкових значень: 'enable' або 'disable' (literal type).



Завдання 4

Виконуйте це завдання у файлі src/basic/4.ts.



У вас є такі функції JavaScript:

function showMessage(message) {
  console.log(message);
}

function calc(num1, num2) {
  return num1 + num2;
}

function customError() {
  throw new Error('Error');
}



Як ви вкажете типи для аргументів і значень цих функцій, що повертаються?



Завдання 5

Виконуйте це завдання у файлі src/basic/5.ts.



Типізуйте функцію isWeekend яка приймає день тижня з enumDayOfWeek і повертає boolean значення, що вказує, чи це день робочий чи вихідний.

enum DayOfWeek {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday
}


const isWeekend = (day) => {
}



Завдання 6

Виконуйте це завдання у файлі src/basic/6.ts.



Створіть інтерфейс User для типізації об'єктів, які містять такі властивості. Зверніть увагу, що адреса є необов'язковою властивістю.

const mango = {
    name: 'Mango',
    age: 30,
    email: 'john@example.com',
    address: {
        city: 'New York',
        country: 'USA'
    }
};

const poly = {
    name: 'Mango',
    age: 30,
    email: 'john@example.com'
};



Завдання 7 

Виконуйте це завдання у файлі src/basic/7.ts.



У вас є два об'єкти:

const page1 = {
  title: 'The awesome page',
  likes: 100,
  accounts: ['Max', 'Anton', 'Nikita'],
  status: 'open',
  details: {
    createAt: new Date('2021-01-01'),
    updateAt: new Date('2021-05-01'),
  }
}

const page2 = {
  title: 'Python or Js',
  likes: 5,
  accounts: ['Alex'],
  status: 'close',
}



Створіть новий тип даних, який підходить для цих двох об'єктів.



Generic типи

Мета цього блоку допомогти зрозуміти та застосувати generics у TypeScript. Ви працюватимете з функціями, що повертають проміси, використовувати вбудований тип Pick, об'єднувати об'єкти за допомогою generics, а також вирішувати проблеми типів у класах.



Завдання 1

Виконуйте це завдання у файлі src/generics/1.ts.



Типізуйте асинхронну функцію fetchData, яка приймає URL ресурсу та повертає об'єкт з даними. Використовуйте Generics для типізації повернутих даних.



import axios from 'axios';

async function fetchData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching from ${url}: ${error}`);
  }
}



Завдання 2

Виконуйте це завдання у файлі src/generics/2.ts.



У вас є тип AllType. Існує функція compare, яка приймає два об'єкти. Ці об'єкти містять поля AllType. Ваше завдання – використовувати Pick та generics для вказівки, що поля цих параметрів належать AllType. Функція compare повинна повертати AllType.



type AllType = {
  name: string;
  position: number;
  color: string;
  weight: number
}

function compare (top, bottom): AllType {
  return {
    name: top.name,
    color: top.color,
    position: bottom.position,
    weight: bottom.weight,
  }
}



Завдання 3

Виконуйте це завдання у файлі src/generics/3.ts.



У вас є функція merge, яка поєднує два об'єкти. Використовуйте generics, щоб вказати, що ці об'єкти можуть бути будь-якого типу.



function merge (objA, objB) {
  return Object.assign(objA, objB);
}



Завдання 4

Виконуйте це завдання у файлі src/generics/4.ts.



Ви маєте форму реєстрації користувачів. Іноді потрібно попередньо заповнити форму даними користувача для оновлення його профілю. Однак вам не завжди потрібно заповнити всі поля. Наприклад, користувач може хотіти оновити лише свій email та пароль, залишивши ім'я та прізвище без змін.

Використовуючи утиліту Partial та generics, виправте тип параметра функції так, щоб уникнути помилок типізації.



type User = {
  name: string;
  surname: string;
  email: string;
  password: string;
}

function createOrUpdateUser(initialValues: User) {
  // Оновлення користувача
}

createOrUpdateUser({ 
  email: 'user@mail.com', 
  password: 'password123' 
});



Завдання 5

Виконуйте це завдання у файлі src/generics/5.ts.



У вас є перелік UserRole, який використовується для класифікації користувачів у вашому додатку. Ви хочете створити об'єкт RoleDescription, який зіставлятиме кожну роль користувача з її описом.

export enum UserRole {
  admin = 'admin',
  editor = 'editor',
  guest = 'guest',
}

// Замініть наступний код на версію за допомогою Record
const RoleDescription = {
  admin: 'Admin User',
  editor: 'Editor User',
  guest: 'Guest User',
};



Завдання 6

Виконуйте це завдання у файлі src/generics/6.ts.



У вас є тип Form, який містить інформацію про форму, включаючи поле errors. Ви хочете створити новий тип Params, який включає всі поля з Form, крім errors.



type Errors = {
  email?: string[];
  firstName?: string[];
  lastName?: string[];
  phone?: string[];
};

type Form = {
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  errors: Errors;
};

// Реалізуйте Params так, 
// щоб унеможливити поле 'errors' з типу Form
type Params =const name: string « "Bob";
const lastName: string » "Jonson";
const age: number - '12';
const isHappy: boolean = true;
const budget: null = null;
const status: undefined = undefined;
Create a Typescript function named displayUserProfile that takes a user profile object as an argument.
The user profile object should have the following properties: username(string), age(number), and
isActive(boolean) .The function should return a string summarizing the user's profile details
type userProfile = {
userName: string;
age: number;
isActive: boolean;
}
const user = {
userName: "Bob",
age: 12,
isActive: true
}

    function displayUserProfile (user: userProfile) {
    return `User name is ${user.userName} hi is ${user.age} years old and his is {user.isActive}`
    }
    console.loo(displayUserProfile(user)):

function loGName(name: string, lastName: string) {
return `${name}` ;
}

    []
    function calcTota(arr: number[]) {
    return arr.reduce((acc, el) => acc + el, 0)
    }

    const numbersArray = [10, 20, 30, 40];
    console.log(calcTotal(numbersArray)); // Output: 100

type User = {
name: string;
age: number;
}
const users =[{name:"bob", age: 17}, {name:"bob", age: 18}, {name:"bob", age: 19}]
users: User[]
function calcUsers (users: { name: string; age: number }[]) {
// return arr.reduce((acc, el) => acc + el, 0);
}

Specifick
// unknown
function safelyParseJson(jsonString: string): unknown {
try { I
const result: unknown = JSON.parse(jsonString);
if (typeof result === "object" && result !== null) {
return result;
// Type is verified as an object (non-null)
}
} catch (error) {
console.error('Failed to parse JSON:", error);
}
return null;
// Return null if parsing fails or type is incorrect
}
// any

function logDetails(value: any) {
console.log( `Value: ${value}, Type of value: ${typeof value}`);
}
///// enum словарь
enum VehicleType {
Car = "Audi",
Truck = "Scania",
Motorcycle = "Ducati"
}

function getVehicleType(vehicle: VehicleType): string {
return `The vehicle type is: ${vehicle}.`;
}
// Example usage:
console.log(getVehicleType(VehicleType.Car)); // Output: "The vehicle type is: Audi."
console.log(getVehicleType(VehicleType.Motorcycle)); // Output: "The vehicle type is: Ducati."

// Union Types

function formatlnput(input: string | number) {
if (typeof input === 'number') {
return input.toFixed(2); // Formats the number to two decimal places
} else {
return input.toUpperCase(); // Converts the string to uppercase
}
}

// Literal

<!-- function lightShower(color: string) {
    if (color = "green") {
    console.log("go");
    }	else if (color == "yellow") {
    console.log("ready");
    }	else if (color === "red") {
    console.log("ready");
    }
}
lightShower() -->

function lightShower(color: "green" | "yellow" | "red" ) {
if (color = "green") {
console.log("go");
} else if (color == "yellow") {
console.log("ready");
} else if (color === "red") {
console.log("ready");
}
}

//
function lightShower(color: string) {
if (color = "green") {
console.log("go");
} else if (color == "yellow") {
console.log("ready");
} else if (color === "red") {
console.log("ready");
}
}
lightShower("black") - //невалидная три типа данных

// типизация return for backend
function logName(name: string): string {
return `${name}` ;
}

// если не возвращает void, props in react
function logName(name: string): void {
console.log(`${name}`) ;
}
1.57
