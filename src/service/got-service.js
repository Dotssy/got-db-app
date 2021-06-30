export default class GotService {
	constructor() {
		this._apiBase = 'https://www.anapioficeandfire.com/api';
	}

	async getResourse(url) {
		const res = await fetch(`${this._apiBase}${url}`);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}

		return await res.json();
	}
	
	async getAllChars() {
		const chars = await this.getResourse(`/characters?page=5&pageSize=10`);
		return chars.map(this._transformCharacter);
	}

	async getChar(id) {
		const char = await this.getResourse(`/characters/${id}`);
		return this._transformCharacter(char);
	}

	async getAllHouses() {
		const houses = await this.getResourse(`/houses/`);
		return houses.map(this._transformHouse);
	}

	async getHouse(id) {
		const house = await this.getResourse(`/houses/${id}`);
		return this._transformHouse(house);
	}
	
	async getAllBooks() {
		const books = await this.getResourse(`/books/`);
		return books.map(this._transformBook);
	}

	async getBook(id) {
		const book = await this.getResourse(`/books/${id}`);
		return this._transformBook(book);
	}

	_transformCharacter(char) {
		const born = char.born ? char.born : '[N/A]',
			died = char.died ? char.died : '[N/A]',
			culture = char.culture ? char.culture : '[N/A]';

		return {
			name: char.name,
			gender: char.gender,
			born,
			died,
			culture
		};	
	}

	_transformHouse(house) {
		const region = house.region ? house.region : '[N/A]',
			words = house.words ? house.words : '[N/A]',
			titles = house.titles ? house.titles : '[N/A]',
			overlord = house.overlord ? house.overlord : '[N/A]',
			ancestralWeapons = house.ancestralWeapons ? house.ancestralWeapons : '[N/A]';

		return {
			name: house.name,
			region,
			words,
			titles,
			overlord,
			ancestralWeapons 
		};	
	}

	_transformBook(book) {
		const numberOfPages = book.numberOfPages ? book.numberOfPages : '[N/A]',
			publiser = book.publiser ? book.publiser : '[N/A]',
			released = book.released ? book.released : '[N/A]';

		return {
			name: book.name,
			numberOfPages,
			publiser,
			released
		};	
	}
}