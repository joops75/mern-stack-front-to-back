# Mern stack front to back

This app is written based on the [DevConnector 2.0 course](https://github.com/bradtraversy/devconnector_2.0) by Brad Traversy.

Create a development config file at ```config/default.json```, using ```config/default-example.json``` as a template.
When ready to deploy, create a production config file at ```config/production.json```, using ```config/production-example.json```
as a template (only required if any of the values differ from ```config/default.json```).

You can get a github access token by following [these instructions](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line).
This app doesn't require any permissions so don't select any in the _scopes_.

Start frontend and backend development servers with ```npm run dev```.

Make a production build with ```npm run build --prefix client```.
The production build can then be served with ```NODE_ENV=production npm start```.
