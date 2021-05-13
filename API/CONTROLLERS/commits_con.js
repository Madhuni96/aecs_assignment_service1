const mongoose = require("mongoose");
const Commit = require("../MODELS/commits_mod");
const fetch = require("node-fetch");

  exports.save_commit = (body) => {

    let org = body.org;
    let repo = body.repo;

    return new Promise((resolve, reject) => {
        let commits = [];
        let key = 1;
        fetch('https://api.github.com/repos/' + org + '/' + repo + '/commits')
            .then(res => res.json())
            .then(data => {data.map(rec=>{
                if(rec.author === null){
                    console.log("Rec: Null");
                }else{

                    if(commits.length > 0){
                        let alreadyExist = checkIdAlreadyExist(commits,rec.author.id);
                        if(alreadyExist === true){
                            commits = findCount(commits,rec.author.id);
                            
                        }else{
                            key = key + 1
                            commits.push({"key":key,"id":rec.author.id,"name":rec.author.login, "count": 1});
                        }
                    }else{
                        commits.push({"key":key,"id":rec.author.id,"name":rec.author.login, "count": 1});  
                    } 
                }    
            })

            const commit = new Commit({
                _id: mongoose.Types.ObjectId(),
                org: org,
                repo:repo,
                commits:commits
            });
            commit
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
            console.log(commits);
            }).catch( err => {
                console.log("Error: ",err);
            })
    })
  }

  const checkIdAlreadyExist = (commits,id) => {
    let alreadyExist = false;
    let commit = commits;

    commit.map(data => {
        if(data.id === id){
            alreadyExist = true;
        }
    });
    return alreadyExist;
  }

  const findCount = (commits,id) => {
    let commit = commits;

    for (var i in commit) {
        if (commit[i].id == id) {
           commit[i].count = commit[i].count + 1;
           break;
        }
      }
    return commit;
  }