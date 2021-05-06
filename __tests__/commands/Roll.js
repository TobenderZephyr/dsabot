require('module-alias/register');
require('babel-plugin-rewire');

const command = require('@Commands/Roll');
//const exec = command.__get__('exec');
describe('roll command', () => {
    const message = { reply: str => str };
    it('should not return anything without correct arguments', () => {
        const args = ['1'];
        expect(command.exec(message, args)).resolves.toBeUndefined();
    });
});
