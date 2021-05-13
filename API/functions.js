
const fetch = require("node-fetch");

exports.fetchCommits = () => {
    const commits = [];
    fetch('https://api.github.com/repos/httpie/httpie/commits')
      .then(res => res.json())
      .then(data => {data.map(rec=>{
        if(rec.author === null){
          console.log("Rec: Null");
        }else{
          commits.push({"User ID":rec.author.id,"User Name":rec.author.login});

        }
        
      })
      console.log(commits);
    }).catch( err => {
        console.log("Error: ",err);
    })
    return commits;
  }

