# Contributing to Zellr

Thank you for your interest in contributing to Zellr! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

By participating in this project, you agree to uphold our [Code of Conduct](CODE_OF_CONDUCT.md).

## How Can I Contribute?

### Reporting Bugs

If you find a bug, please create an issue with:
- A clear, descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Your environment (OS, Node.js version, etc.)
- Any relevant screenshots or error messages

### Suggesting Enhancements

We welcome suggestions for new features or improvements. When opening an enhancement issue:
- Use a clear, descriptive title
- Provide a detailed description of the proposed feature
- Explain why this enhancement would be useful
- Include any mockups or examples if applicable

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following our coding standards
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Commit your changes** with clear, descriptive commit messages
6. **Push to your fork** and open a Pull Request

### Commit Message Guidelines

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

Example:
```
Add deployment status polling to frontend

Implements real-time status updates using Redis pub/sub pattern.
Fixes #123
```

## Development Setup

### Prerequisites

- Node.js 18+
- Redis server
- AWS / Cloudflare R2 credentials (or use environment variables)

### Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Zellr.git
cd Zellr
```

2. Install dependencies for each service:
```bash
# Upload Service
cd upload-service
npm install

# Deploy Service
cd ../deploy-service
npm install

# Request Handler
cd ../request-handler
npm install

# Web Frontend
cd ../web
npm install
```

3. Set up environment variables (create `.env` files as needed)

4. Start Redis:
```bash
redis-server
```

5. Run services in development mode (in separate terminals):
```bash
# Upload Service (Port 3000)
cd upload-service && npm run dev

# Deploy Service
cd deploy-service && npm run dev

# Request Handler (Port 3001)
cd request-handler && npm run dev

# Web Frontend
cd web && npm run dev
```

## Coding Standards

### TypeScript/JavaScript

- Use TypeScript for all new code
- Follow ESLint configuration
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions focused and modular

### Code Style

- Use 2 spaces for indentation
- Use single quotes for strings (unless double quotes are required)
- Add semicolons at the end of statements
- Use async/await for asynchronous operations

### File Structure

- Keep services modular and separated
- Follow existing directory structure
- Place utility functions in appropriate helper files

## Testing

- Test your changes locally before submitting
- Ensure all services can start without errors
- Test the full deployment flow if possible
- Verify edge cases and error handling

## Documentation

- Update README.md if you change setup instructions
- Add inline comments for complex logic
- Update API documentation if you modify endpoints
- Keep CONTRIBUTING.md updated if process changes

## Review Process

- All pull requests require review
- Address feedback promptly
- Be open to suggestions and constructive criticism
- Be patient - reviews may take time

## Questions?

If you have questions about contributing, feel free to:
- Open an issue for discussion
- Check existing issues and pull requests
- Review the documentation

Thank you for contributing to Zellr! 🚀

