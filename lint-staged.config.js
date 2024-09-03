const { ESLint } = require('eslint');
const { execSync } = require('child_process');
const path = require('path');

const removeIgnoredFiles = async (files) => {
  const eslintIgnorePath = path.resolve('packages/sdk/.eslintignore');
  const eslint = new ESLint({ ignorePath: eslintIgnorePath });

  const ignoreFileDir = path.dirname(eslintIgnorePath);

  const isIgnored = await Promise.all(
    files.map(async (file) => {
      const relativeFilePath = path.relative(ignoreFileDir, file);
      const ignored = await eslint.isPathIgnored(relativeFilePath);
      return ignored;
    }),
  );

  const filteredFiles = files.filter((_, i) => !isIgnored[i]);
  return filteredFiles;
};

module.exports = {
  'packages/sdk/**/*.{js,ts,tsx}': async (files) => {
    const filesToLint = await removeIgnoredFiles(files);

    if (filesToLint.length > 0) {
      const fileArgs = filesToLint.join(' ');
      const command = `pnpm exec eslint ${fileArgs} --fix --max-warnings=0 --ext .ts`;
      try {
        execSync(command, { stdio: 'inherit' });
        process.exit(0); // Explicitly exit with 0 on success
      } catch (error) {
        console.error('Linting failed. Commit will be aborted.');
        process.exit(1); // Exit with 1 on failure to block the commit
      }
    } else {
      console.log('No eligible files to lint. Skipping lint-staged command.');
      process.exit(0); // Exit with 0 since there's nothing to lint
    }
  },
};
