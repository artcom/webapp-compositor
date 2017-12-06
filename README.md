# Webapp Compositor

This webapp composes external webapps on multiple layers via an MQTT API. WebApps can be started with specific enter/exit transitions as well as individual geometry for custom overlay scenarios.

## Run

* Run in development: `ADMINISTRATION_TOPIC=<administration-topic> npm run watch`
* Start the application: `PORT=5000 ADMINISTRATION_TOPIC=<administration-topic> npm start`
