# Part Chat

![Continuous Deployment](https://github.com/h4ctar/partchat/actions/workflows/cd.yaml/badge.svg)

## Pipelines

There is one continuous deployment GitHub workflows.
It runs on all pushes to the main branch, deploys to a preview environment where it runs the end-2-end tests and if they pass it deploys to prod.

The setup-node action is used to cache node dependencies.
A cache is also created for the playwright binaries; it uses the playwright version in the key to ensure it is updated when the playwright version changes.

The deployment URL is stored in the `url` output of the `preview-deploy` job and retrieved in the `end-2-end-test` job.

## End-2-End Tests

End-2-end tests use Playwright and should test all nominal flows.

## Database

The data is persisted in a Planetscale SQL database using the Prisma ORM.

![asf](docs/prisma-erd.svg)

## API Resources

## API Deployment

## API Cache Control

## Authentication/Authorisation

## Responsive Layouts
