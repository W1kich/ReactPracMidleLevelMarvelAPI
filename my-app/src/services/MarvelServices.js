class MarvelService {
	_apiBase = 'https://gateway.marvel.com:443/v1/public/';
	_apiKey = 'apikey=7de4f012d99c5c5bd16a21956155921f';
	_baseOffset = 0;

	getResource = async (url) => {
			let res = await fetch(url);
	
			if (!res.ok) {
					throw new Error(`Could not fetch ${url}, status: ${res.status}`);
			}
	
			return await res.json();
	}

	getAllCharacters = async (offset = this._baseOffset) => {
			const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
			return res.data.results.map(this._transformCharcter);
	}

	getCharacter = async (id) => {
			const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
			return this._transformCharcter(res.data.results[0]);
	}

	_transformCharcter = (char) => {		
		return {
			id: char.id,
			name: char.name,
			description: char.description,
			thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			comics: char.comics.items
		}
	}
}

export default MarvelService;