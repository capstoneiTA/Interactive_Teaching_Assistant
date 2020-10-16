/**
 * Naming scheme: http://[Container Name]:[Container Port]
 */
const dbUrl = 'http://db:5000';

module.exports = function(app, db) {

    app.post("/uMeter/update", function(req, res) {
        let newScore = req.body.uScore;
        let response = {};
        //Get session creation data from post request
        db.Understanding_Value.create({
            Session_ID:11,
            User_ID:123,
            Understanding_Value: newScore,
            Timestamp: 123,
        }).then(function(){
                response.dbAdd = true;
                res.send(response);
            }
        ).catch(function(error){
            response.dbAdd = error.message;
            res.send(response);
        });
    });
};