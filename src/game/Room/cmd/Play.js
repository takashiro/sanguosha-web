
// @TO-DO: extract available skills
export default function Play(options) {
	const client = this.getClient();
	const locker = client.lock();

	const dashboard = this.getDashboard();
	const player = dashboard.getPlayer();
	const handArea = player.getHandArea();

	handArea.setSelectedCards([]);
	const onSelectedCardsChanged = (cards) => {
		handArea.off('selectedCardsChanged', onSelectedCardsChanged);
		client.reply(locker, { cards });
	};
	handArea.once('selectedCardsChanged', onSelectedCardsChanged);

	client.once('lockChanged', () => {
		handArea.off('selectedCardsChanged', onSelectedCardsChanged);
	});

	handArea.setSelectableCards(options.cards);
	handArea.setEnabled(true);
}
