# CircleCI job trigger GitHub Action

[GitHub Action](https://github.com/features/actions) for triggering CircleCi job

This project deployment workflow uses this action.

This can be useful when want to migrate from CircleCi into Github actions and you want to do it step by step (e.g. run the first job in github action and then trigger the second job).

Default values would work for the most cases.
However **org** , **repo** and **branch** can be useful as well.

## Inputs

- `token`: is a [personal API token](https://circleci.com/docs/2.0/managing-api-tokens/#creating-a-personal-api-token)
- `org`: variable and refers to the name of your CircleCI organization (default: `Current repo organization`)
- `repo`: variable and refers to the name of your repository (default: `Current repo`)
- `branch`: variable and refers to the name of your branch - (default: `Current Branch`)

## Outputs

No outputs produced.

## Usage Example

```yaml
name: Trigger CircleCi job

on:
  push:
      branches:
        - master

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@master

      - name: Trigger exiting circleci job
        uses: zivkaziv/circleci-trigger-github-action@master
        with:
          token: ${{ secrets.CIRCLE_CI_TOKEN }}
          branch: master
```

## License

Scripts and documentation in this project are released under the [MIT license](LICENSE).

