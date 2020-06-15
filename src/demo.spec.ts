import traceable from "."

interface Player {
	id: string
	username: string
	hp: number
	mana: number
	strength: number
}

const makeWinner = (): Player => ({
	id: "1234",
	username: "batman",
	hp: 200,
	mana: 100,
	strength: 50,
})

const makeLooser = (): Player => ({
	id: "1234",
	username: "batman",
	hp: 100,
	mana: 50,
	strength: 20,
})

class Game {
	constructor(public ui: { notifyWinner: (player: Player) => void }) {}

	turn(_player1: Player, player2: Player) {
		this.ui.notifyWinner(player2) // always fail test
	}
}

// Before
xtest(`Displays turn winner`, () => {
	const winner = makeWinner()
	const looser = makeLooser()
	const ui = { notifyWinner: jest.fn() }
	const game = new Game(ui)

	game.turn(winner, looser)

	expect(ui.notifyWinner).toHaveBeenCalledWith(winner)
})

// After
xtest(`Displays turn winner`, () => {
	const winner = traceable(makeWinner(), "winner")
	const looser = traceable(makeLooser(), "looser")
	const ui = { notifyWinner: jest.fn() }
	const game = new Game(ui)

	game.turn(winner, looser)

	expect(ui.notifyWinner).toHaveBeenCalledWith(winner)
})
