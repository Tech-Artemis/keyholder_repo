## Getting Started

### Installation

Copy project contents (we assume you've got `git` installed, otherwise you can [download](
https://github.com/maprox/keyholder-angular/archive/master.zip) this project)
and go to the project's folder

```bash
git clone git@github.com:maprox/keyholder-angular.git
cd keyholder-angular
```

Install all dependencies

```bash
npm ci
```

You may also [check that tests are green](#running-the-tests) after installation

### Docker

Every project should have [Dockerfile](Dockerfile) nowadays, so we have it as well.
As you can see it's built on top of `node:latest` and installs [nginx](https://nginx.org/)
web-server which listens on 80 port. We use [nginx-default.conf](nginx-default.conf)
configuration file, which has a simple rule to serve our SPA (check
[Angular Docs](https://angular.io/guide/deployment#production-servers))

You can pull pre-built container using `maprox/keyholder-angular:latest` image
which is hosted on [Docker Hub](https://hub.docker.com/r/maprox/keyholder-angular/).

## Running the tests

This project does not have any e2e tests yet,
so running tests is as simple as running standard

```bash
ng test
```

