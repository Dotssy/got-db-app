export default class GotService {
	constructor() {
		this._apiBase = 'https://www.anapioficeandfire.com/api';
	}

	getResourse = async (url) => {
		const res = await fetch(`${this._apiBase}${url}`);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}

		return await res.json();
	}
	
	getAllChars = async () => {
		const chars = await this.getResourse(`/characters?page=7&pageSize=10`);
		return chars.map(this._transformCharacter);
	}

	getChar = async (id) => {
		const char = await this.getResourse(`/characters/${id}`);
		return this._transformCharacter(char);
	}

	getAllHouses = async () => {
		const houses = await this.getResourse(`/houses/`);
		return houses.map(this._transformHouse);
	}

	getHouse = async (id) => {
		const house = await this.getResourse(`/houses/${id}`);
		return this._transformHouse(house);
	}
	
	getAllBooks = async () => {
		const books = await this.getResourse(`/books/`);
		return books.map(this._transformBook);
	}

	getBook = async (id) => {
		const book = await this.getResourse(`/books/${id}`);
		return this._transformBook(book);
	}

	_isSet = (data) => {
		return data ? data : '[N/A]';
	}

	_extractId = (data) => {
		const regex = /\/(\d+)$/;
		return +data.url.match(regex)[1];
	}

	_transformCharacter = (char) => {
		return {
			name: this._isSet(char.name),
			gender: this._isSet(char.gender),
			born: this._isSet(char.born),
			died: this._isSet(char.died),
			culture: this._isSet(char.culture),
			id: this._extractId(char)
		};	
	}

	_transformHouse = (house) => {
		return {
			name: this._isSet(house.name),
			region: this._isSet(house.region),
			words: this._isSet(house.words),
			titles: this._isSet(house.titles),
			overlord: this._isSet(house.overlord),
			ancestralWeapons: this._isSet(house.ancestralWeapons),
			id: this._extractId(house) 
		};	
	}

	_transformBook = (book) => {
		return {
			name: this._isSet(book.name),
			numberOfPages: this._isSet(book.numberOfPages),
			publiser: this._isSet(book.publiser),
			released: this._isSet(book.released),
			id: this._extractId(book)
		};	
	}
}