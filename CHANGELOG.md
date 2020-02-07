# Change Log

All notable changes to the "bosun" extension will be documented in this file.

## 1.1.1 - 5th Feb 20

- FIX: Inline comments are not supported by Bosun. This drops the syntax highlighting for them
- FIX: `config_test` endpoint returns different response formats for different errors. The plugin correctly parses all know exception types.

## 1.1.0 - 19th Dec 19

- Jump to line on configuration parsing errors.
  - If an error is found while parsing a configuration file, the popup provides the option to jump to the incorrect line.

## 1.0.1 - 3rd Dec 19

- Include 'replace' in highlighted keywords

## 1.0.0 - 29th Oct 19

- Update packages to remove security vulnerabilities
- Finally deploy a stable version

## 0.2.4 - 20 Jun 18

- Namespace commands correctly

## 0.2.1 - 04 May 18

### Major

- added Bosun configuration validation

### Minor

- added user settings validation

## 0.1.0 - 04 May 18

- added OpenTSDB metric path autocomplete

## 0.0.3 - 03 Apr 18

- added lookup and entry to the list of keywords