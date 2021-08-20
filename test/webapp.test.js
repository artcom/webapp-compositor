import { addQueryParams } from "../src/webapp"

describe("addQueryParams", () => {
  const bootstrapData = {
    device: "myDevice",
    deviceTopic: "devices/myDevice",
    httpBrokerUri: "http://broker.backend.example.com:8080",
    tcpBrokerUri: "tcp://broker.backend.example.com:1883",
    wsBrokerUri: "ws://broker.backend.example.com:80/mqtt"
  }

  it("should add bootstrap", function () {
    const uri = addQueryParams("http://example.com", null, bootstrapData, 0)
    const url = new URL(uri)
    const queryParams = Object.fromEntries(url.searchParams.entries())

    expect(queryParams).toEqual({
      layer: "0",
      device: "myDevice",
      deviceTopic: "devices/myDevice",
      httpBrokerUri: "http://broker.backend.example.com:8080",
      tcpBrokerUri: "tcp://broker.backend.example.com:1883",
      wsBrokerUri: "ws://broker.backend.example.com:80/mqtt"
    })
  })

  it("should add bootstrap and tour data", function () {
    const uri = addQueryParams("http://example.com", "myTour", bootstrapData, 0)
    const url = new URL(uri)
    const queryParams = Object.fromEntries(url.searchParams.entries())

    expect(queryParams).toEqual({
      layer: "0",
      device: "myDevice",
      deviceTopic: "devices/myDevice",
      httpBrokerUri: "http://broker.backend.example.com:8080",
      tcpBrokerUri: "tcp://broker.backend.example.com:1883",
      wsBrokerUri: "ws://broker.backend.example.com:80/mqtt",
      tour: "myTour",
      tourTopic: "tours/myTour"
    })
  })

  it("should keep existing query parameters", function () {
    const uri = addQueryParams("http://example.com/?foo=bar", "myTour", bootstrapData, 0)
    const url = new URL(uri)
    const queryParams = Object.fromEntries(url.searchParams.entries())

    expect(queryParams).toEqual({
      foo: "bar",
      layer: "0",
      device: "myDevice",
      deviceTopic: "devices/myDevice",
      httpBrokerUri: "http://broker.backend.example.com:8080",
      tcpBrokerUri: "tcp://broker.backend.example.com:1883",
      wsBrokerUri: "ws://broker.backend.example.com:80/mqtt",
      tour: "myTour",
      tourTopic: "tours/myTour"
    })
  })
})
