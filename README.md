# Code Coverage from Snowpack Mounted Directory is Broken

This repository is a repro case for a but reported against snowpack. I've tried to strip this down
to it's simplest form. To reproduce the issue

```bash
> yarn install     # to install dependencies
> yarn start       # to run snowpack dev and view the rendered page successfully
> yarn test        # to run the tests and verify that 1/1 test passes
> yarn cover       # to run a coverage report and start a local server in that directory
```

When running the `yarn cover` task, browse to `http://localhost:3030` to view the report. Drill
into the coverage of `src/example.js` to see the following error in the report

```
Unable to lookup source: /home/jake/tmp/foo/example.js (ENOENT: no such file or directory, open '/home/jake/tmp/foo/example.js')
Error: Unable to lookup source: /home/jake/tmp/foo/example.js (ENOENT: no such file or directory, open '/home/jake/tmp/foo/example.js')
    at Context.defaultSourceLookup [as sourceFinder] (/home/jake/tmp/foo/node_modules/istanbul-lib-report/lib/context.js:17:15)
    at Context.getSource (/home/jake/tmp/foo/node_modules/istanbul-lib-report/lib/context.js:71:21)
    at annotateSourceCode (/home/jake/tmp/foo/node_modules/istanbul-reports/lib/html/annotator.js:213:40)
    at HtmlReport.onDetail (/home/jake/tmp/foo/node_modules/istanbul-reports/lib/html/index.js:409:33)
    at LcovReport. [as onDetail] (/home/jake/tmp/foo/node_modules/istanbul-reports/lib/lcov/index.js:28:23)
    at Visitor.value (/home/jake/tmp/foo/node_modules/istanbul-lib-report/lib/tree.js:38:38)
    at ReportNode.visit (/home/jake/tmp/foo/node_modules/istanbul-lib-report/lib/tree.js:88:21)
    at /home/jake/tmp/foo/node_modules/istanbul-lib-report/lib/tree.js:92:19
    at Array.forEach ()
    at ReportNode.visit (/home/jake/tmp/foo/node_modules/istanbul-lib-report/lib/tree.js:91:28)
```

# Details

When using Snowpack and Web Test Runner to show code coverage, the coverage report is broken
when using a snowpack mounted directory. It works fine if you run everything from the root
directory.

Repro steps:

  * Create a plain vanilla snowpack project with
    - src/index.html      - a stock html layout
    - src/example.js      - a simple javascript module
    - src/example.test.js - a simple test module

  * Configure snowpack to mount the `/src` directory as `/`

  * Configure web-test-runner as our test runner

  * Run the tests with the --coverage option.

Expected: Should be able to view html code coverage report
Actual: coverage report could not locate source files...

```
Unable to lookup source: /home/jake/tmp/foo/example.js (ENOENT: no such file or directory, open '/home/jake/tmp/foo/example.js')
Error: Unable to lookup source: /home/jake/tmp/foo/example.js (ENOENT: no such file or directory, open '/home/jake/tmp/foo/example.js')
    at Context.defaultSourceLookup [as sourceFinder] (/home/jake/tmp/foo/node_modules/istanbul-lib-report/lib/context.js:17:15)
    at Context.getSource (/home/jake/tmp/foo/node_modules/istanbul-lib-report/lib/context.js:71:21)
    at annotateSourceCode (/home/jake/tmp/foo/node_modules/istanbul-reports/lib/html/annotator.js:213:40)
    at HtmlReport.onDetail (/home/jake/tmp/foo/node_modules/istanbul-reports/lib/html/index.js:409:33)
    at LcovReport. [as onDetail] (/home/jake/tmp/foo/node_modules/istanbul-reports/lib/lcov/index.js:28:23)
    at Visitor.value (/home/jake/tmp/foo/node_modules/istanbul-lib-report/lib/tree.js:38:38)
    at ReportNode.visit (/home/jake/tmp/foo/node_modules/istanbul-lib-report/lib/tree.js:88:21)
    at /home/jake/tmp/foo/node_modules/istanbul-lib-report/lib/tree.js:92:19
    at Array.forEach ()
    at ReportNode.visit (/home/jake/tmp/foo/node_modules/istanbul-lib-report/lib/tree.js:91:28)
```

> *NOTE*: the path that istanbul was trying to lookup files is missing the /src component
