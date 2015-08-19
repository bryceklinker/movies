var expect = require('chai').expect;
describe('AppDispatcher', function(){
    var AppDispatcher;

    beforeEach(function(){
        AppDispatcher = require('../../../src/client/dispatcher/appDispatcher');
    });

    it('should dispatch payload', function(){
        var receivedPayload;
        AppDispatcher.register(function(payload){
            receivedPayload = payload;
        });

        var sentPayload = {
            actionType: 'something'
        };
        AppDispatcher.dispatch(sentPayload);
        expect(receivedPayload).to.equal(sentPayload);
    });
});