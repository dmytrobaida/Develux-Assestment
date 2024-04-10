# Bitbucket Pull Request Creator

## How to run

1. Setup environment variables. You can set it in .env file or in some automated pipeline. You need to add following variables

```
BITBUCKET_USERNAME=your_bitbucket_username
BITBUCKET_APP_PASSWORD=your_bitbucket_app_pass
```

You can get app password using this link: [App Password](https://bitbucket.org/account/settings/app-passwords/)

2. Run the script

```
yarn start
```

where you may be asked for the following:

- package@1.0.0 - is a package name with new version
- path_to/package.json - is a path to original package.json
- repo_url - is a BitBucket url where we need to update package.json
- branch_name - is a name of the branch where we will update package.json and later will use to create pull request
- pull_request_title - title of pull request

## Points to improve

1. Move to TypeScript - ✅
2. Add some tests
3. Use cli library - ✅
4. Add validation - ✅
5. Add a linter - ✅
