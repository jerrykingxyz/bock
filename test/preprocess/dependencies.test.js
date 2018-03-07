const assert = require('assert');
const html = require('../../src/preprocess/dependencies/html');

const testData = {
    html: {
        content: `
            <div>
                <style>
                    .background {
                        background-image: url(../test/image);
                    }
                </style>
                <img src="http://test.com/test1.png"/><img src='./test/test2.jpg'/>
                <link rel="stylesheet" href="../test/test2.css">
                <div style="background: url(./test/test)"></div>
                <script src="./test/data.js"></script>
                <script src="./test1/data"></script>
            </div>
        `,
        result: [
            '../test/image',
            'http://test.com/test1.png',
            './test/test2.jpg',
            '../test/test2.css',
            './test/test',
            './test/data.js',
            './test1/data'
        ]
    }
};

describe('dependencies test', () => {
    it('html resolve', () => {
        const htmlTestData = testData.html;
        const res = html(htmlTestData.content);
        assert.deepEqual(res, htmlTestData.result, 'result file not equal')
    })
});