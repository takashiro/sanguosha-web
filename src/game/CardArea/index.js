
import EventEmitter from 'events';

import Type from './Type';

class CardArea extends EventEmitter {

	/**
	 * Create a card area
	 * @param {CardArea.Type} type
	 */
	constructor(type) {
		super();

		this._type = type;
		this._cards = [];
	}

	type() {
		return this._type;
	}

	cards() {
		return this._cards;
	}

	size() {
		return this._cards.length;
	}

	/**
	 * Add ownership of cards going into this area
	 * @param {Card[]} cards
	 */
	own(cards) {
		this.emit('cardowned', cards);
	}

	/**
	 * Add cards into this area
	 * @param {Card[]} cards
	 */
	add(cards) {
		this._cards.push(...cards);
		this.emit('cardadded', cards);
		this.emit('numchanged', this._cards.length);
	}

	/**
	 * Remove cards into this area
	 * @param {Card[]} cards
	 * @return {Card[]}
	 */
	remove(cards) {
		for (let card of cards) {
			let pos = this._cards.indexOf(card);
			if (pos >= 0) {
				this._cards.splice(pos, 1);
			}
		}
		this.emit('cardremoved', cards);
		this.emit('numchanged', this._cards.length);
		return cards;
	}

	postStartPos(path) {
		this.emit('cardleave', path);
	}

	postEndPos(path) {
		this.emit('cardenter', path);
	}

}

CardArea.Type = Type;

export default CardArea;
