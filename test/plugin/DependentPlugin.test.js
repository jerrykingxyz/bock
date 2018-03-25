const path = require('path');
const assert = require('assert');

const DependentPlugin = require('../../src/plugin/DependentPlugin');

const ctx = {
  content: `<img src="https://test.com/test1.png"/><img src='./test/test2.jpg'/>
    <link rel="stylesheet" href="../test/test2.css">
    <img src="http://test.com/test2.png"/>
      <img src="http://test.com/test2.css"/>
    <div style="background: url(./test/test)"></div> 
    <script src="./test/data.js"></script> 
    <script src="./test1/data"></script> 
    <script src='//test.com/test' /></script>
    <script src='//test.com/test.js' /></script>
    </div> `,
  filepath: '/base/demo/',
};

describe('dependent plugin test', function() {

  let dependentPlugin1 = new DependentPlugin(['.css', '.js']);

  it('setRegExp test', function() {

    assert.ok(() => {
      let x = dependentPlugin1.regExp;
      let y = /(url\\(|src=['"]|href=["'])([^'"()]*(.css|.js)[?='")])/g;
      return (x instanceof RegExp) && (y instanceof RegExp) &&
          (x.source === y.source) && (x.global === y.global) &&
          (x.ignoreCase === y.ignoreCase) && (x.multiline === y.multiline);
    });
  });

  it('main function test1', async function() {
    let nextDone = false;
    await dependentPlugin1.main(ctx, function() {
      nextDone = true;
    });
    assert.deepEqual(ctx.dependentList, [
          ['../test/test2.css', '/base/test/test2.css'],
          ['http://test.com/test2.css'],
          ['./test/data.js', '/base/demo/test/data.js'],
          ['//test.com/test.js'],
        ],
    );
    assert.ok(nextDone);
  });

  let dependentPlugin2 = new DependentPlugin();

  it('main function test2', async function() {
    let nextDone = false;
    await dependentPlugin2.main(ctx, function() {
      nextDone = true;
    });
    assert.deepEqual(ctx.dependentList, [
          ['https://test.com/test1.png'],
          ['./test/test2.jpg', '/base/demo/test/test2.jpg'],
          ['../test/test2.css', '/base/test/test2.css'],
          ['http://test.com/test2.png'],
          ['http://test.com/test2.css'],
          ['./test/test', '/base/demo/test/test'],
          ['./test/data.js', '/base/demo/test/data.js'],
          ['./test1/data', '/base/demo/test1/data'],
          ['//test.com/test'],
          ['//test.com/test.js'],
        ],
    );
    assert.ok(nextDone);
  });

});