const Minesweeper = require('discord.js-minesweeper');

module.exports = {
	name: 'minesweeper',
  cooldown: 30,
	description: 'Play minesweeper!',
	execute(message, args) {
    const rows = parseInt(args[0]);
    const columns = parseInt(args[1]);
    const mines = parseInt(args[2]);
 
    if (!rows) {
      return message.channel.send(':warning: Please provide the number of rows.');
    }
 
    if (!columns) {
      return message.channel.send(':warning: Please provide the number of columns.');
    }
 
    if (!mines) {
      return message.channel.send(':warning: Please provide the number of mines.');
    }
 
    const minesweeper = new Minesweeper({ rows, columns, mines });
    const matrix = minesweeper.start();
 
    return matrix
      ? message.channel.send(matrix)
      : message.channel.send(':warning: You have provided invalid data.');
	}
};