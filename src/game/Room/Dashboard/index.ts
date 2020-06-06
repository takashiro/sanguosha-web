import { EventEmitter } from 'events';

import CardArea from '../../CardArea';

import Player from './Player';
import Option from './Option';

interface Dashboard {
	on(event: 'playerChanged', listener: (player: Player) => void): this;
	on(event: 'optionsChanged', listener: (options: Option[]) => void): this;

	once(event: 'playerChanged', listener: (player: Player) => void): this;
	once(event: 'optionsChanged', listener: (options: Option[]) => void): this;

	off(event: 'playerChanged', listener: (player: Player) => void): this;
	off(event: 'optionsChanged', listener: (options: Option[]) => void): this;
}

class Dashboard extends EventEmitter {
	protected uid: number;

	protected player?: Player;

	protected options?: Option[];

	constructor(uid: number) {
		super();

		this.uid = uid;
	}

	getUid(): number {
		return this.uid;
	}

	getPlayer(): Player | undefined {
		return this.player;
	}

	setPlayer(player: Player): void {
		this.player = player;
		this.emit('playerChanged', player);
	}

	getSelectedCards(): number[] {
		if (!this.player) {
			return [];
		}

		const areas: CardArea[] = [
			this.player.getHandArea(),
			this.player.getEquipArea(),
		];

		const cards: number[] = [];
		for (const area of areas) {
			cards.push(...area.getSelectedCards());
		}
		return cards;
	}

	showOptions(options: Option[]): void {
		this.options = options;
		this.emit('optionsChanged', options);
	}

	/**
	 * Reset selectable cards, selected cards and disable all buttons.
	 */
	resetSelection(): void {
		delete this.options;
		this.emit('optionsChanged', []);

		if (this.player) {
			const areas: CardArea[] = [
				this.player.getHandArea(),
				this.player.getEquipArea(),
			];

			for (const area of areas) {
				area.setEnabled(false);
				area.setSelectableCards([]);
				area.setSelectedCards([]);
			}
		}
	}
}

export default Dashboard;