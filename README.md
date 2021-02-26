# KDM API
Welcome to the mono-repo

## FRONTEND
[![frontend:build](https://github.com/codingscape/KDM_API/actions/workflows/frontend-build.yml/badge.svg)](https://github.com/codingscape/KDM_API/actions/workflows/frontend-build.yml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/9846f5c4-2f6e-4f04-94c8-02e281949594/deploy-status)](https://app.netlify.com/sites/mystifying-hermann-512e08/deploys)

The frontend dashboard, a react app deployed via github hooks to Netlify

## BACKEND
[![Pulumi](https://github.com/codingscape/KDM_API/actions/workflows/push.yml/badge.svg)](https://github.com/codingscape/KDM_API/actions/workflows/push.yml)
Java Spring Boot API w/ PostgreSQL

## INFRASTRUCTURE
Pulumi applicaiton to build/deploy to AWS

## .GITHUB
Github action definitions for CI/CD

### Pull Request
Creates a preview of infrastructure changes and tags the pull request with them in a comment

### Push
On push to the `main` branch, the Pulumi program is run, deploying new updates to the configured aws account.

