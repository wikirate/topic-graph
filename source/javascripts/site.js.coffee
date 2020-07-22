$.fn.select2.defaults.set("theme", "bootstrap4")

#API_HOST = "https://wikirate.org"
API_HOST = "data"
METRIC_URL = "#{API_HOST}/Metric.json"
TOPIC_URL = "#{API_HOST}/topic.json"

$(document).ready ->
  container = document.getElementById("topicgraph")
  new TopicGraph(metric, topic).render(container)
  # loadGraph("topicgraph")

loadGraph = (containerId) ->
  container = document.getElementById("topicgraph");
  $.ajax(
    url: METRIC_URL,
    cache: false,
    dataType: "json",
    type: "GET",
    crossDomain: true,
    contentType: "application/json",
    headers: {
      "accept": "application/json",
      "Access-Control-Allow-Origin":"*",
      "Access-Control-Allow-Headers": "x-requested-with"
  }).done (metricData) ->
    $.ajax(url: TOPIC_URL, cache: false, dataType: "json", crossDomain: true, "headers": {
      "accept": "application/json",
      "Access-Control-Allow-Origin":"*"
    }).done (topicData) ->
      new TopicGraph(metricData, topicData).render(container)
