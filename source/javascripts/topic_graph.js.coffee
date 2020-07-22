LINK_TARGET_HOST = "https://wikirate.org"

class window.TopicGraph
  METRICS_THRESHOLD = 20
  constructor: (@metricData, @topicData) ->
    @example_topic = {
      "id": 45466,
      "name": "Accident",
      "type": "Topic",
      "url": "https://wikirate.org/Accident.json",
      "content": "",
      "bookmarkers": 0,
      "metrics": 6,
      "projects": 0
    }
    @example_metric = {
      "id": 538693,
      "name": "2020WoB+Women on Board",
      "type": "Metric",
      "url": "https://wikirate.org/2020WoB+Women_on_Board.json",
      "designer": "2020WoB",
      "title": "Women on Board",
      "question": "What percentage of people on the company's board of directors are women?",
      "metric_type": "Researched",
      "about": "<p><span>2020 Women on Boards conducts research studies about the gender composition of the boards of directors of US companies.</span></p>",
      "methodology": "<p>To search for a company listed on the 2020 Women on Boards directory, check the database here: <a href=\"https://www.2020wob.com/company-directory\">https://www.2020wob.com/company-directory</a>. See also data in the 2014 report <a href=\"http://www.2020wob.com/sites/default/files/2020GDI-2014Report.pdf\">here</a>.</p>",
      "value_type": "Number",
      "value_options": [
        "Unknown"
      ],
      "report_type": "Data Breach Report",
      "research_policy": "Designer Assessed",
      "unit": "%",
      "range": null,
      "hybrid": "no",
      "topics": [
        "Employee",
        "Gender equality"
      ],
      "scores": [
        "2020WoB+Women on Board+Mariana",
        "2020WoB+Women on Board+Alex H",
        "2020WoB+Women on Board+Elizabeth Potter"
      ],
      "answers": 3571,
      "bookmarkers": 6,
      "projects": 4,
      "answers_url": "https://wikirate.org/2020WoB+Women_on_Board+Answer.json"
    }

    @nodes = []
    @edges = []
    @topic_ids = {}
    for item in @topicData.items
        if item.metrics >= METRICS_THRESHOLD
          @nodes.push {
            id: item.id,
            label: item.name,
            value: item.metrics
            group: 1
          }
          @topic_ids[item.name] = item.id

    for item in @metricData.items
        if item.topics.length > 1 and item.topics.length < 10
          for topic, i in item.topics
            for other_topic in item.topics[i+1..]
              @edges.push {
                from: @topic_ids[topic]
                to: @topic_ids[other_topic]
                value: 1
              }

  render: (container) ->
    data = @metricData
    data =
      nodes: @nodes
      edges: @edges
    options =
      nodes:
        shape: 'dot'
        size: 16
      physics:
        forceAtlas2Based:
          gravitationalConstant: -26
          centralGravity: 0.005
          springLength: 230
          springConstant: 0.18
        maxVelocity: 146
        solver: 'forceAtlas2Based'
        timestep: 0.35
        stabilization: iterations: 150

    new (vis.Network)(container, data, options)