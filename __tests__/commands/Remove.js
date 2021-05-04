const rm = require('@Commands/Remove');

rm.__Rewire__('db', {
    remove: name => name,
});

it('should ', () => {
    const repl = jest.fn();
    cons msg = { author: { tag: 'test' }, reply: repl(e => e )};
    expect(rm.exec(msg)).toBeNull();
});
