var data = require('./home.json');
var data1 = require('./recommend1.json');
var data2 = require('./recommend2.json');
var data3 = require('./recommend3.json');
var list = require('./searchKey.json');
var search = require('./search.json');
var detail = require('./352876.json');
var read1 = require('./data1.json');
var read2 = require('./data2.json');
var read3 = require('./data3.json');
var read4 = require('./data4.json');
var reading = require('./chapter-list.json')

var mocks = {
    '/book/index': data,
    '/book/list?page=1&limit=10': data1,
    '/book/list?page=2&limit=10': data2,
    '/book/list?page=3&limit=10': data3,
    '/book/lists': list,
    '/book/search': search,
    '/book/detail?id=352876': detail,
    '/book/read?activing=1': read1,
    '/book/read?activing=2': read2,
    '/book/read?activing=3': read3,
    '/book/read?activing=4': read4,
    '/book/reading': reading
}

module.exports = function(url) {
    if (/\/book\/search\?/.test(url)) {
        url = 'book/search'
    }
    return mocks[url]
}