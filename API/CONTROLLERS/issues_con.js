const mongoose = require("mongoose");
const Issue = require("../MODELS/issues_mod");
const fetch = require("node-fetch");

  exports.save_issue = (body) => {

    let org = body.org;
    let repo = body.repo;

    return new Promise((resolve, reject) => {
        let issues = [];
        let key = 1;
        fetch('https://api.github.com/repos/' + org + '/' + repo + '/issues')
            .then(res => res.json())
            .then(data => {
                data.map(rec=>{
                    if(rec.user === null){
                        console.log("Rec: Null");
                    }else{
                        if(issues.length > 0){
                            let alreadyExist = checkIdAlreadyExist(issues,rec.user.id);
                            if(alreadyExist === true){
                                issues = findCount(issues,rec.user.id);
                                
                            }else{
                                key = key + 1
                                issues.push({"key":key,"id":rec.user.id,"name":rec.user.login, "count": 1});
                            }
                        }else{
                            issues.push({"key":key,"id":rec.user.id,"name":rec.user.login, "count": 1});  
                        } 
                }    
            })

            const issue = new Issue({
                _id: mongoose.Types.ObjectId(),
                org: org,
                repo:repo,
                issues:issues
            });
            issue
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
            console.log(issues);
            }).catch( err => {
                console.log("Error: ",err);
            })
    })
  }

  const checkIdAlreadyExist = (issues,id) => {
    let alreadyExist = false;
    let issue = issues;

    issue.map(data => {
        if(data.id === id){
            alreadyExist = true;
        }
    });
    return alreadyExist;
  }

  const findCount = (issues,id) => {
    let issue = issues;

    for (var i in issue) {
        if (issue[i].id == id) {
           issue[i].count = issue[i].count + 1;
           break;
        }
      }
    return issue;
  }