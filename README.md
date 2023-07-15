# Sample Monorepo PNPM

This repository serves as a sample monorepo using pnpm. It contains two applications: backend and frontend.

## Structure

The repository consists of:

- `apps/backend`: A backend application built with NestJS.
- `apps/frontend`: A frontend application built with Next.js.

For details about each application, refer to the `README.md` within each directory.

## Setting Up Development Environment

1. First, install the dependencies at the root directory of the repository:

```bash
$ pnpm install
```

2. Then, start each application. You can start each application with the following commands:

```bash
$ pnpm frontend dev
```

```bash
$ pnpm backend start:dev
```
