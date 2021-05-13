const mongoose = require("mongoose");
const Pull = require("../MODELS/pulls_mod");
const fetch = require("node-fetch");

  exports.save_pull = (body) => {

    let org = body.org;
    let repo = body.repo;

    return new Promise((resolve, reject) => {
        let pulls = [];
        let key = 1;
        fetch('https://api.github.com/repos/' + org + '/' + repo + '/pulls')
            .then(res => res.json())
            .then(data => {
                data.map(rec=>{
                    if(rec.user === null){
                        console.log("Rec: Null");
                    }else{
                        if(pulls.length > 0){
                            let alreadyExist = checkIdAlreadyExist(pulls,rec.user.id);
                            if(alreadyExist === true){
                                pulls = findCount(pulls,rec.user.id,rec.state);    
                            }else{
                                key = key + 1;
                                if(rec.state === "open"){
                                    pulls.push({"key":key,"id":rec.user.id,"name":rec.user.login, "openCount": 1,"closeCount":0});
                                }else if(rec.state === "close"){
                                    pulls.push({"key":key,"id":rec.user.id,"name":rec.user.login, "openCount": 0,"closeCount":1});
                                }
                                
                            }
                        }else{
                            if(rec.state === "open"){
                                pulls.push({"key":key,"id":rec.user.id,"name":rec.user.login, "openCount": 1,"closeCount":0});
                            }else if(rec.state === "close"){
                                pulls.push({"key":key,"id":rec.user.id,"name":rec.user.login, "openCount": 0,"closeCount":1});
                            }
                        } 
                }    
            })

            const pull = new Pull({
                _id: mongoose.Types.ObjectId(),
                org: org,
                repo:repo,
                pulls:pulls
            });
            pull
                .save()
                .then(() => {
                    resolve({ status: 201, message: "success" });
                })
                .catch((err) => {
                    const validation_errors = err.validation_errors;
                    console.log(err);
                    if (validation_errors) {
                        reject({ status: 422, error: validation_errors });
                    } else {
                        reject({ status: 500, error: "Server error" });
                    }
                }); 
            console.log(pulls);
            }).catch( err => {
                console.log("Error: ",err);
            })
    })
  }

  const checkIdAlreadyExist = (pulls,id) => {
    let alreadyExist = false;
    let pull = pulls;

    pull.map(data => {
        if(data.id === id){
            alreadyExist = true;
        }
    });
    return alreadyExist;
  }

  const findCount = (pulls,id,state) => {
    let pull = pulls;

    for (var i in pull) {
        if (pull[i].id == id) {
            if(state === "open"){
                pull[i].openCount = pull[i].openCount + 1;
                break;
            }else if(state === "close"){
                pull[i].closeCount = pull[i].closeCount + 1;
                break;
            } 
        }
      }
    return pull;
  }