import { expect } from "chai"
import url from "url"

import { addQueryParams } from "../src/webapp"

describe("addQueryParams", function() {
  const bootstrapData = {
    device: "myDevice",
    deviceTopic: "devices/myDevice",
    httpBrokerUri: "http://broker.backend.t-gallery:8080",
    tcpBrokerUri: "tcp://broker.backend.t-gallery:1883",
    wsBrokerUri: "ws://broker.backend.t-gallery:80/mqtt"
  }

  it("should add bootstrap", function() {
    const uri = addQueryParams("http://example.com", null, bootstrapData, 0)
    const parsedUrl = url.parse(uri, true)

    expect(parsedUrl.query).to.deep.equal({
      layer: "0",
      device: "myDevice",
      deviceTopic: "devices/myDevice",
      httpBrokerUri: "http://broker.backend.t-gallery:8080",
      tcpBrokerUri: "tcp://broker.backend.t-gallery:1883",
      wsBrokerUri: "ws://broker.backend.t-gallery:80/mqtt"
    })
  })

  it("should add bootstrap and tour data", function() {
    const uri = addQueryParams("http://example.com", "myTour", bootstrapData, 0)
    const parsedUrl = url.parse(uri, true)

    expect(parsedUrl.query).to.deep.equal({
      layer: "0",
      device: "myDevice",
      deviceTopic: "devices/myDevice",
      httpBrokerUri: "http://broker.backend.t-gallery:8080",
      tcpBrokerUri: "tcp://broker.backend.t-gallery:1883",
      wsBrokerUri: "ws://broker.backend.t-gallery:80/mqtt",
      tour: "myTour",
      tourTopic: "tours/myTour"
    })
  })

  it("should keep existing query parameters", function() {
    const uri = addQueryParams("http://example.com/?foo=bar", "myTour", bootstrapData, 0)
    const parsedUrl = url.parse(uri, true)

    expect(parsedUrl.query).to.deep.equal({
      foo: "bar",
      layer: "0",
      device: "myDevice",
      deviceTopic: "devices/myDevice",
      httpBrokerUri: "http://broker.backend.t-gallery:8080",
      tcpBrokerUri: "tcp://broker.backend.t-gallery:1883",
      wsBrokerUri: "ws://broker.backend.t-gallery:80/mqtt",
      tour: "myTour",
      tourTopic: "tours/myTour"
    })
  })
})
