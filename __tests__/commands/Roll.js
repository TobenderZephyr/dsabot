require('module-alias/register');
require('babel-plugin-rewire');

const command = require('@Commands/Roll');
//const exec = command.__get__('exec');
describe('roll command', () => {
    const reply = jest.fn(str => str);
    const message = { author: { tag: 'test' }, reply: reply };
    it('should not return anything without correct arguments', () => {
        const args = ['1w6'];
        expect(command.exec(message, args)).resolves.toBeUndefined();
        expect(reply).toHaveBeenCalled();
    });
});
