/**
 * A regular expression to evaluate semantic versions according to the specification
 * defined at https://semver.org.
 *
 * Source: https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string
 */
export const semver = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/
