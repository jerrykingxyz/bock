const path = require('path');
const assert = require('assert');

const DependentPlugin = require('../../src/plugin/DependentPlugin');

const defaultConfig = {
  ext: ['html'],
  rules: {
    html: (ctx) => {
      let regexp = /(url\(|src=['"]|href=["'])([^'"()]*['")])/g;
      let dependentTmp = ctx.content.match(regexp);
      let dependentList = [];
      if (dependentTmp) {
        dependentTmp.forEach(obj => {
          let Obj = obj.split(/["'()]/);
          if (Obj[1].test(/(http:\/\/|https:\/\/|\/\/)/)) {
            dependentList.push([Obj[1]]);
          } else {
            dependentList.push([Obj[1], path.join(ctx.filepath)]);
          }

        });
      }
      return dependentList;
    },
  },
};

const ctx = {
  content: `<img src="https://test.com/test1.png"/><img src='./test/test2.jpg'/>
    <link rel="stylesheet" href="../test/test2.css">
    <img src="http://test.com/test2.png"/>
      <img src="http://test.com/test2.css"/>
    <div style="background: url(./test/test)"></div> 
    <script src="./test/data.js"></script> 
    <script src="./test1/data"></script> 
    <script src='//test.com/test'></script>
    <script src='//test.com/test.js'></script>
    </div> `,
  filepath: '/base/demo/test.html',
};

describe('dependent plugin test', function() {

  let dependentPlugin = new DependentPlugin({
    ext: ['html'],
  });

  it('config test', function() {
    assert.equal(dependentPlugin.toString(), defaultConfig.toString());
  });

  it('main function test1', async function() {
    let nextDone = false;
    await dependentPlugin.main(ctx, function() {
      nextDone = true;
    });
    console.log(ctx.dependent);
    assert.deepEqual(ctx.dependent, [
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