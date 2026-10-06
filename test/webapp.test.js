import { addQueryParams } from "../src/actionCreators"
import { normalizeDimBackground } from "../src/components/dimmer"
import { getExitDuration, API_TRANSITIONS } from "../src/transitions"

describe("addQueryParams", () => {
  const bootstrapData = {
    device: "myDevice",
    deviceTopic: "devices/myDevice",
    httpBrokerUri: "http://broker.backend.example.com:8080",
    tcpBrokerUri: "tcp://broker.backend.example.com:1883",
    wsBrokerUri: "ws://broker.backend.example.com:80/mqtt",
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
      wsBrokerUri: "ws://broker.backend.example.com:80/mqtt",
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
      tourTopic: "tours/myTour",
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
      tourTopic: "tours/myTour",
    })
  })

  it("should not overwrite existing bootstrap query parameters", function () {
    const uri = addQueryParams("http://example.com/?device=myNewDevice", "myTour", bootstrapData, 0)
    const url = new URL(uri)
    const queryParams = Object.fromEntries(url.searchParams.entries())

    expect(queryParams).toEqual({
      layer: "0",
      device: "myNewDevice",
      deviceTopic: "devices/myDevice",
      httpBrokerUri: "http://broker.backend.example.com:8080",
      tcpBrokerUri: "tcp://broker.backend.example.com:1883",
      wsBrokerUri: "ws://broker.backend.example.com:80/mqtt",
      tour: "myTour",
      tourTopic: "tours/myTour",
    })
  })
})

describe("normalizeDimBackground", () => {
  it("should return undefined when disabled", function () {
    expect(normalizeDimBackground(false)).toBeUndefined()
    expect(normalizeDimBackground(undefined)).toBeUndefined()
  })

  it("should use defaults for true", function () {
    expect(normalizeDimBackground(true)).toEqual({
      color: "black",
      strength: 0.4,
      blur: 0,
      fadeDuration: 0.5,
    })
  })

  it("should merge partial config with defaults", function () {
    expect(normalizeDimBackground({ color: "#e20074", blur: 0.5 })).toEqual({
      color: "#e20074",
      strength: 0.4,
      blur: 0.5,
      fadeDuration: 0.5,
    })
  })

  it("should clamp out of range values", function () {
    expect(normalizeDimBackground({ strength: 2, blur: 3, fadeDuration: -1 })).toEqual({
      color: "black",
      strength: 1,
      blur: 1,
      fadeDuration: 0,
    })
  })
})

describe("getExitDuration", () => {
  it("should sum delay and duration", function () {
    expect(getExitDuration(API_TRANSITIONS.FADE)).toBe(1.5)
    expect(getExitDuration(API_TRANSITIONS.NONE)).toBe(0)
  })

  it("should use the longest per-property transition", function () {
    expect(getExitDuration(API_TRANSITIONS.FADE_TO_GRAY)).toBe(2)
  })

  it("should return 0 for unknown transitions", function () {
    expect(getExitDuration("unknown")).toBe(0)
  })
})
