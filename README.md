<!-- A README file for a github action which verifys that an env file matches another env file -->

# Env File Verifier

This action verifies that an env file matches another env file.

## Inputs

### `env-file`

**Required** The env file to verify. Default `"./.env"`.

### `env-file-example`

**Required** The env file to verify against. Default `"./.env.example"`.

## Example usage

```yaml
uses: actions/verify-env-against-example@v1
with:
  env-file: './.env'
  env-file-example: './.env.example'
```

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE)

## Contributing

If you'd like to contribute to this project, see [CONTRIBUTING.md](CONTRIBUTING.md) for more information.