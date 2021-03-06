import React from 'react';
import MovableCard from './component/MovableCard';

import Card from '../../game/MovableCard';
import CardArea from '../../game/CardArea';
import CardMotion from '../../game/CardMotion';

import './DrawPile.scss';

interface PileProps {
	area: CardArea;
}

interface PileState {
	cards: Card[];
}

class DrawPile extends React.Component<PileProps, PileState> {
	private node: React.RefObject<HTMLDivElement>;

	constructor(props: PileProps) {
		super(props);

		this.state = {
			cards: [],
		};

		this.node = React.createRef();
	}

	componentDidMount(): void {
		const { area } = this.props;

		area.on('cardLeaving', this.onCardLeaving);
		area.on('cardEntering', this.onCardEntering);
	}

	componentWillUnmount(): void {
		const { area } = this.props;

		area.off('cardLeaving', this.onCardLeaving);
		area.off('cardEntering', this.onCardEntering);
	}

	onCardEntering = (motion: CardMotion): void => {
		if (!this.node.current) {
			return;
		}

		const { top, left } = this.node.current.getBoundingClientRect();
		motion.setEndState({
			top,
			left,
			opacity: 1,
		});
		motion.moveBy({
			top: -top,
			left: -left,
		});

		for (const card of motion.getCards()) {
			card.once('destroyed', this.cleanCards);
		}

		this.setState(function (prev) {
			return {
				cards: [
					...prev.cards,
					...motion.getCards(),
				],
			};
		});
	}

	onCardLeaving = (motion: CardMotion): void => {
		if (!this.node.current) {
			return;
		}

		const { top, left } = this.node.current.getBoundingClientRect();
		motion.setStartState({
			top,
			left,
			opacity: 0,
		});
	}

	cleanCards = (): void => {
		this.setState((prev) => ({
			cards: prev.cards.filter((card) => card.isValid()),
		}));
	}

	render(): JSX.Element {
		const { cards } = this.state;
		return (
			<div ref={this.node} className="draw-pile">
				{cards.map((card) => <MovableCard key={card.getSerial()} card={card} />)}
			</div>
		);
	}
}

export default DrawPile;
