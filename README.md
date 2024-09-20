# FA24_CSE201
Project Repository for CSE 201

## Creating a New Branch
git checkout develop
git checkout -b <branchName>
git push --set-upstream origin <branchName>

These commands will get you started with your own branch

## Pushing code changes
When commiting and pushing code changes you should commit frequently to make sure your changes are saved. 
git add ./FilePath (this adds the changes to the commit logs)
git commit -m "This is where you comment the changes made"
once you're done committing changes you do the following command
git push origin (this will push all changes to the repo)

## Merging Code to Develop
When pushing your code to the server once you have what you need uploaded create a pull request. On github.com goto pull requests (if there are recent changes you can just click the name of your branch in the yellow banner) click "New Pull Request" then select your branch name. Invite reviews to review your code. 
Reviewers, you need to review the code and test it before you "Squash and Merge" the pull request into develop. 