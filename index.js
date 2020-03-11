require("dotenv").config

const core = require("@actions/core");
const axios = require('axios');

const {
    // INPUT_STATUS: ipstatus,
    // INPUT_TOKEN: tgtoken,
    // INPUT_CHAT: chatid,
    // INPUT_IU_TITLE: ititle,
    // INPUT_IU_NUM: inum,
    // INPUT_IU_ACTOR: iactor,
    // INPUT_IU_BODY: ibody,
    // INPUT_PR_NUM: pnum,
    // INPUT_PR_STATE: prstate,
    // INPUT_PR_TITLE: ptitle,
    // INPUT_PR_BODY: pbody,
    // GITHUB_EVENT_NAME: ghevent,
    GITHUB_REPOSITORY: repo,
    GITHUB_REF: branch,
    // GITHUB_ACTOR: ghactor,
    // GITHUB_SHA: sha,
    // GITHUB_WORKFLOW:ghwrkflw
} = process.env;

(async () => {
    try {
      const token = core.getInput("token");
      const org = core.getInput("org");
      const repoInput = core.getInput("repo");
      const branchInput = core.getInput("branch");

      console.log({
        repo,
        branch,
        token,
        org,
        repoInput,
        branchInput
      });
  
    //   const res = await postCircleciAction({
    //     token,
    //     org,
    //     repo,
    //     branch
    //   });
    //   console.log({
    //     res
    //   });

    } catch (error) {
      core.setFailed(error.message);
    }
  })();
  
  async function postCircleciAction({ token, org, repo, branch }) {
      const branchName = org && repo? `${org}/${repo}` : process.env.GITHUB_REPOSITORY
    return await axios.post(`https://circleci.com/api/v1.1/project/github/${branchName}/tree/${branch}`,{
        build_parameters:{
            CIRCLE_JOB : 'build'
        },
        headers: {
            'Content-Type': 'application/json',
            'user' : token
        }
    });
  }