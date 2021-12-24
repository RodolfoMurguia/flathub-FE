import axios from "axios";

//const apiUrl = process.env.NEXT_API_URL;
const apiUrl =  "http://localhost:8080/github-integration";

//Get all the branches of a repository
export const getRepo = async (repoName) => {
  const branchData = await axios.get(`${apiUrl}/get-branches/${repoName}`);

  return branchData.data;
};

//Get Details of a branch
export const getBrancDetails = async (repoName, branchName) => {
  const branchData = await axios.get(
    `${apiUrl}/get-branch/${repoName}/${branchName}`
  );

  return branchData.data;
};

//Get the commits of a branch
export const getCommits = async (repoName, branchName) => {
  const commitData = await axios.get(
    `${apiUrl}/get-commits/${repoName}/${branchName}`
  );

  return commitData.data;
};

//Get the details of a commit
export const getCommitDetails = async (repoName, commitHash) => {
  const commitData = await axios.get(
    `${apiUrl}/get-commit/${repoName}/${commitHash}`
  );

  return commitData.data;
};

//Get Pull Requests of a branch
export const getPullRequests = async (repoName) => {
  const pullRequestData = await axios.get(
    `${apiUrl}/get-pullrequest/${repoName}`
  );

  return pullRequestData.data;
};

//Create a new Pull Request
export const createPullRequest = async (repoName, repoHead, repoBase, title, body) => {
  const pullRequestData = await axios.post(`${apiUrl}/post-pullrequest/`, {
    repository: repoName,
    repoHead: repoHead,
    repoBase: repoBase,
    title: title,
    body: body,
  });

  return pullRequestData.data;
};

//Update a Pull Request
export const updatePullRequest = async (repoName, prId, title, body) => {
  const pullRequestData = await axios.put(
    `${apiUrl}/patch-pullrequest/${prId}`,
    {
      repository: repoName,
      title: title,
      bodyText: body,
    }
  );

  return pullRequestData.data;
};

//Merge a Pull Request
export const mergePullRequest = async (repoName, prId, prMessage) => {
  const pullRequestData = await axios.post(`${apiUrl}/put-pullrequest/`, {
    repository: repoName,
    pullRequestId: prId,
    commitMessage: prMessage,
  });

  return pullRequestData.data;
};
