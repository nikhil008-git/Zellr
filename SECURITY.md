# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Which versions are eligible for receiving such patches depends on the CVSS v3.0 Rating:

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |
| < Latest| :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability, please do **not** create a public GitHub issue. Instead, please report it privately using one of the following methods:

- **Email**: [Add your security contact email here]
- **Private Security Advisory**: Use GitHub's private vulnerability reporting feature if enabled

### What to Include

When reporting a security vulnerability, please include:

- Type of issue (e.g., buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit the issue

### Response Timeline

We will make a best effort to:

- Acknowledge receipt of the vulnerability report within **48 hours**
- Provide an initial assessment of the vulnerability within **7 days**
- Keep you informed of our progress in resolving the vulnerability
- Notify you when the vulnerability has been fixed

### Disclosure Policy

We follow a coordinated disclosure policy:

- **Vendors**: We will notify vendors of third-party dependencies if the vulnerability affects them
- **Public Disclosure**: We will publicly disclose the vulnerability after a fix has been released, typically within 90 days of the initial report

We appreciate your efforts to responsibly disclose your findings, and we will make every effort to acknowledge your contributions.

## Security Best Practices

When using Zellr, please follow these security best practices:

1. **Environment Variables**: Never commit sensitive credentials (AWS keys, Redis passwords, etc.) to version control
2. **Dependencies**: Keep all dependencies up to date
3. **Network Security**: Use HTTPS in production environments
4. **Access Control**: Implement proper authentication and authorization for deployments
5. **Resource Limits**: Set appropriate resource limits to prevent abuse
6. **Monitoring**: Monitor deployments for suspicious activity

## Known Security Considerations

### Current Limitations

- [List any known security limitations or considerations]

### Security Features

- [List security features that are implemented or planned]

## Security Updates

Subscribe to security updates by:
- Watching the repository for security advisories
- Checking the releases page for security patches

Thank you for helping keep Zellr and its users safe!

