# CircleCI job trigger GitHub Action

[GitHub Action](https://github.com/features/actions) for triggering CircleCi job

This project deployment workflow uses this action.

This can be useful when want to migrate from CircleCi into Github actions and you want to do it step by step (e.g. run the first job in github action and then trigger the second job).

Default values would work for the most cases.
However **token** parameter must be passed to the action explicitly.


Actor would also be overridden when pushing to a repo cloud other than GitHub.

## Inputs

- `token`: value for git config user.name (default: `GitHub Action`)
- `org`: value for git config user.email (default: `github-action@users.noreply.github.com`)
- `repo`: value used to construct GIT_USER (default: **github.actor**)
- `branch`: value for git config user.password and GIT_USER

## Outputs

No outputs produced.

## Usage Example

```yaml
name: Deployment
on:
  push:
    branches:
      - master
jobs:
  publish:
    - uses: actions/checkout@v2
    # publish to a branch in current repo using GITHUB_TOKEN and other default settings
    - uses: oleksiyrudenko/gha-git-credentials@v1
      with:
        token: '${{ secrets.GITHUB_TOKEN }}'
    - run: |
        yarn run build
        yarn run deploy
    # publish to a branch in different repo using a PAT generated on that other repo
    - uses: oleksiyrudenko/gha-git-credentials@v1
      with:
        name: 'Oleksiy Rudenko'
        email: 'oleksiy.rudenko@domain.com'
        actor: 'OleksiyRudenko'
        token: '${{ secrets.GH_PAT_WEB_CENTRAL }}'
    - run: |
        git remote add web-central https://github.com/some-organization/website.git
        yarn run deploy web-central/master
```

## License

Scripts and documentation in this project are released under the [MIT license](LICENSE).

