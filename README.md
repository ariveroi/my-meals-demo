# My Meals: A Guide to Using AWS Amplify Gen 2 with React Native and Expo

Welcome to "My Meals," a comprehensive demonstration designed to guide you through integrating AWS Amplify Gen 2 into your React Native application using Expo. This README provides step-by-step instructions and essential information to help you effectively utilize our library and leverage the power of cloud technology.

## Prerequisites

Before diving into the setup and usage of "My Meals," ensure you have the following prerequisites met:

- **Node.js**: A recent version of Node.js installed on your system.
- **Expo CLI**: Install Expo CLI globally on your system.
- **AWS Account**: An active AWS account.
- **Git**: Basic understanding of Git and GitHub.
- **React Native Knowledge**: Fundamental understanding of React Native concepts.

### Additional Setup in AWS Cognito User Pool

After setting up the initial prerequisites and deploying your resources, you need to configure your Cognito User Pool:

1. **Navigate to the Cognito User Pool**: Access the AWS Management Console, and go to the Cognito service.
2. **Create a New User**: In your newly created Cognito User Pool, create a new user. This user will be the admin or the initial test user for your application.
3. **Verify the User**: Complete the verification process for the new user, which might involve verifying an email address or phone number, based on your Cognito User Pool settings.

## Getting Started

To begin using "My Meals," you will need AWS Amplify as your authentication provider. Follow these steps to integrate the library into your project:

1. **Install Dependencies**: Run `npm install` in your project directory to install all necessary dependencies.
2. **Deploy Resources with Amplify Sandbox**: Execute `npx amplify sandbox` to deploy your resources in the cloud.
3. **Start the Development Server**: Open a new terminal and run `npx expo start` to start the development application.

## User Resource Access Control

In "My Meals," we have implemented a robust access control system using AWS Amplify. This ensures that:

- **Owner-Based Access**: Only the owners (the users who created the shopping lists and ingredients) will have access to view and manage their own resources.
- **Privacy and Security**: Users cannot see or interact with resources created by others. This layer of privacy and security is crucial for applications handling personal data or user-specific content.

## Understanding Amplify Sandbox

AWS Amplify Sandbox provides each developer with a personal cloud sandbox environment, ideal for building, testing, and iterating on full-stack applications.

For more information, refer to the [Official Amplify Gen 2 Documentation](https://docs.amplify.aws/gen2/deploy-and-host/sandbox-environments/setup/).

## What Will You Deploy?

By following this guide, you will deploy key components essential for a robust application:

- **Cognito User Pool**: Manages user authentication.
- **AppSync API**: Serves as the GraphQL API provider.
- **DynamoDB Tables**: Two tables for storing your application's models.

## Cleanup

To dismantle and clean up the AWS services deployed by the Amplify Sandbox:

- **Stop the Amplify Sandbox**: Simply stop the `npx amplify sandbox` command in your terminal. This will destroy all the AWS services that were deployed, cleaning up your cloud environment.

This cleanup process is essential for maintaining a cost-effective cloud environment.
