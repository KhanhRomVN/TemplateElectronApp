#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const prompts = require('prompts');
const { reset, red, green, cyan } = require('kolorist');

async function init() {
  console.log();
  console.log(cyan('  @khanhromvn/create-electron-app'));
  console.log();

  let targetDir = process.argv[2];
  let result = {};

  try {
    if (!targetDir) {
      const { strategy } = await prompts(
        {
          type: 'select',
          name: 'strategy',
          message: reset('Where should we create the project?'),
          choices: [
            {
              title: 'New Directory',
              description: 'Create a new folder for the project',
              value: 'new',
            },
            {
              title: 'Current Directory',
              description: 'Use the folder you are currently in',
              value: 'current',
            },
          ],
          initial: 0,
        },
        {
          onCancel: () => {
            throw new Error(red('✖') + ' Operation cancelled');
          },
        },
      );

      if (strategy === 'current') {
        targetDir = '.';
      }
    }

    result = await prompts(
      [
        {
          type: targetDir ? null : 'text',
          name: 'projectName',
          message: reset('Project name:'),
          initial: 'electron-app',
        },
        {
          type: 'text',
          name: 'author',
          message: reset('Author:'),
          initial: 'Your Name',
        },
      ],
      {
        onCancel: () => {
          throw new Error(red('✖') + ' Operation cancelled');
        },
      },
    );
  } catch (cancelled) {
    console.log(cancelled.message);
    return;
  }

  const { projectName, author } = result;
  const finalTargetDir = path.resolve(process.cwd(), targetDir || projectName);

  if (fs.existsSync(finalTargetDir)) {
    const { replace } = await prompts({
      type: 'confirm',
      name: 'replace',
      message: red(
        `Target directory "${targetDir}" is not empty. Remove existing files and continue?`,
      ),
      initial: false,
    });

    if (!replace) {
      console.log(red('✖') + ' Operation cancelled');
      return;
    }
    await fs.emptyDir(finalTargetDir);
  }

  console.log(`\nScaffolding project in ${finalTargetDir}...`);

  const templateDir = path.resolve(__dirname, '..');

  // Filter function to exclude specific files/folders
  const filterFunc = (src, dest) => {
    const basename = path.basename(src);

    // Whitelist: explicit inclusions if we wanted, but blacklist is easier here
    // Blacklist
    if (
      basename === 'node_modules' ||
      basename === 'out' ||
      basename === 'dist' ||
      basename === '.git' ||
      basename === '.github' ||
      basename === '.husky' || // Optional: keep husky or not? Usually keep, but reset. Let's keep.
      basename === 'bin' || // Don't copy the CLI bin
      basename === 'package-lock.json' || // Don't copy lockfile
      basename === 'pnpm-lock.yaml' ||
      basename === 'yarn.lock' ||
      basename.startsWith('.env') // Don't copy env files
    ) {
      return false;
    }
    return true;
  };

  await fs.copy(templateDir, finalTargetDir, { filter: filterFunc });

  // Rename _gitignore to .gitignore if it exists (or just ensure .gitignore is correct)
  // In root mode, we likely used .gitignore directly.
  // If we have _gitignore, rename it. If we have .gitignore, it was copied.
  // HOWEVER, npm publish renames .gitignore to .npmignore (or excludes it).
  // Best practice for templates: Use _gitignore in the source and rename it.
  // But since we are Dual-Mode, we need .gitignore for the dev app.
  // We can just keep .gitignore and npm handle it?
  // Issue: npm publish usually excludes .gitignore unless explicitly included.
  // But we want it in the target.
  // Solution: We might need to manually ensure .gitignore is preserved or check if it's missing.
  // If we are "installing" via npm/npx, the source is the package in node_modules.
  // npm keeps .gitignore if it's in `files`.

  // Update package.json
  const pkgPath = path.join(finalTargetDir, 'package.json');
  const pkg = await fs.readJson(pkgPath);

  pkg.name = path.basename(finalTargetDir);
  pkg.author = author;
  pkg.description = `Electron application created with @khanhromvn/create-electron-app`;
  pkg.version = '0.1.0';

  // Remove CLI-specific config
  delete pkg.bin;

  // Remove CLI dependencies
  // We need to know which ones are CLI deps.
  const cliDeps = ['prompts', 'fs-extra', 'kolorist'];
  if (pkg.dependencies) {
    cliDeps.forEach((dep) => delete pkg.dependencies[dep]);
  }
  if (pkg.devDependencies) {
    cliDeps.forEach((dep) => delete pkg.devDependencies[dep]);
  }

  await fs.writeJson(pkgPath, pkg, { spaces: 2 });

  console.log(green('\nDone. Now run:\n'));
  console.log(cyan(`  cd ${path.relative(process.cwd(), finalTargetDir)}`));
  console.log(cyan('  npm install'));
  console.log(cyan('  npm run dev'));
  console.log();
}

init().catch((e) => {
  console.error(e);
});
