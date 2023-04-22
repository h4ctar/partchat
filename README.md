# Part Chat

![Continuous Deployment](https://github.com/h4ctar/partchat/actions/workflows/cd.yaml/badge.svg)

## Pipelines

There are two GitHub workflows; prod and preview.
Prod runs on all pushes to the main branch and just deploys the project to Vercel prod.
Preview runs on pushes to all other branches, it deploys to a preview environment and runs end-2-end tests.

## End-2-End Tests

End-2-end tests use Playwright and should test all nominal flows.

## Cache Control

## Auth

## Database
