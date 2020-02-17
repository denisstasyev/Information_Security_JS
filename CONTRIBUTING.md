# Development rules

## How to contribute to this project?

To contribute you need:

-   fork this repository
-   create your own new branch from `dev` branch
-   create commit and push it to your Git repository
-   create Pull request into `dev` branch of this repository
-   wait for Approve
-   SUCCESS!

## Where to put my encryption method?

To add encryption method (send) you need:

-   modify `src/config.ts` file by adding your method into `methods`
-   add your function into `utils/encryption.ts`
-   check logic in `send` function in `src/store/send/actions.ts`

P.S. All rules can be discussed
