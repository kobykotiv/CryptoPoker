## Maintenance Instructions

To ensure the continued health and smooth operation of this project, follow these guidelines:

### Dependencies

*   **Keep Dependencies Updated:** Regularly update dependencies using `bun update`. Review changes carefully to avoid introducing breaking changes.
*   **Audit Dependencies:** Periodically audit dependencies for security vulnerabilities using `bun audit`.
*   **Manage .gitignore:** Ensure that the `.gitignore` file is up-to-date, preventing unnecessary files from being committed (e.g., `node_modules`, `dist`, `.env`).

### Code Quality

*   **Linting and Formatting:** Maintain consistent code style by using a linter (e.g., ESLint) and formatter (e.g., Prettier).  Configure these tools to run automatically on commit.
*   **Testing:** Write and maintain unit and integration tests to ensure code reliability. Run tests regularly using `bun test`.
*   **Code Reviews:** Conduct thorough code reviews to catch potential issues and ensure code quality.

### Build Process

*   **Build Script:** Familiarize yourself with the `build.ts` script. Understand the available options and how they affect the build process.
*   **Environment Variables:** Properly manage environment variables, especially when deploying to different environments. Use `.env` files for local development and configure environment variables in production.
*   **Tailwind CSS:** Be aware of the Tailwind CSS configuration and how it integrates with the build process via the `bun-plugin-tailwind` plugin.  Refer to `bunfig.toml` for plugin configuration.

### General

*   **Documentation:** Keep the `README.md` file updated with relevant information about the project, including installation instructions, usage examples, and deployment guidelines.
*   **Logging and Error Handling:** Implement robust logging and error handling to facilitate debugging and monitoring.
*   **Performance Monitoring:** Monitor the application's performance and identify potential bottlenecks.

write detailed and verbose documentation