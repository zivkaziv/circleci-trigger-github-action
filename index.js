require("dotenv").config
const core = require("@actions/core");
const axios = require('axios');

const {
    GITHUB_REPOSITORY: repo,
    GITHUB_REF: branch,
} = process.env;

(async () => {
    try {
      const token = core.getInput("token");
      const orgInput = core.getInput("org");
      const repoInput = core.getInput("repo");
      const branchInput = core.getInput("branch");

      const repoName = orgInput && repoInput? `${orgInput}/${repoInput}` : repo;
      const branchName = branchInput || (branch && branch.split('/').pop());
  
      console.log(`Triggering CircleCi job ${repoName} - ${branchName}`)
      const res = await postCircleciAction({
        token,
        repoName,
        branchName
      });

      console.log({
        res
      });

    } catch (error) {
      core.setFailed(error.message);
    }
  })();
  
  async function postCircleciAction({ token, repoName, branchName }) {
    return axios.post(`https://circleci.com/api/v1.1/project/github/${repoName}/tree/${branchName}`,{
        build_parameters:{
            CIRCLE_JOB : 'build'
        },
        headers: {
            'Content-Type': 'application/json',
            'user' : token
        }
    });
  }